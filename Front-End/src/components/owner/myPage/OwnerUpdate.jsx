import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OwnerUpdate.module.css';
import useUserStore from 'store/users/userStore';
import profile_img from "assets/images/profile_image.png"
import AWS from 'aws-sdk';

const OwnerUpdate = () => {
  const navigate = useNavigate();

  const { nicknameChecked, checkNickname, nicknameTouched, setNicknameTouched, passwordMatch, setPasswordMatch, passwordTouched, setPasswordTouched, fetchUser, updateUser, pwdValid, setPwdValid, passwordValidChk, passwordCheckTouched, setPasswordCheckTouched } = useUserStore();
  const [maxDate, setMaxDate] = useState('');
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(''); 
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
        const imageUrl = user?.memberImage?.savedUrl === 'empty' ? profile_img : user?.memberImage?.savedUrl;
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('회원 정보 가져오기 실패')
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setPasswordMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword, setPasswordMatch]);

  useEffect(() => {
    handlePwdCheck(form.password);
  }, [form.password])

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

  const handlePwdCheckChange = (e) => {
    handleChange(e);
    setPasswordCheckTouched();
  }

  const handlePwdCheck = (pwd) => {
    setPwdValid(passwordValidChk(pwd));
  }

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
    await updateUser(form);
    alert('정보가 성공적으로 업데이트되었습니다.');
    navigate('/mypageOwner', { state: { updated: true } });
  };

  const isFormValid = (nicknameChecked === 'Possible' || form.nickname === initialNickname) && passwordMatch && pwdValid;

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

  const handleDeleteAcct = async () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmed) {
        try {
            const deleteUser = useUserStore.getState().deleteUser;
            await deleteUser();
            alert('탈퇴가 완료되었습니다.');
            sessionStorage.clear();
            window.location.href = '/login'; 
        } catch (error) {
            console.error('회원 탈퇴 오류:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }
  };

  const handleGoBack = () => {
    navigate('/mypageOwner');
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 정보 수정</h2>
      <div className={styles.profileContainer} onClick={() => document.getElementById('profileImageInput').click()}>
        <img src={profileImage} alt="Profile" />
        <input type="file" id="profileImageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <label>이메일</label>
          <input type="email" name="email" value={form.email} disabled className={styles.emailInput} />
        </div>
        <div className={styles.inputContainer}>
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handlePasswordChange} placeholder='영문, 숫자, 특수문자 조합 8-16자'/>
          {passwordTouched && !pwdValid && <p className={styles.errorText}>비밀번호 양식을 확인해주세요</p>}
        </div>
        <div className={styles.inputContainer}>
          <label>비밀번호확인</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handlePwdCheckChange} placeholder='영문, 숫자, 특수문자 조합 8-16자' />
          {passwordCheckTouched && passwordMatch === false && <p className={styles.errorText}>비밀번호가 일치하지 않습니다</p>}
          {passwordCheckTouched && passwordMatch && <p className={styles.hintText}>비밀번호가 일치합니다</p>}
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
          <input type="number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder='숫자만 입력하세요'/>
        </div>
        <div className={styles.inputContainer}>
          <label>사업자등록번호</label>
          <input type="text" name="businessNumber" value={form.businessNumber} disabled />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>수정하기</button>
          <button type="button" className={styles.cancelButton} onClick={handleGoBack}>취소하기</button>
        </div>
      </form>
      <div className={styles.deleteAccountArea}>
        <p>세이푸트를 떠나시겠어요?😥</p>
        <a className={styles.deleteAcnt} onClick={handleDeleteAcct}>회원 탈퇴</a>
      </div>
    </div>
  );
};

export default OwnerUpdate;
