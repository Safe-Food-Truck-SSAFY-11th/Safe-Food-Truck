import React, { useState } from 'react';
import axios from 'utils/axiosInstance';
import styles from './FindId.module.css';

const FindId = ({ closeFunc }) => {
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    phoneNumber: '',
  });
  const [foundId, setFoundId] = useState(null);
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
      const response = await axios.get('members/email'
        +`?name=${formData.name}`
        +`&birth=${formData.birth}`
        +`&phoneNumber=${formData.phoneNumber}`
      );
      setFoundId(response.data);
      setError(null);
    } catch (error) {
      console.error('아이디 찾기 오류:', error);
      setFoundId(null);
      setError('아이디를 찾을 수 없습니다. 다시 시도해 주세요.');
    }
  };

  const handleGoBack = () => {
    closeFunc(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>아이디 찾기</h2>
        <div className={styles.form}>
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
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {foundId && <p className={styles.successText}>아이디: {foundId}</p>}
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.submitButton} onClick={handleSubmit}>아이디 찾기</button>
        <button className={styles.cancelButton} onClick={handleGoBack}>돌아가기</button>
      </div>
    </div>
  );
};

export default FindId;