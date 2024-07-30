import React from 'react';
import { useParams } from 'react-router-dom';
import useReviewStore from '../../../store/reviews/useReviewStore';
import useReviewImageStore from '../../../store/reviews/useReviewImageStore';
import useCustomerStore from '../../../store/users/customer/customerStore';
import StarRating from './StarRating';
import styles from './CreateReview.module.css';

const CreateReview = () => {
  const { orderId } = useParams();
  const {
    currentReview,
    updateCurrentReview,
    addReview,
  } = useReviewStore();
  const {
    reviewImages,
    addReviewImage,
  } = useReviewImageStore();
  const { form: { nickname, email } } = useCustomerStore();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      // 이미지 업로드 로직 추가 (예: 서버에 업로드하고 이미지 URL을 얻는 등)
      const newImage = {
        id: null,
        original_filename: file.name,
        stored_filename: `stored_${file.name}`,
        path: `path/to/uploaded/images/${file.name}`,
      };
      addReviewImage(newImage);
    });
  };

  const handleSubmit = () => {
    const newReview = {
      ...currentReview,
      email,
      foodTruck_id: parseInt(orderId, 10),
    };

    // 리뷰와 이미지를 제출하는 로직을 추가하세요
    console.log(newReview);
  };

  const handleCheckboxChange = (e) => {
    updateCurrentReview('is_visible', e.target.checked ? 1 : 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageUpload} onClick={() => document.getElementById('imageUpload').click()}>
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
        value={nickname}
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
      <div>
        {reviewImages.map((image) => (
          <div key={image.id}>
            <p>{image.original_filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateReview;
