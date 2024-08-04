import React, { useState } from 'react';
import axios from 'utils/axiosInstance';
import styles from './FindPassword.module.css';

const FindPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birth: '',
    phoneNumber: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('members/password'
        +`?email=${formData.email}`
        +`&name=${formData.name}`
        +`&birth=${formData.birth}`
        +`&phoneNumber=${formData.phoneNumber}`
      );
      setMessage('비밀번호 찾기 요청이 성공적으로 처리되었습니다. 이메일을 확인하세요.');
      setError(null);
    } catch (error) {
      console.error('비밀번호 찾기 오류:', error);
      setMessage(null);
      setError('비밀번호를 찾을 수 없습니다. 다시 시도해 주세요.');
    }
  };

  const handleGoBack = () => {
    window.history.back(); // 뒤로가기
  };

  return (
    <div className={styles.container}>
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="birth">생일</label>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="phoneNumber">연락처</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" className={styles.submitButton}>비밀번호 찾기</button>
          <button type="button" className={styles.cancelButton} onClick={handleGoBack}>돌아가기</button>
        </div>
      </form>
      {message && <p className={styles.successText}>{message}</p>}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default FindPassword;
