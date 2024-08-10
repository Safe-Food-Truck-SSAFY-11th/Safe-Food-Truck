/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { OpenVidu } from "openvidu-browser";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useNavigate 및 useLocation 추가
import axios from "axios";
import styles from "./Live.module.css";
import UserVideoComponent from "./UserVideoComponent";
import truckImg from "assets/images/storeImg.png";
import OpenClose from "components/owner/mainPage/OpenClose";
import JiguemOrder from "components/owner/mainPage/JiguemOrder";
import useLiveStore from "store/live/useLiveStore";
import useTruckStore from "store/users/owner/truckStore";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import NoticeModal from "./NoticeModal";
import chatbot from "gemini/geminiChatBot";

const APPLICATION_SERVER_URL = "https://i11b102.p.ssafy.io/";

const Live = () => {
  const {
    openModal,
    ownerNickname,
    notice: storeNotice,
    fetchNotice,
    isNoticeOpen,
    openNoticeModal,
    setIsLiveFailed,
    isLiveFailed,
    members,
    addMember,
    deleteMember,
    resetMembers,
  } = useLiveStore();

  const role = sessionStorage.getItem("role");
  const { storeId } = useParams();
  const navigate = useNavigate(); // useNavigate 사용
  const { state } = useLocation(); // useLocation 사용
  const { token } = state || {}; // token을 state에서 받아옴
  const [mySessionId, setMySessionId] = useState(storeId);
  const [myUserName, setMyUserName] = useState(
    sessionStorage.getItem("nickname")
  );
  const [session, setSession] = useState(undefined);
  const mainStreamManager = useRef(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isChat, setIsChat] = useState(role.indexOf("customer") !== -1);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { truckInfo } = useTruckStore();
  const { selectedTruck } = useFoodTruckStore();
  const trukName =
    role.indexOf("owner") !== -1 ? truckInfo.name : selectedTruck.name;
  const [notice, setNotice] = useState(storeNotice);

  const OV = useRef();

  //페이지 떠나려고 할 때 동작
  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  //처음 렌더링 할 때 손님, 사장님에 따라 세션 참가 로직 분기
  useEffect(() => {
    if (role.indexOf("owner") !== -1) {
      createSessionAndJoin(); // 퍼블리셔로 참여
    } else if (role === "customer" && token) {
      joinExistingSession(token); // 구독자로 참여
    }
  }, [role, token]);

  // 뒤로가기 동작 처리 -> onbeforeunload랑 합치기
  useEffect(() => {
    const handleGoBack = async () => {
      if (session) {
        if (role.indexOf("customer") !== -1) {
          await leaveSession(); // 고객인 경우 방송 세션 종료
        } else if (role.indexOf("owner") !== -1) {
          const res = window.confirm("방송을 종료하시겠습니까?");
          if (res) {
            await endLive(); // 방송 종료
            navigate("/mainOwner"); // 사장님 메인페이지로 이동
          } else {
            window.history.pushState(null, "", "");
          }
        }
      }
    };

    window.addEventListener("popstate", handleGoBack);

    // // 컴포넌트 언마운트 시 이벤트 리스너 제거
    // return () => {
    //   window.removeEventListener("popstate", handleGoBack);
    // };
  }, []);

  //사장님 방송 종료 시 손님 페이지 이동 & 모달 켜기
  useEffect(() => {
    if (session) {
      session.on("sessionDisconnected", (event) => {
        console.log(event);
        if (event.reason === "forceDisconnectByServer") {
          if (role.indexOf("customer") !== -1) {
            navigate(`/foodTruckDetail/${storeId}`); // 이동하면서, 모달 활성화
            openModal();
          }
        }
      });
    }
  }, [session, navigate]);

  //공지사항 가져오기
  useEffect(() => {
    fetchNotice(storeId);
    setNotice(storeNotice);
    console.log(notice);
  }, [storeNotice]);

  // 사용자가 페이지를 떠나려고 할 때 동작 (새로고침, 창 닫기)
  const onbeforeunload = (event) => {
    leaveSession();
  };

  //세션 구독자 삭제
  const deleteSubscriber = (streamManager) => {
    const newSubscribers = subscribers.filter((sub) => sub !== streamManager);
    setSubscribers(newSubscribers);
  };

  //사장 - 새로 세션을 만들고 입장
  const createSessionAndJoin = async () => {
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();

    setSession(newSession);

    newSession.on("streamCreated", (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      // 퍼블리셔 스트림이 생성될 때 메인 스트림 매니저로 설정
      mainStreamManager.current = subscriber;
    });

    newSession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on("exception", (exception) => {
      console.warn(exception);
    });

    newSession.on("signal:my-chat", (event) => {
      const message = event.data.split("|||");
      const from = message[0];
      const msg = message[1];
      setMessages((prevMessages) => [...prevMessages, { from, message: msg }]);
    });

    //새로운 커넥션 생기는 경우
    newSession.on("connectionCreated", (event) => {
      //새 커넥션의 email을 memeber 배열에 추가
      console.log("Connection " + event.connection.connectionId + " created");
      console.log(JSON.parse(event.connection.data).email);
      addMember(JSON.parse(event.connection.data).email);
      console.log(members);
    });

    //커넥션 끊기는 경우
    newSession.on("connectionDestroyed", (event) => {
      //끊긴 커넥션의 email을 member 배열에서 제거
      console.log("Connection " + event.connection.connectionId + " desproyed");
      console.log(JSON.parse(event.connection.data).email);
      deleteMember(JSON.parse(event.connection.data).email);
      console.log(members);
    });

    try {
      const token = await getToken();
      await newSession.connect(token, {
        clientData: myUserName,
        email: sessionStorage.getItem("email"),
      });

      let newPublisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: true,
      });

      newSession.publish(newPublisher);
      setPublisher(newPublisher); // 퍼블리셔 설정
      mainStreamManager.current = newPublisher;
    } catch (error) {
      console.log(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  //손님 - 존재하는 세션에 입장
  const joinExistingSession = async (token) => {
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();

    setSession(newSession);

    newSession.on("streamCreated", (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      console.log("리모트 커넥션");
      console.log(event.stream.session.remoteConnections);

      //사장님 화면을 송출하기
      const newMainStreamManager = Array.from(
        event.stream.session.remoteConnections.values()
      ).filter(
        (item) =>
          item && item.stream && item.stream.hasAudio && item.stream.hasVideo
      );
      console.log("메인스트림메니저");
      console.log(newMainStreamManager);
      console.log("그 중 첫번째");
      console.log(newMainStreamManager[0].stream.streamManager);
      //세션에 연결된 영상, 오디오가 있는 스트림을 메인으로 설정
      mainStreamManager.current = newMainStreamManager[0].stream.streamManager;
    });

    newSession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on("exception", (exception) => {
      console.warn(exception);
    });

    newSession.on("signal:my-chat", (event) => {
      const message = event.data.split(",");
      const from = message[0];
      const msg = message[1];
      setMessages((prevMessages) => [...prevMessages, { from, message: msg }]);
    });

    try {
      await newSession.connect(token, {
        clientData: myUserName,
        email: sessionStorage.getItem("email"),
      });
    } catch (error) {
      console.error(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  //방송 나가는 함수
  const leaveSession = () => {
    if (session) {
      if (role.indexOf("owner") !== -1) {
        session.unpublish(publisher);
      }
      session.disconnect();
      console.log(session);
    }

    OV.current = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("no session");
    setMyUserName(sessionStorage.getItem("nickname"));
    mainStreamManager.current = undefined;
    setPublisher(undefined);

    if (role.indexOf("owner") !== -1) {
      navigate("/mainOwner");
    } else if (role.indexOf("customer") !== -1) {
      navigate(`/foodTruckDetail/${storeId}`);
    }
  };

  //사장님 방송 종료 함수
  const endLive = async () => {
    console.log("3");

    //방송 참여자 초기화
    resetMembers();
    console.log(members);
    if (session) {
      session.unpublish(publisher);
    }
    session.disconnect();

    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + storeId + "/close",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      console.log("방송종료");
      return response.data;
    } catch (error) {
      console.error("방송종료 중 에러발생!:", error);
      throw error;
    }
  };

  //채팅창 열고 닫기
  const toggleChat = () => {
    setIsChat(!isChat);
  };

  //채팅창 입력 내용
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const aiAply = async (modifiedMessage) => {
    var result = await chatbot(storeId, modifiedMessage);
    try {
      // 사장님이 보내는 채팅으로 등록
      const nickname = sessionStorage.getItem("nickname");
      session
        .signal({
          data: `${ownerNickname},${result}`, // 사장님의 닉네임과 Chatbot 결과를 전송
          to: [],
          type: "my-chat",
        })
        .then(() => {
          // console.log("AI message successfully sent:", result);
          setMessage(""); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error("Error sending AI message:", error);
        });
    } catch (error) {
      console.error("Error during AI application:", error);
    }
  };

  //채팅 전송
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const nickname = sessionStorage.getItem("nickname");
      // /ai로 시작하면 chatBot 함수 실행
      console.log("메세지 확인: ", message);
      if (message.startsWith("/ai")) {
        // 메시지에서 /ai를 제외한 부분으로 대체
        const modifiedMessage = message.replace(/^\/ai\s*/, "");
        aiAply(modifiedMessage);
      }
      session
        .signal({
          data: `${nickname}|||${message}`,
          to: [],
          type: "my-chat",
        })
        .then(() => {
          console.log(message);
          console.log("Message successfully sent");
          setMessage("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //세션 토큰 가져오기
  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    console.log("세션아이디" + sessionId);

    return await createToken(sessionId);
  };

  //세션 생성
  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // The sessionId
  };

  //세션 토큰 발급
  const createToken = async (sessionId) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 204) {
        console.log("204 해당 세션 없다고 뜸" + sessionId);

        //사장이 방송시작하려는데 오류 발생한 경우
        if (role.indexOf("owner") !== -1) {
          alert("방송 시작 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          setIsLiveFailed(true);
          leaveSession();
          // navigate("/mainOwner");
        }
        return null;
      }

      return response.data; // The token
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      {session !== undefined ? (
        <div className={styles.session}>
          <div className={styles.sessionHeader}>
            {role.indexOf("customer") !== -1 ? (
              <button
                className={`${styles.btn} ${styles.btnLarge} ${styles.btnDanger}`}
                id="buttonLeaveSession"
                onClick={leaveSession}
              >
                나가기
              </button>
            ) : null}

            <button
              className={`${styles.btn} ${styles.btnLarge} ${styles.btnInfo}`}
              id="buttonChat"
              onClick={toggleChat}
            >
              {isChat ? "💬채팅방 닫기" : "💬채팅방 열기"}
            </button>

            {role.indexOf("owner") !== -1 ? (
              <button
                className={`${styles.btn} ${styles.btnLarge} ${styles.btnInfo}`}
                id="noticeRegist"
                onClick={openNoticeModal}
              >
                공지사항 작성
              </button>
            ) : null}
          </div>
          {mainStreamManager.current !== undefined ? (
            <div className={styles.mainVideo}>
              <UserVideoComponent streamManager={mainStreamManager.current} />
            </div>
          ) : null}

          {isChat ? (
            <div className={styles.chatContainer}>
              <div className={styles.chatInfo}>
                <p>
                  <span className={styles.infoGreen}>{ownerNickname}</span>{" "}
                  사장님이 운영하는
                </p>
                <p>
                  <span className={styles.infoGreen}>{trukName}</span> 트럭의
                  채팅방입니다
                </p>
              </div>
              {notice === "" ? null : (
                <div className={styles.noticeBox}>
                  <div>
                    <img
                      className={styles.truckImg}
                      src={truckImg}
                      alt="트럭이미지"
                    />
                  </div>

                  <div className={styles.noticeInfo}>
                    <div className={styles.noticeTitle}>📌 사장님 공지사항</div>
                    <div className={styles.noticeContent}>{notice}</div>
                  </div>
                </div>
              )}
              <div className={styles.chatBox}>
                <div className={styles.messageList}>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`${styles.message} ${
                        msg.from === ownerNickname
                          ? styles.messageOwner
                          : styles.messageCustomer
                      }`}
                    >
                      <div>
                        <b
                          className={`${
                            msg.from === ownerNickname
                              ? styles.messageFromOwner
                              : styles.messageFromCustomer
                          }`}
                        >
                          {msg.from}
                        </b>
                      </div>
                      <div
                        className={`${
                          msg.from === ownerNickname
                            ? ""
                            : styles.messageFromCustomerText
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.chatInputBox}>
                <form onSubmit={sendMessage} className={styles.messageForm}>
                  <input
                    type="text"
                    className={styles.messageInput}
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="채팅을 입력하세요"
                  />
                  <button type="submit" className={styles.sendButton}>
                    전송
                  </button>
                </form>
              </div>
            </div>
          ) : null}

          {role.indexOf("owner") !== -1 ? (
            <div className={styles.ownerItems}>
              <OpenClose onLiveEndClick={endLive} />
              <JiguemOrder />
            </div>
          ) : null}
        </div>
      ) : null}

      {isNoticeOpen ? <NoticeModal /> : null}
    </div>
  );
};

export default Live;
