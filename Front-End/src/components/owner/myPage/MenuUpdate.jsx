import React, { useEffect } from "react";
import styles from "./MenuUpdate.module.css";
import useMenuStore from "store/users/owner/menuStore";
import imageIcon from "assets/images/foodImage/all.png";
import { useState } from 'react';
import AWS from 'aws-sdk';
import useTruckStore from "store/users/owner/truckStore";

const MenuUpdate = () => {
  const { menuForm, setMenuForm, setMenuImage, closeUpdate, updateMenu } =
  useMenuStore();
  const { truckInfo } = useTruckStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuForm(name, value);
  };
  
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
    await handleUpdate();

    updateMenu(menuForm.menuId);
    closeUpdate();
    window.location.reload();
  };

  const handleUpdate = async () => {
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

    // 업로드할 파일 정보 설정
    const uploadParams = {
        Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
        Key: `stores/${truckInfo.storeId}/menus/${selectedImage.name}`, // S3에 저장될 경로와 파일명
        Body: selectedImage,
    };

     // 삭제할 파일 정보 설정
     const deleteParams = {
      Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,  // 버킷 이름 변경
      Key: menuForm.savedPath, // S3에 저장될 경로와 파일명
    };

    return new Promise((resolve, reject) => {
      // 삭제 작업이 필요한 경우
      if (menuForm.savedPath !== "empty" && deleteParams.Key !== "") {
          s3.deleteObject(deleteParams, (err, data) => {
              if (err) {
                  console.error('Error deleting file:', err);
                  return reject(err);  // 삭제 실패 시 Promise reject
              } else {
                  console.log('File deleted successfully. ETag:', data.ETag);
                  // 삭제 후 업로드 작업 수행
                  performUpload();
              }
          });
      } else {
          // 삭제할 파일이 없으면 바로 업로드 작업 수행
          performUpload();
      }
  
      // 업로드 작업 함수 정의
      function performUpload() {
          s3.upload(uploadParams, (err, data) => {
              if (err) {
                  console.error('Error uploading file:', err);
                  reject(err);  // 업로드 실패 시 Promise reject
              } else {
                  console.log('File uploaded successfully. ETag:', data.ETag);
                  setMenuForm("savedUrl", data.Location);
                  setMenuForm("savedPath", data.Key);
                  // 업로드 완료 후 resolve 호출
                  resolve(data);
              }
          });
      }
  });

};
  
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.imageSection}>
            <img
              src={menuForm.image !== "empty" ? menuForm.image : imageIcon}
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
                type="number"
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
