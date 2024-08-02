import React, { useEffect } from "react";
import styles from "./MenuUpdate.module.css";
import useMenuStore from "store/users/owner/menuStore";
import imageIcon from "assets/images/sft-logo.png";

const MenuUpdate = () => {
  const { menuForm, setMenuForm, setMenuImage, closeUpdate, updateMenu } =
    useMenuStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuForm(name, value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setMenuImage(imageURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(menuForm);
    updateMenu(menuForm.menuId);
    closeUpdate();
    window.location.reload();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.imageSection}>
            <img
              //   src={menuForm.image || imageIcon}
              src={imageIcon}
              alt="이미지 업로드"
              className={styles.uploadedImage}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.imageInput}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className={styles.imageButton}
              onClick={() =>
                document.querySelector(`.${styles.imageInput}`).click()
              }
            >
              사진 바꾸기
            </button>
          </div>
          <div className={styles.detailsSection}>
            <div className={styles.inputContainer}>
              <label>메뉴</label>
              <input
                type="text"
                name="name"
                value={menuForm.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>가격</label>
              <input
                type="text"
                name="price"
                value={menuForm.price}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>설명</label>
              <textarea
                name="description"
                value={menuForm.description}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                수정
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeUpdate}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuUpdate;
