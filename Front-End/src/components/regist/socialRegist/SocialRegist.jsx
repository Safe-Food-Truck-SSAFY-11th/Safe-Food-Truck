import styles from './Regist.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import RegistUser from './RegistUser';
import RegistOwner from './RegistOwner';
import useUserStore from 'store/users/userStore';
import { useState } from 'react';
import AWS from 'aws-sdk';

import img_upload from 'assets/images/img_upload.png';

const SocialRegist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { method } = location.state || {};
    const { isGuest, setGuest, setOwner, fetchUser, registerUser, nicknameChecked } = useUserStore();
    const [profileImage, setProfileImage] = useState(img_upload);
    const [formData, setFormData] = useState({
        email: sessionStorage.getItem('email'),
        name: '',
        nickname: '',
        gender: null,
        birth: '',
        phoneNumber: '',
        businessNumber: null,
        memberImage: {
            savedUrl: 'empty',
            savedPath: 'empty'
        }
    });

    const handleFormChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGoBack = () => {
        navigate('/login');
    }

    const handleRegisterClick = async () => {
        try {
            await handleUpload();
            const currentRole = formData.businessNumber ? 'owner' : 'customer';
            const roleSpecificData = currentRole === 'customer' ? {} : { businessNumber: formData.businessNumber };
            const token = await registerUser(method, { ...formData, ...roleSpecificData });
            // 회원가입 후 스토리지에 바로 토큰 담아주기
            if (token) {
                sessionStorage.setItem('token', token);
                await fetchUser();
            }

            navigate(sessionStorage.getItem('role') === 'customer' ? '/login' : '/registTruck');
        } catch (error) {
            console.error('회원가입 실패:', error);
        }

    };

    const isFormValid = nicknameChecked === 'Possible' && (isGuest || formData.bsNumValid);

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
            Key: `members/${formData.email}/${selectedFile.name}`, // S3에 저장될 경로와 파일명
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
                    formData.memberImage.savedUrl = data.Location;
                    formData.memberImage.savedPath = data.Key;

                    console.log('DATA = ', data);
                    console.log('FORM = ', formData);

                    // 업로드 완료 후 resolve 호출
                    resolve(data);
                }
            });
        });
    };

    return (
        <div className={`${styles.registContainer} ${!isGuest ? styles.ownerBackground : ''}`}>
            <div className={styles.contentContainer}>
                <div className={styles.imageUpload} onClick={() => document.getElementById('profileImageInput').click()}>
                    <img src={profileImage} alt="이미지 업로드" />
                    <input type="file" name="" id="profileImageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                </div>
                <div className={styles.optionContainer}>
                    <span
                        className={`${styles.option} ${isGuest ? styles.guestActive : styles.inactive}`}
                        onClick={setGuest}
                    >
                        손님이에요?
                    </span>
                    <span className={styles.divider}>|</span>
                    <span
                        className={`${styles.option} ${!isGuest ? styles.ownerActive : styles.inactive}`}
                        onClick={setOwner}
                    >
                        사장님이에요?
                    </span>
                </div>
                {isGuest ? (
                    <RegistUser formData={formData} onFormChange={handleFormChange} />
                ) : (
                    <RegistOwner formData={formData} onFormChange={handleFormChange} />
                )}
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.joinButton} onClick={handleRegisterClick} disabled={!isFormValid}>
                        함께하기
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={handleGoBack}>돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default SocialRegist;
