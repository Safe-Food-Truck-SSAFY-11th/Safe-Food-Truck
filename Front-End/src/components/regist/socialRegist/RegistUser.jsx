import React, { useState, useEffect } from 'react';
import styles from './RegistUser.module.css';
import useUserStore from 'store/users/userStore';

const RegistUser = ({ formData, onFormChange }) => {
  const { nicknameChecked, checkNickname, setPasswordMatch, nicknameTouched, setNicknameTouched } = useUserStore();
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
    onFormChange(name, value);  // 부모 컴포넌트로 폼 데이터 전달
  };

  const handleNicknameChange = (e) => {
    handleChange(e);
    setNicknameTouched();
  };

  const handleNicknameCheck = () => {
    checkNickname(formData.nickname);
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <div className={styles.emailContainer}>
          <input type="email" name="email" value={formData.email || ''} className={styles.emailInput} disabled />
        </div>
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
    </form>
  );
};

export default RegistUser;
