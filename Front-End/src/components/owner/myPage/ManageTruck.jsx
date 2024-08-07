import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ManageTruck.module.css";
import imageIcon from "assets/images/truck-img.png";
import useTruckStore from "store/users/owner/truckStore";
import AWS from 'aws-sdk';

const ManageTruck = () => {
  const navigate = useNavigate();
  const [truckImage, setTruckImage] = useState(''); 

  const {
    updateForm,
    setForm,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
    updateTruck();
    alert("수정이 완료되었습니다.");
    navigate('/mypageOwner');
  };

  const handleCancle = (e) => {
    e.preventDefault();
    navigate('/mypageOwner');
  }

  const handleImageButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    fetchTruckInfo();
    setTruckImage(truckInfo.storeImageDto.savedUrl);
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = (event) => {
        setTruckImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
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
        Key: `stores/${updateForm.name}/${selectedFile.name}`, // S3에 저장될 경로와 파일명
        Body: selectedFile,
    };

    // S3에 파일 업로드
    return new Promise((resolve, reject) => {
      s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
          reject(err);
        } else {
          console.log('File uploaded successfully. ETag:', data.ETag);
          updateForm.storeImageDto.savedUrl = data.Location;
          updateForm.storeImageDto.savedPath = data.Key;

          console.log('DATA = ', data);
          console.log('FORM = ', updateForm);

          // 업로드 완료 후 resolve 호출
          resolve(data);
        }
      });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>푸드트럭 정보 수정</h1>
        <div className={styles.imageUpload}>
          <img
            src={truckImage === 'empty' ? imageIcon : truckImage}
            alt="이미지 업로드"
            className={styles.uploadedImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
          <button type="submit" className={styles.submitButton} >
            수정하기
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancle}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageTruck;
