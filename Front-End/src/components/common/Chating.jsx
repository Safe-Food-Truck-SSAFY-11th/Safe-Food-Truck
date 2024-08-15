import React, { useState } from "react";
import styles from "./Chating.module.css";

const Chating = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "와 슈 대박 맛있어영",
      role: "guest",
      userName: "USER1",
      userImage: "user1-img.png",
    },
    {
      id: 2,
      text: "아닌데 팥붕이 진짜임",
      role: "guest",
      userName: "팥붕사랑",
      userImage: "user2-img.png",
    },
    {
      id: 3,
      text: "ㅎㅗ",
      role: "guest",
      userName: "USER1",
      userImage: "user1-img.png",
    },
    {
      id: 4,
      text: "감사합니당ㅎ",
      role: "owner",
      userName: "푸바오 사장님",
      userImage: "owner-img.png",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      text: input,
      role: "guest", // or 'owner', depending on the user role
      userName: "USER1", // dynamic user name
      userImage: "user1-img.png", // dynamic user image
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>울퉁불퉁</h1>
        <p className={styles.subtitle}>
          푸바오 사장님이 운영하는 울퉁불퉁 트럭의 채팅방 입니다
        </p>
      </div>
      <div className={styles.chatBox}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === "owner"
                ? styles.ownerMessage
                : styles.guestMessage
            }`}
          >
            <img
              src={message.userImage}
              alt="user"
              className={styles.userImage}
            />
            <div>
              <p className={styles.userName}>{message.userName}</p>
              <p className={styles.text}>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="채팅을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton}>
          전송
        </button>
      </form>
    </div>
  );
};

export default Chating;
