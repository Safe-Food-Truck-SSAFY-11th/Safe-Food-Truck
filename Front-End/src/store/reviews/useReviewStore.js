import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useReviewStore from '../../../store/reviews/useReviewStore';
import StarRating from './StarRating';
import styles from './CreateReview.module.css';
import AWS from 'aws-sdk';

const CreateReview = ({ memberInfo }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentReview, updateCurrentReview, createReview } = useReviewStore();

  const [reviewImages, setReviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReviewImages(prevState => [...prevState, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      return;
    }

    AWS.config.update({
      accessKeyId: `${process.env.REACT_APP_AWS_S3_KEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_AWS_S3_ACCESS_KEY}`,
      region: `${process.env.REACT_APP_AWS_REGION}`,
    });

    const s3 = new AWS.S3();
    const uploadPromises = selectedFiles.map(file => {
      const uploadParams = {
        Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
        Key: `members/${memberInfo.email}/${file.name}`,
        Body: file,
      };

      return new Promise((resolve, reject) => {
        s3.upload(uploadParams, (err, data) => {
          if (err) {
            console.error('Error uploading file:', err);
            reject(err);
          } else {
            console.log('File uploaded successfully. ETag:', data.ETag);
            resolve({
              savedUrl: data.Location,
              savedPath: data.Key,
            });
          }
        });
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (err) {
      console.error('Error uploading files:', err);
    }
  };

  const handleSubmit = async () => {
    const uploadedFiles = await handleUpload();

    if (uploadedFiles && uploadedFiles.length > 0) {
      updateCurrentReview('savedUrl', uploadedFiles[0].savedUrl);
      updateCurrentReview('savedPath', uploadedFiles[0].savedPath);
    }

    const newReview = {
      orderId: parseInt(orderId, 10),
      isVisible: currentReview.is_visible === 1,
      star: currentReview.rating,
      content: currentReview.content,
      reviewImageDtos: uploadedFiles,
    };

    try {
      await createReview(newReview);
      navigate(-1);
    } catch (error) {
      console.error('리뷰 작성에 실패했습니다', error);
    }
  };

  const handleCheckboxChange = (e) => {
    updateCurrentReview('is_visible', e.target.checked ? 1 : 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageUpload} onClick={() => document.getElementById('imageUpload').click()}>
        {reviewImages.map((image, index) => (
          <img className={styles.img} key={index} src={image} alt="이미지 업로드" />
        ))}
        <input
          id="imageUpload"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <div className={styles.imagePlaceholder}>image</div>
      </div>

      <p>음식은 어떠셨나요?</p>
      <StarRating maxStars={5} onRatingChange={(value) => updateCurrentReview('rating', value * 2)} />

      <input
        type="text"
        value={memberInfo.nickname}
        readOnly
        placeholder="닉네임"
        className={styles.input}
      />

      <textarea
        value={currentReview.content}
        onChange={(e) => updateCurrentReview('content', e.target.value)}
        placeholder="리뷰 내용"
        className={styles.textarea}
      />

      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={currentReview.is_visible === 1}
            onChange={handleCheckboxChange}
          />
          사장님에게만 보이게
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          작성하기
        </button>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
