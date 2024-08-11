import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CustomerUpdate.module.css';
import customerStore from 'store/users/customer/customerStore';
import profile_img from "assets/images/profile_image.png"
import AWS from 'aws-sdk';

const CustomerUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberInfo } = location.state || {}; // 전달된 상태에서 memberInfo를 가져옴

  const {
    form, setForm, modifyMemberInfo, getMemberInfo,
    passwordMatch, passwordTouched, setPasswordTouched,
    nicknameChecked, nicknameTouched, setNicknameTouched, checkNickname
  } = customerStore();

  const [maxDate, setMaxDate] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [initialNickname, setInitialNickname] = useState('');

  useEffect(() => {
    if (memberInfo) {
      // memberInfo로 form 초기화
      setForm('email', memberInfo.email);
      setForm('name', memberInfo.name);
      setForm('nickname', memberInfo.nickname);
      setForm('gender', memberInfo.gender);
      setForm('birth', memberInfo.birth);
      setForm('phoneNumber', memberInfo.phoneNumber);
      setForm('memberImage', memberInfo.memberImage);
    }
  }, [memberInfo, setForm]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMaxDate(`${yyyy}-${mm}-${dd}`);

    const fetchData = async () => {
      try {
        const user = await getMemberInfo();
        setForm(user);
        setInitialNickname(user.nickname);
        const imageUrl = user?.memberImage?.savedUrl === 'empty' ? profile_img : user?.memberImage?.savedUrl;
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('회원 정보 가져오기 실패')
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(name, value);
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setPasswordTouched();
  };

  const handleNicknameChange = (e) => {
    handleChange(e);
    setNicknameTouched();
  };

  const handleNicknameCheck = () => {
    checkNickname(form.nickname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
  
    const updatedData = {
      email: form.email,
      password: form.password,
      nickname: form.nickname,
      gender: form.gender,
      birthdate: form.birthdate,
      phoneNumber: form.phoneNumber,
      memberImage: form.memberImage
    };
  
    console.log(updatedData);
  
    await modifyMemberInfo(updatedData);
  
    // 마이 페이지로 라우팅
    navigate('/mypageCustomer');
  };
  const isFormValid = (nicknameChecked === 'Possible' || form.nickname === initialNickname) && passwordMatch;

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
        Key: `members/${form.email}/${selectedFile.name}`, // S3에 저장될 경로와 파일명
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
          form.memberImage.savedUrl = data.Location;
          form.memberImage.savedPath = data.Key;

          console.log('DATA = ', data);
          console.log('FORM = ', form);

          // 업로드 완료 후 resolve 호출
          resolve(data);
        }
      });
    });
  };

  return (
      <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.inputTitle}>
        <h1>내 정보 수정</h1>
     </div>
      <div className={styles.imageContainer}>
        <label htmlFor="profileImageUpload" className={styles.imagePlaceholder}>
          <img src={profileImage} alt="Profile" className={styles.profileImage} />
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="profileImageUpload"
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input type="email" name="email" value={form.email} readOnly className={styles.readOnlyInput} />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handlePasswordChange} />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호확인</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handlePasswordChange} />
        {passwordTouched && passwordMatch === true && <p className={styles.hintText}>비밀번호가 일치합니다</p>}
        {passwordTouched && passwordMatch === false && <p className={styles.errorText}>비밀번호가 일치하지 않습니다</p>}
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <label>이름</label>
          <input type="text" name="name" value={form.name} readOnly />
        </div>
        <div className={styles.inputContainer}>
          <label>닉네임</label>
          <div className={styles.nicknameContainer}>
            <input type="text" name="nickname" value={form.nickname} onChange={handleNicknameChange} className={styles.nicknameInput} />
            <button type="button" className={styles.duplicateButton} onClick={handleNicknameCheck}>중복확인</button>
          </div>
          {nicknameTouched && nicknameChecked === 'Possible' && <p className={styles.hintText}>사용할 수 있는 닉네임이에요</p>}
          {nicknameTouched && (nicknameChecked === 'Duplicate' && form.nickname !== initialNickname) && <p className={styles.errorText}>이미 사용 중인 닉네임입니다</p>}
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <label>성별</label>
          <select name="gender" value={form.gender} disabled className={styles.selectInput}>
            <option value="">선택하세요</option>
            <option value="0">남</option>
            <option value="1">여</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>생일</label>
          <input type="date" name="birth" value={form.birth} readOnly max={maxDate} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.updateButton} disabled={!isFormValid}>수정하기</button>
        <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    </form>
  );
};

export default CustomerUpdate;
