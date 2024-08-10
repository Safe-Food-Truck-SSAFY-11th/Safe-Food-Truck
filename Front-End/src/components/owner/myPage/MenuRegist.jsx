import React from "react";
import styles from "./MenuRegist.module.css";
import useMenuStore from "store/users/owner/menuStore";
import imageIcon from "assets/images/sft-logo.png";
import { useState } from 'react';
import AWS from 'aws-sdk';
import useTruckStore from "store/users/owner/truckStore";

const MenuRegist = () => {
  const { menuForm, setMenuForm, setMenuImage, closeRegist, addMenu } =
    useMenuStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("target ====== ", e.target);
    setMenuForm(name, value);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = (event) => {
      setMenuImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();

    addMenu();
    closeRegist();
    // window.location.reload();
  };
  const handleUpload = async () => {
      if (!selectedImage) {
          return;
      }

      // AWS S3 설정
      AWS.config.update({
          accessKeyId: `${process.env.REACT_APP_AWS_S3_KEY_ID}`,
          secretAccessKey: `${process.env.REACT_APP_AWS_S3_ACCESS_KEY}`,
          region: `${process.env.REACT_APP_AWS_REGION}`,
      });

      const s3 = new AWS.S3();

      const ownerEmail = sessionStorage.getItem("email");
      // const storeId = useTruckStore.info.storeId;

      // 업로드할 파일 정보 설정
      const uploadParams = {
          Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
          Key: `stores/${ownerEmail}/menus/${selectedImage.name}`, // S3에 저장될 경로와 파일명
          Body: selectedImage,
      };

      // S3에 파일 업로드
      return new Promise((resolve, reject) => {
          s3.upload(uploadParams, (err, data) => {
              if (err) {
                  console.error('Error uploading file:', err);
                  reject(err);
              } else {
                  console.log('File uploaded successfully. ETag:', data.ETag);
                  setMenuForm("savedUrl", data.Location);
                  setMenuForm("savedPath", data.Key);
                  // menuForm.savedUrl = data.Location;
                  // menuForm.savedPath = data.Key;

                  console.log('DATA = ', data);
                  console.log('FORM = ', menuForm);

                  // 업로드 완료 후 resolve 호출
                  resolve(data);
              }
          });
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.imageSection}>
            <img
              src={menuForm.image || imageIcon}
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
                등록
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeRegist}
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

export default MenuRegist;
