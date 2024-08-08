import React, { useState } from "react";
import styles from "./NoticeModal.module.css";
import axiosInstance from "utils/axiosInstance";
import useLiveStore from "store/live/useLiveStore";

const NoticeModal = () => {
  const {
    notice: initialNotice,
    closeNoticeModal,
    setNotice: setStoreNotice,
  } = useLiveStore();
  const [notice, setNotice] = useState(initialNotice || "");

  // input의 값이 변경될 때 notice 상태 업데이트
  const handleInputChange = (event) => {
    setNotice(event.target.value);
  };

  // 공지사항 등록
  const handleRegistButtonClick = async () => {
    try {
      await axiosInstance.patch("/stores/notice", { notice });
      setStoreNotice(notice);
      console.log(notice);
      closeNoticeModal(); // 모달 닫기
    } catch (error) {
      console.error("공지사항 등록 중 오류 발생:", error);
    }
  };

  // 공지사항 삭제
  const handleDeleteButtonClick = async () => {
    try {
      await axiosInstance.patch("/stores/notice/delete");
      setStoreNotice("");
      closeNoticeModal(); // 모달 닫기
    } catch (error) {
      console.error("공지사항 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.areaWarningModal}>
      <div className={styles.modalContent}>
        <div>
          <p>📌공지사항 등록</p>
        </div>
        <input type="text" value={notice} onChange={handleInputChange} />
        <div>
          <button
            className={styles.moveButton}
            onClick={handleRegistButtonClick}
          >
            등록
          </button>
          <button
            className={styles.moveButton}
            onClick={handleDeleteButtonClick}
          >
            삭제
          </button>
          <button className={styles.moveButton} onClick={closeNoticeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
