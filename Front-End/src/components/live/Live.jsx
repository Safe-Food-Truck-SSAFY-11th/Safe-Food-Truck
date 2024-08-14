/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { OpenVidu } from "openvidu-browser";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useNavigate 및 useLocation 추가
import axios from "axios";
import styles from "./Live.module.css";
import UserVideoComponent from "./UserVideoComponent";
import OpenClose from "components/owner/mainPage/OpenClose";
import JiguemOrder from "components/owner/mainPage/JiguemOrder";
import useLiveStore from "store/live/useLiveStore";
import useTruckStore from "store/users/owner/truckStore";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import NoticeModal from "./NoticeModal";
import chatbot from "gemini/geminiChatBot";
import ChatBox from "./ChatBox";
import truck_img from "assets/images/truck-img.png";

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
    fetchTruckInfo,
    truckInfo,
  } = useLiveStore();

  const role = sessionStorage.getItem("role");
  const { storeId } = useParams();
  const navigate = useNavigate(); // useNavigate 사용
  // const { state } = useLocation(); // useLocation 사용
  // const { token, reload } = state || {}; // token을 state에서 받아옴
  const [mySessionId, setMySessionId] = useState(storeId);
  const [myUserName, setMyUserName] = useState(
    sessionStorage.getItem("nickname")
  );
  const [session, setSession] = useState(undefined);
  const mainStreamManager = useRef(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isChat, setIsChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const { truckInfo } = useTruckStore();
  // const { selectedTruck } = useFoodTruckStore();
  const truckName = truckInfo?.name;
  const [notice, setNotice] = useState(storeNotice);

  //트럭사진
  const truckImg =
    truckInfo?.storeImageDto?.savedUrl === "empty"
      ? truck_img
      : truckInfo?.storeImageDto?.savedUrl;

  //방송 참여자 이메일 목록
  const members = useRef(new Set());

  // 방송 참여자 이메일 추가
  const addMember = (email) => {
    members.current.add(email);
  };

  // 방송 참여자 삭제
  const deleteMember = (email) => {
    members.current.delete(email);
  };

  // 방송 참여자 이메일 목록 비우기
  const resetMembers = () => {
    members.current.clear();
  };

  const OV = useRef();

  //처음 스크롤 맨위로 올리기
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  //페이지 떠나려고 할 때 동작
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      // console.log("페이지 떠나는 이벤트", event);
      // const confirmationMessage =
      //   "이 페이지를 떠나시겠습니까? 방송이 종료됩니다.";
      // event.returnValue = confirmationMessage; // 브라우저 호환성을 위해 설정
      // return confirmationMessage;

      console.log("페이지 떠남");

      const navigationType = performance.getEntriesByType("navigation")[0].type;

      if (navigationType === "reload") {
        // 새로고침인 경우
        console.log("새로고침 감지");

        if (role.indexOf("customer") !== -1) {
          // 손님이 창을 닫거나 다른 페이지로 이동할 때 세션 나가기
          await leaveSession();
        }

        return; // 아무 작업도 하지 않음
      } else {
        console.log("새로고침 아님");
        // 새로고침이 아닌 경우
        if (role.indexOf("customer") !== -1) {
          // // 손님이 창을 닫거나 다른 페이지로 이동할 때 세션 나가기
          leaveSession();
        } else if (role.indexOf("owner") !== -1) {
          // 사장님이 창을 닫거나 다른 페이지로 이동할 때 방송 종료 확인
          const res = window.confirm("방송을 종료하시겠습니까?");
          if (res) {
            await endLive(); // 방송 종료
          } else {
            event.preventDefault(); // 페이지 이탈을 막음
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [role, session, navigate]);

  // 뒤로가기 동작 처리
  useEffect(() => {
    const handlePopState = async (event) => {
      console.log("뒤로가기");
      if (session) {
        if (role.indexOf("customer") !== -1) {
          // 손님이 뒤로가기를 눌렀을 때 세션 나가기
          await leaveSession();
        } else if (role.indexOf("owner") !== -1) {
          // 사장님이 뒤로가기를 눌렀을 때 방송 종료 확인
          const res = window.confirm("방송을 종료하시겠습니까?");
          if (res) {
            await endLive(); // 방송 종료
            navigate("/mainOwner");
          } else {
            window.history.pushState(null, "", window.location.href); // 뒤로가기를 취소하고 현재 페이지 유지
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [role, session, navigate]);

  //처음 렌더링 할 때 손님, 사장님에 따라 세션 참가 로직 분기
  useEffect(() => {
    fetchTruckInfo(storeId); //트럭정보 로딩

    // const getNewTokenAndJoin = async () => {
    //   const newToken = await getToken();
    //   console.log(newToken);
    //   joinExistingSession(newToken); // 구독자로 참여
    // };

    if (role.indexOf("owner") !== -1) {
      createSessionAndJoin(); // 퍼블리셔로 참여
    } else if (role === "customer") {
      joinExistingSession(); // 구독자로 참여
    }
  }, [role]);

  //방송 종료 시 손님 페이지 이동 & 모달 켜기
  useEffect(() => {
    if (session) {
      session.on("sessionDisconnected", (event) => {
        console.log(event);
        if (event.reason === "forceDisconnectByServer") {
          if (role.indexOf("customer") !== -1) {
            navigate(`/foodTruckDetail/${storeId}`, { replace: true }); // 이동하면서, 뒤로가기 막음
            openModal(); //모달 열기
          }
        }
      });
    }
  }, [session, navigate]);

  //트럭 정보, 공지사항 가져오기
  useEffect(() => {
    fetchNotice(storeId);
    setNotice(storeNotice);
    console.log(notice);
  }, [storeNotice]);

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
      console.log(members.current);
    });

    //커넥션 끊기는 경우
    newSession.on("connectionDestroyed", (event) => {
      //끊긴 커넥션의 email을 member 배열에서 제거
      console.log("Connection " + event.connection.connectionId + " desproyed");
      console.log(JSON.parse(event.connection.data).email);
      deleteMember(JSON.parse(event.connection.data).email);
      console.log(members.current);
    });

    try {
      const token = await getToken();
      console.log(token);
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
  const joinExistingSession = async () => {
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
      const message = event.data.split("|||");
      const from = message[0];
      const msg = message[1];
      setMessages((prevMessages) => [...prevMessages, { from, message: msg }]);
    });

    try {
      const token = await getToken();
      console.log(token);
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
    // console.log(members.current);
    // if (session) {
    //   session.unpublish(publisher);
    // }
    // session.disconnect();

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
  const toggleChat = (from) => {
    if (from === "inputBox" && isChat) {
      //채팅창 열려있는 상태에서 눌러도 반응X
      return;
    }
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
      session
        .signal({
          data: `${ownerNickname}|||${result}`, // 사장님의 닉네임과 Chatbot 결과를 전송
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
          navigate("/mainOwner", { replace: true }); //뒤로가기 막기
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
          {mainStreamManager.current !== undefined ? (
            <div className={styles.mainVideo}>
              <UserVideoComponent streamManager={mainStreamManager.current} />
            </div>
          ) : null}

          <div
            className={`${styles.chatContainer} ${
              isChat
                ? styles.chatContainerExpanded
                : styles.chatContainerCollapsed
            }`}
          >
            <div className={styles.buttons}>
              {role.indexOf("owner") !== -1 ? (
                <button
                  className={`${styles.btn} ${styles.btnLarge} ${styles.btnInfo}`}
                  id="noticeRegist"
                  onClick={openNoticeModal}
                >
                  공지사항 작성
                </button>
              ) : null}
              <button
                className={styles.closeButton}
                id="buttonChat"
                onClick={toggleChat}
              >
                {isChat ? "×" : ""}
              </button>
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

            <ChatBox
              messages={messages}
              ownerNickname={ownerNickname}
              truckName={truckName}
            />
            <div
              className={styles.chatInputBox}
              onClick={() => {
                toggleChat("inputBox");
              }}
            >
              <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                  type="text"
                  className={styles.messageInput}
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="채팅을 입력하세요"
                  maxLength={200}
                />
                <button type="submit" className={styles.sendButton}>
                  전송
                </button>
              </form>
            </div>
          </div>

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
          </div>

          {role.indexOf("owner") !== -1 ? (
            <div className={styles.ownerItems}>
              <OpenClose onLiveEndClick={endLive} isLive={true} />
              <JiguemOrder />
            </div>
          ) : null}
        </div>
      ) : null}

      {isNoticeOpen ? <NoticeModal members={members.current} /> : null}
    </div>
  );
};

export default Live;
