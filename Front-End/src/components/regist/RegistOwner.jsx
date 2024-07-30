import React, { useState, useEffect } from 'react';
import styles from './RegistOwner.module.css';
import useOwnerStore from '../../store/users/owner/ownerStore';

const RegistOwner = () => {
  const { form, setForm, emailChecked, checkEmail, passwordMatch, emailTouched, setEmailTouched, passwordTouched, setPasswordTouched, nicknameChecked, nicknameTouched, setNicknameTouched, checkNickname } = useOwnerStore();
  const [maxDate, setMaxDate] = useState('');

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
    // 중복 확인 로직 추가 (예: API 호출)
    checkEmail();
  };

  const handleNicknameCheck = () => {
    // 중복 확인 로직 추가 (예: API 호출)
    checkNickname();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <div className={styles.emailContainer}>
          <input type="email" name="email" value={form.email} onChange={handleEmailChange} className={styles.emailInput} />
          <button type="button" className={styles.duplicateButton} onClick={handleEmailCheck}>중복확인</button>
        </div>
        {emailTouched && emailChecked && <p className={styles.hintText}>사용할 수 있는 이메일이에요</p>}
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
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
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
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
        <div className={styles.inputContainer}>
          <label>성별</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={styles.selectInput}>
            <option value="">선택하세요</option>
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>생일</label>
          <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} max={maxDate} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label>사업자등록번호</label>
        <input type="text" name="businessNumber" value={form.businessNumber} onChange={handleChange} />
      </div>
    </form>
  );
};

export default RegistOwner;
