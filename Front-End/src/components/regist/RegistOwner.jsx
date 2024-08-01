import React, { useState, useEffect } from 'react';
import styles from './RegistOwner.module.css';
import useUserStore from 'store/users/userStore';

const RegistOwner = ({ formData, onFormChange }) => {
  const { emailChecked, checkEmail, nicknameChecked, checkNickname, emailTouched, setEmailTouched, nicknameTouched, setNicknameTouched, passwordMatch, setPasswordMatch, passwordTouched, setPasswordTouched } = useUserStore();
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMaxDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword, setPasswordMatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value); // 부모 컴포넌트로 폼 데이터 전달
  };

  const handleEmailChange = (e) => {
    handleChange(e);
    setEmailTouched();
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setPasswordTouched();
  };

  const handleNicknameChange = (e) => {
    handleChange(e);
    setNicknameTouched();
  };

  const handleEmailCheck = () => {
    checkEmail(formData.email);
  };

  const handleNicknameCheck = () => {
    checkNickname(formData.nickname);
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <div className={styles.emailContainer}>
          <input type="email" name="email" value={formData.email || ''} onChange={handleEmailChange} className={styles.emailInput} />
          <button type="button" className={styles.duplicateButton} onClick={handleEmailCheck}>중복확인</button>
        </div>
        {emailTouched && emailChecked === 'Possible' && <p className={styles.hintText}>사용할 수 있는 이메일이에요</p>}
        {emailTouched && emailChecked === 'Duplicate' && <p className={styles.errorText}>이미 사용 중인 이메일입니다</p>}
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호확인</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword || ''} onChange={handlePasswordChange} />
        {passwordTouched && passwordMatch === false && <p className={styles.errorText}>비밀번호가 일치하지 않습니다</p>}
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <label>이름</label>
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
        </div>
        <div className={styles.inputContainer}>
          <label>닉네임</label>
          <div className={styles.nicknameContainer}>
            <input type="text" name="nickname" value={formData.nickname || ''} onChange={handleNicknameChange} className={styles.nicknameInput} />
            <button type="button" className={styles.duplicateButton} onClick={handleNicknameCheck}>중복확인</button>
          </div>
          {nicknameTouched && nicknameChecked === 'Possible' && <p className={styles.hintText}>사용할 수 있는 닉네임이에요</p>}
          {nicknameTouched && nicknameChecked === 'Duplicate' && <p className={styles.errorText}>이미 사용 중인 닉네임입니다</p>}
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputContainer}>
          <label>성별</label>
          <select name="gender" value={formData.gender || ''} onChange={handleChange} className={styles.selectInput}>
            <option value="">선택하세요</option>
            <option value="0">남</option>
            <option value="1">여</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>생일</label>
          <input type="date" name="birth" value={formData.birth || ''} onChange={handleChange} max={maxDate} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label>사업자 번호</label>
        <input type="text" name="businessNumber" value={formData.businessNumber || ''} onChange={handleChange} />
      </div>
    </form>
  );
};

export default RegistOwner;
