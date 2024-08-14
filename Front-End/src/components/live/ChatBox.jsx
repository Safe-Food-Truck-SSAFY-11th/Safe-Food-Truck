import React, { useEffect, useRef } from "react";
import styles from "./ChatBox.module.css";

function ChatBox({ messages, ownerNickname, truckName }) {
  const messageEndRef = useRef(null);
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const scrollHeight = messageListRef.current.scrollHeight;
    messageListRef.current.scrollTop = scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chatBox}>
      <div className={styles.messageList} ref={messageListRef}>
        <div className={styles.chatInfo}>
          <p>
            <span className={styles.infoGreen}>{ownerNickname}</span>님이
            운영하는
          </p>
          <p>
            <span className={styles.infoGreen}>{truckName}</span>의 채팅방입니다
          </p>
          <p style={{ fontSize: "1rem" }}>
            {" "}
            /ai 명령어를 사용해 00에게 물어보세요!{" "}
          </p>
        </div>
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
                msg.from === ownerNickname ? "" : styles.messageFromCustomerText
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
}

export default ChatBox;
