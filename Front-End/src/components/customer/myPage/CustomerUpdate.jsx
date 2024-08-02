import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CustomerUpdate.module.css';
import customerStore from 'store/users/customer/customerStore';

const CustomerUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberInfo } = location.state || {}; // 전달된 상태에서 memberInfo를 가져옴


  const {
    form, setForm, modifyMemberInfo,
    passwordMatch, passwordTouched, setPasswordTouched,
    nicknameChecked, nicknameTouched, setNicknameTouched, checkNickname
  } = customerStore();

  const [maxDate, setMaxDate] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (memberInfo) {
      // memberInfo로 form 초기화
      setForm('email', memberInfo.email);
      setForm('name', memberInfo.name);
      setForm('nickname', memberInfo.nickname);
      setForm('gender', memberInfo.gender);
      setForm('birthdate', memberInfo.birthdate);
      setForm('phoneNumber', memberInfo.phoneNumber);
    }
  }, [memberInfo, setForm]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMaxDate(`${yyyy}-${mm}-${dd}`);
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
    checkNickname();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      email: form.email,
      password: form.password,
      nickname: form.nickname,
      gender: form.gender,
      birthdate: form.birthdate,
      phoneNumber: form.phoneNumber,
      profileImage,
    };
  
    console.log(updatedData);
  
    // modifyMemberInfo 함수 호출
    
    await modifyMemberInfo(updatedData);
  
    // 수정 후 세션 스토리지에서 토큰 제거
    // sessionStorage.removeItem('token');
  
    // 메인 페이지로 라우팅
    // navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          {profileImage ? <img src={profileImage} alt="Profile" /> : (
            <div>
              <img src="path/to/your/icon.png" alt="Icon" style={{ width: '24px', height: '24px' }} />
              <p>image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="profileImageUpload"
            onChange={handleImageUpload}
          />
          <label htmlFor="profileImageUpload" className={styles.uploadButton}>수정</label>
        </div>
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
          <label>닉네임</label>
          <div className={styles.nicknameContainer}>
            <input type="text" name="nickname" value={form.nickname} onChange={handleNicknameChange} className={styles.nicknameInput} />
            <button type="button" className={styles.duplicateButton} onClick={handleNicknameCheck}>중복확인</button>
          </div>
          {nicknameTouched && nicknameChecked && <p className={styles.hintText}>사용할 수 있는 닉네임이에요</p>}
        </div>
      </div>
      <div className={styles.inputRow}>
      </div>
      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.updateButton}>수정하기</button>
        <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    </form>
  );
};

export default CustomerUpdate;
