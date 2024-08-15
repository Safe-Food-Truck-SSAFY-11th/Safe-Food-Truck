import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useReviewStore from '../../../store/reviews/useReviewStore';
import StarRating from './StarRating';
import styles from './CreateReview.module.css';
import AWS from 'aws-sdk';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CreateReview = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const memberInfo = location.state;
  const navigate = useNavigate();
  const { currentReview, updateCurrentReview, createReview } = useReviewStore();
  const [reviewImages, setReviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // 새로 선택한 파일만 상태에 저장
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(images => {
      setReviewImages(images);  // 새로 선택한 이미지만 상태에 저장
      setSelectedFiles(files);  // 파일 상태도 업데이트
    });
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      return [];
    }

    AWS.config.update({
      accessKeyId: `${process.env.REACT_APP_AWS_S3_KEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_AWS_S3_ACCESS_KEY}`,
      region: `${process.env.REACT_APP_AWS_REGION}`,
    });

    const s3 = new AWS.S3();
    const uploadPromises = selectedFiles.map(file => {
      const memberEmail = sessionStorage.getItem("email");
      const uploadParams = {
        Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
        Key: `members/${memberEmail}/orders/reviews/${orderId}/${file.name}`,
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
      return [];
    }
  };

  const handleSubmit = async () => {
    const uploadedFiles = await handleUpload();

    if (uploadedFiles.length === 0) {
      updateCurrentReview('savedUrl', 'empty');
      updateCurrentReview('savedPath', 'empty');
    } else {
      updateCurrentReview('savedUrl', uploadedFiles[0].savedUrl);
      updateCurrentReview('savedPath', uploadedFiles[0].savedPath);
    }

    const newReview = {
      orderId: parseInt(orderId, 10),
      isVisible: currentReview.is_visible === 1,
      star: currentReview.rating * 2,
      content: currentReview.content,
      reviewImageDtos: uploadedFiles,
    };

    try {
      await createReview(newReview);
      navigate(-1);
    } catch (error) {
      console.error('리뷰 작성에 실패했습니다', error);
      console.log(newReview);
    }
  };

  const handleCheckboxChange = (e) => {
    updateCurrentReview('is_visible', e.target.checked ? 0 : 1);
  };

  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewImages} onClick={() => document.getElementById('imageUpload').click()}>
        {reviewImages.length > 0  ? (
          reviewImages.length === 1 ? (
            <div>
              <img src={reviewImages[0]} alt="review-single" className={styles.reviewImage} />
            </div>
          ) : (
            <Slider {...settings}>
              {reviewImages.map((img, index) => (
                img.savedUrl !== 'empty' && (
                  <div key={index}>
                    <img src={img} alt={`review-${index}`} className={styles.reviewImage} />
                  </div>
                )
              ))}
            </Slider>
          )
        ) : <div className={styles.imageUpload}>image</div>}
        <input
          id="imageUpload"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>

      <div className={styles.starRating}>
        <p>음식은 어떠셨나요?</p>
        <StarRating maxStars={5} onRatingChange={(value) => updateCurrentReview('rating', value)} />
      </div>

      <textarea
        value={currentReview.content}
        onChange={(e) => updateCurrentReview('content', e.target.value)}
        placeholder="리뷰를 입력하세요"
        className={styles.textarea}
        maxLength={100}
      />

      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={currentReview.is_visible === 0}
            onChange={handleCheckboxChange}
            value={currentReview.is_visible}
          />
          사장님에게만 보이기
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
