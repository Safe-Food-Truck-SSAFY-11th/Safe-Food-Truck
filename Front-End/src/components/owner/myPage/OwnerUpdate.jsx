import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OwnerUpdate.module.css';
import useUserStore from 'store/users/userStore';

const OwnerUpdate = () => {
  const navigate = useNavigate();

  const { nicknameChecked, checkNickname, nicknameTouched, setNicknameTouched, passwordMatch, setPasswordMatch, passwordTouched, setPasswordTouched, fetchUser, updateUser } = useUserStore();
  const [maxDate, setMaxDate] = useState('');
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState('assets/images/sft-logo.png'); // 기본 프로필 이미지 경로
  const [initialNickname, setInitialNickname] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMaxDate(`${yyyy}-${mm}-${dd}`);
    
    const fetchData = async () => {
      try {
        const user = await fetchUser();
        setForm(user);
        setInitialNickname(user.nickname);
      } catch (error) {
        console.error('회원 정보 가져오기 실패')
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setPasswordMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword, setPasswordMatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm({
     ...form,
      [name]: value,
    });
  }

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

  const handleSubmit = (e) => {
    updateUser(form);
    alert('정보가 성공적으로 업데이트되었습니다.');
    navigate('/mypageOwner');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const isFormValid = (nicknameChecked === 'Possible' || form.nickname === initialNickname) && passwordMatch;

  return (
    <div className={styles.container}>
      <h2>내 정보 수정</h2>
      <div className={styles.profileContainer} onClick={() => document.getElementById('profileImageInput').click()}>
        <img src={profileImage} alt="Profile" />
      </div>
      <input type="file" id="profileImageInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <label>이메일</label>
          <input type="email" name="email" value={form.email} disabled className={styles.emailInput} />
        </div>
        <div className={styles.inputContainer}>
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange}/>
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
            <input type="text" name="name" value={form.name} disabled />
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
            <input type="date" name="birth" value={form.birth} disabled max={maxDate} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>전화번호</label>
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange}/>
        </div>
        <div className={styles.inputContainer}>
          <label>사업자등록번호</label>
          <input type="text" name="businessNumber" value={form.businessNumber} disabled />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>수정하기</button>
          <button type="button" className={styles.cancelButton}>취소하기</button>
        </div>
      </form>
    </div>
  );
};

export default OwnerUpdate;
