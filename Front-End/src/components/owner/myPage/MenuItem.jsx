import React from "react";
import imageIcon from "assets/images/sft-logo.png";
import styles from "./MenuItem.module.css";

const MenuItem = ({ menu, onEdit, onDelete }) => {
  return (
    <div className={styles.menuItem}>
      <img
        src={menu.image !== "empty" ? menu.image : imageIcon}
        alt="메뉴 이미지"
        className={styles.menuImage}
      />
      <div className={styles.menuDetails}>
        <p>{menu.name}</p>
        <p>{menu.price}원</p>
      </div>
      <div className={styles.menuButtons}>
        <button type="button" className={styles.editButton} onClick={onEdit}>
          수정
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
