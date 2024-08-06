import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useReviewStore from 'store/reviews/useReviewStore';
import StarRating from './StarRating';
import styles from './CreateReview.module.css';
import AWS from 'aws-sdk';

const CreateReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { memberInfo } = location.state || {};
  const { currentReview, updateCurrentReview, createReview } = useReviewStore();
  const [reviewImages, setReviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
      return [];
    }

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_S3_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const s3 = new AWS.S3();
    const uploadPromises = selectedFiles.map(file => {
      const uploadParams = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
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
      setUploadedFiles(uploadResults);
      console.log('Uploaded files:', uploadResults);
      return uploadResults;
    } catch (err) {
      console.error('Error uploading files:', err);
      return [];
    }
  };

  const handleSubmit = async () => {
    const uploadedFiles = await handleUpload();

    const newReview = {
      orderId: parseInt(orderId, 10),
      isVisible: currentReview.is_visible === 1,
      star: currentReview.rating,
      content: currentReview.content,
      reviewImageDtos: uploadedFiles,
    };

    console.log(currentReview);

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
        value={memberInfo?.nickname || '닉네임'}
        readOnly
        placeholder="닉네임"
        className={styles.input}
      />

      <textarea
        value={currentReview?.content || ''}
        onChange={(e) => updateCurrentReview('content', e.target.value)}
        placeholder="리뷰 내용"
        className={styles.textarea}
      />

      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={currentReview?.is_visible === 1}
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
      <div>
        {reviewImages.map((image, index) => (
          <div key={index}>
            <p>{image.original_filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateReview;
