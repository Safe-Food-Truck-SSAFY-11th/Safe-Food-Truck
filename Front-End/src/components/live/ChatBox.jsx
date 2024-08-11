import React, { useEffect, useRef } from "react";
import styles from "./ChatBox.module.css";

function ChatBox({ messages, ownerNickname, truckName }) {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chatBox}>
      <div className={styles.messageList}>
        <div className={styles.chatInfo}>
          <p>
            <span className={styles.infoGreen}>{ownerNickname}</span> 사장님이
            운영하는
          </p>
          <p>
            <span className={styles.infoGreen}>{truckName}</span> 트럭의
            채팅방입니다
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
