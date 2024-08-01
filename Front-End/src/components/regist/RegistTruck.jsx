import styles from './RegistTruck.module.css';
import { useNavigate } from 'react-router-dom';
import imageIcon from 'assets/images/truck-img.png';
import useTruckStore from 'store/users/owner/truckStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RegistTruck = () => {
    const navigate = useNavigate();
    const [nameTouched, setNameTouched] = useState(null);
    const [isValNumOK, setIsValNumOK] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    // 사용자 인증 상태 && role 확인
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role'); 
        if (!token || role !== 'ceo') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        setIsFormValid(isValNumOK && nameTouched);
    }, [isValNumOK, nameTouched]);

    const handleRegisterClick = async () => {
        try {
            const response = await registTruck(registForm);
            navigate('/login');
        } catch (error) {
            console.error('점포등록 실패:', error);
        }
    };

    const { registForm, setForm, setImage, toggleWorkingDay, categories, registTruck } = useTruckStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(name, value);
        if (name === 'name' && value.trim() !== '') {
            setNameTouched(true);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setImage(imageURL);
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

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>푸드트럭 등록</h1>
            <div className={styles.imageUpload}>
                <img src={registForm.image || imageIcon} alt="이미지 업로드" className={styles.uploadedImage} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
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
                            onClick={() => toggleWorkingDay(index)}
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
                <button type="button" className={styles.cancelButton}>취소하기</button>
            </div>
        </form>
    );
};

export default RegistTruck;
