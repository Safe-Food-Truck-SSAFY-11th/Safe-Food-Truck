/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { OpenVidu } from "openvidu-browser";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useNavigate 및 useLocation 추가
import axios from "axios";
import styles from "./Live.module.css";
import UserVideoComponent from "./UserVideoComponent";
import truckImg from "assets/images/storeImg.png";
import Modal from "./Modal";
import OpenClose from "components/owner/mainPage/OpenClose";
import JiguemOrder from "components/owner/mainPage/JiguemOrder";
import useTruckStore from "store/users/owner/truckStore";

const APPLICATION_SERVER_URL = "https://i11b102.p.ssafy.io/";

const Live = () => {
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
  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [storeInfo, setStoreInfo] = useState({
    ceo: "푸바오",
    truck: "울퉁불퉁",
  });

  const { truckInfo, fetchTruckInfo } = useTruckStore();

  const [storeNotice, setStoreNotice] = useState(
    "월 수 금 15:00~22:00 운영합니다 \n비오면 안나가요 \n07.19(금) 팥붕 안팔아요"
  );
  const OV = useRef();
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  useEffect(() => {
    console.log(truckInfo);
    if (role === "owner") {
      createSessionAndJoin(); // 퍼블리셔로 참여
    } else if (role === "customer" && token) {
      joinExistingSession(token); // 구독자로 참여
    }
  }, [role, token]);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const deleteSubscriber = (streamManager) => {
    const newSubscribers = subscribers.filter((sub) => sub !== streamManager);
    setSubscribers(newSubscribers);
  };

  const createSessionAndJoin = async () => {
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();

    setSession(newSession);

    newSession.on("streamCreated", (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      // 퍼블리셔 스트림이 생성될 때 메인 스트림 매니저로 설정
      mainStreamManager.current = subscriber;
      // setMainStreamManager(subscriber);
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
      const token = await getToken();
      await newSession.connect(token, { clientData: myUserName });

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
      // setMainStreamManager(newPublisher);
    } catch (error) {
      console.log(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  const joinExistingSession = async (token) => {
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();

    setSession(newSession);

    newSession.on("streamCreated", (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      console.log(event.stream.session.remoteConnections);

      const newMainStreamManager = Array.from(
        event.stream.session.remoteConnections.values()
      ).filter(
        (item) =>
          item && item.stream && item.stream.hasAudio && item.stream.hasVideo
      );

      console.log(newMainStreamManager);
      console.log(newMainStreamManager[0].stream.streamManager);

      mainStreamManager.current = newMainStreamManager[0].stream.streamManager;
      // setMainStreamManager(newMainStreamManager[0].stream.streamManager);
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
      await newSession.connect(token, { clientData: myUserName });
    } catch (error) {
      console.error(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  const leaveSession = () => {
    // 모든 연결 강제로 끊는 것 추가할 것 ->store로 리팩토링 -> 방송종료 버튼 눌러서 동작
    if (session) {
      if (role === "owner") {
        session.unpublish(publisher);
      }
      session.disconnect();
      console.log(session);
      console.log(subscribers);
      session.off();
    }

    OV.current = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("no session");
    setMyUserName(sessionStorage.getItem("nickname"));
    mainStreamManager.current = undefined;
    // setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const toggleChat = () => {
    setIsChat(!isChat);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const nickname = sessionStorage.getItem("nickname");
      session
        .signal({
          data: `${nickname},${message}`,
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

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    console.log("세션아이디" + sessionId);

    return await createToken(sessionId);
  };

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
        //모달 띄우기
        setModalMessage("현재 방송 중이 아닙니다!");
        return null;
      }

      return response.data; // The token
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  const closeModal = () => {
    setModalMessage("");
  };

  //공지사항 작성 버튼
  const noticeRegistClick = () => {};

  return (
    <div className={styles.container}>
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}

      {session !== undefined ? (
        <div className={styles.session}>
          <div className={styles.sessionHeader}>
            <h1 className={styles.sessionTitle}>{mySessionId}</h1>
            <input
              className={`${styles.btn} ${styles.btnLarge} ${styles.btnDanger}`}
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <button
              className={`${styles.btn} ${styles.btnLarge} ${styles.btnInfo}`}
              id="buttonChat"
              onClick={toggleChat}
            >
              {isChat ? "Close Chat" : "Open Chat"}
            </button>
            <button
              className={`${styles.btn} ${styles.btnLarge} ${styles.btnInfo}`}
              id="noticeRegist"
              onClick={noticeRegistClick}
            >
              공지사항 작성
            </button>

            {mainStreamManager.current !== undefined ? (
              <div className={styles.mainVideo}>
                <div className={styles.videoId}>
                  {
                    JSON.parse(mainStreamManager.current.stream.connection.data)
                      .clientData
                  }
                </div>
                <UserVideoComponent streamManager={mainStreamManager.current} />
              </div>
            ) : null}

            {/* 
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className={styles.mainVideo}
                onClick={handleMainVideoStream(sub)}
              >
                <div className={styles.videoId}>
                  {JSON.parse(sub.stream.connection.data).clientData}
                </div>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))} */}
          </div>

          {isChat ? (
            <div className={styles.chatContainer}>
              <div className={styles.chatInfo}>
                <p>
                  <span className={styles.infoGreen}>{storeInfo.ceo}</span>{" "}
                  사장님이 운영하는
                </p>
                <p>
                  <span className={styles.infoGreen}>{storeInfo.truck}</span>{" "}
                  트럭의 채팅방입니다
                </p>
              </div>
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
                  <div className={styles.noticeContent}>{storeNotice}</div>
                </div>
              </div>
              <div className={styles.chatBox}>
                <div className={styles.messageList}>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`${styles.message} ${
                        msg.from === storeInfo.ceo
                          ? styles.messageOwner
                          : styles.messageCustomer
                      }`}
                    >
                      <div>
                        <b
                          className={`${
                            msg.from === storeInfo.ceo
                              ? styles.messageFromOwner
                              : styles.messageFromCustomer
                          }`}
                        >
                          {msg.from}
                        </b>
                      </div>
                      <div
                        className={`${
                          msg.from === storeInfo.ceo
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

          {role === "owner" ? (
            <div className={styles.ownerItems}>
              <OpenClose />
              <JiguemOrder />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Live;
