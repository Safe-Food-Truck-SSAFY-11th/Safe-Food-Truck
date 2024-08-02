import React, { useEffect } from "react";
import styles from "./ManageTruck.module.css";
import imageIcon from "assets/images/truck-img.png";
import useTruckStore from "store/users/owner/truckStore";
import useMenuStore from "store/users/owner/menuStore";

const ManageTruck = () => {
  const {
    updateForm,
    setForm,
    setImage,
    toggleWorkingDay,
    categories,
    fetchTruckInfo,
    truckInfo,
    updateTruck,
  } = useTruckStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(name, value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setImage(imageURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTruck();
    alert("수정이 완료되었습니다.");
    window.location.reload();
    // Submit form logic
  };

  const handleImageButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    fetchTruckInfo();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>푸드트럭 정보 수정</h1>
        <div className={styles.imageUpload}>
          <img
            src={updateForm.image || imageIcon}
            alt="이미지 업로드"
            className={styles.uploadedImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.imageInput}
            id="fileInput" // 파일 입력 요소에 id 설정
            style={{ display: "none" }} // 입력 요소 숨기기
          />
          <button
            type="button"
            className={styles.imageButton}
            onClick={handleImageButtonClick} // 버튼 클릭 시 파일 입력 요소 클릭
          >
            사진 바꾸기
          </button>
        </div>
        <div className={styles.inputContainer}>
          <label>상호명</label>
          <input
            type="text"
            name="name"
            value={updateForm.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>식약처인허가번호</label>
          <input
            type="text"
            name="licenseNumber"
            value={truckInfo.safetyLicenseNumber}
            disabled
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>카테고리</label>
          <select
            name="storeType"
            value={updateForm.storeType}
            onChange={handleChange}
          >
            <option value="">선택하세요</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>출근 요일</label>
          <div className={styles.daysContainer}>
            {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
              <button
                key={day}
                type="button"
                className={`${styles.dayButton} ${
                  updateForm.offDay[index] === "1" ? styles.activeDay : ""
                }`}
                onClick={() => toggleWorkingDay(index)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>가게 설명</label>
          <textarea
            name="description"
            value={updateForm.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            수정하기
          </button>
          <button type="button" className={styles.cancelButton}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageTruck;
