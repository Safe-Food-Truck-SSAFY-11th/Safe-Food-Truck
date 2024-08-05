import styles from './RegistTruck.module.css';
import { useNavigate } from 'react-router-dom';
import img_upload from 'assets/images/img_upload.png';
import useTruckStore from 'store/users/owner/truckStore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';

const RegistTruck = () => {
    const navigate = useNavigate();
    const [nameTouched, setNameTouched] = useState(null);
    const [isValNumOK, setIsValNumOK] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [profileImage, setProfileImage] = useState(img_upload);

    // 사용자 인증 상태 && role 확인
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');
        if (!token || role !== 'owner') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        setIsFormValid(isValNumOK && nameTouched);
    }, [isValNumOK, nameTouched]);

    const handleRegisterClick = async () => {
        try {
            await handleUpload();
            const response = await registTruck(registForm);
            navigate('/login');
        } catch (error) {
            console.error('점포등록 실패:', error);
        }
    };

    const { registForm, setRegistForm, setRegistImage, toggleRegistWorkingDay, categories, registTruck } = useTruckStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistForm(name, value);
        if (name === 'name' && value.trim() !== '') {
            setNameTouched(true);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setRegistImage(imageURL);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleImageButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const fskApiKey = process.env.REACT_APP_FSK_FOODTRUCK_API_KEY;
    const valNum = registForm.safetyLicenseNumber;

    const handleValNumCheck = async () => {
        try {
            const response = await axios.post(`http://openapi.foodsafetykorea.go.kr/api/${fskApiKey}/I2856/json/1/5/LCNS_NO=${valNum}`);
            console.log(response.data);
            if (response.status === 200 && response.data.I2856.RESULT.CODE === "INFO-000") {
                // 인허가 번호 검증 통과
                setIsValNumOK(true);
            } else {
                // 인허가 번호 검증 실패
                setIsValNumOK(false);
            }
        } catch (error) {
            // 오류
            console.error('인허가 번호 확인 오류:', error)
            setIsValNumOK(false);
        }
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = (event) => {
            setProfileImage(event.target.result);
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
            Key: `stores/${registForm.name}/${selectedFile.name}`, // S3에 저장될 경로와 파일명
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
                    registForm.storeImageDto.savedUrl = data.Location;
                    registForm.storeImageDto.savedPath = data.Key;

                    console.log('DATA = ', data);
                    console.log('FORM = ', registForm);

                    // 업로드 완료 후 resolve 호출
                    resolve(data);
                }
            });
        });
    };

    // 점포등록하지 않고 돌아가는 경우
    // -> 경고문구 페이지로 이동
    // *** 수정 예정 ***
    const handleGoBack = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>푸드트럭 등록</h1>
            <div className={styles.imageUpload}>
                <img src={profileImage || img_upload} alt="이미지 업로드" className={styles.uploadedImage} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.imageInput}
                    id="fileInput" // 파일 입력 요소에 id 설정
                    style={{ display: 'none' }} // 입력 요소 숨기기
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
                <input type="text" name="name" value={registForm.name} onChange={handleChange} />
            </div>
            <div className={styles.inputContainer}>
                <label>식약처인허가번호</label>
                <input type="text" name="safetyLicenseNumber" value={registForm.safetyLicenseNumber} onChange={handleChange} />
                <button type="button" className={styles.duplicateButton} onClick={handleValNumCheck}>인허가 번호 확인</button>
                {isValNumOK === true && <p className={styles.hintText}>인허가 번호가 유효합니다.</p>}
                {isValNumOK === false && <p className={styles.errorText}>인허가 번호가 유효하지 않습니다.</p>}
            </div>
            <div className={styles.inputContainer}>
                <label>카테고리</label>
                <select name="storeType" value={registForm.storeType} onChange={handleChange}>
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
                    {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                        <button
                            key={day}
                            type="button"
                            className={`${styles.dayButton} ${registForm.offDay[index] === '1' ? styles.activeDay : ''}`}
                            onClick={() => toggleRegistWorkingDay(index)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>가게 설명</label>
                <textarea name="description" value={registForm.description} onChange={handleChange} />
            </div>
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton} onClick={handleRegisterClick} disabled={!isFormValid}>등록하기</button>
                <button type="button" className={styles.cancelButton} onClick={handleGoBack}>취소하기</button>
            </div>
        </form>
    );
};

export default RegistTruck;
