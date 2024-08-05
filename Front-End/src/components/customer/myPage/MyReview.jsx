// import React from 'react';
// import styles from './MyReview.module.css';

// const MyReview = ({memberInfo , myReviews}) => { 

//   console.log(myReviews.reviewList)

//   return (
//     <div className={styles.container}>
//       <h3>{memberInfo.nickname} 님이 작성한 리뷰에요!</h3>
//       {reviews.map(review => (
//         <div key={review.id} className={styles.reviewCard}>
//           <div className={styles.reviewContent}>
//             <img src="/burger.png" alt="버거" className={styles.foodImage} />
//             <span><button className={styles.deleteButton}>✖</button></span>
//           </div>
//           <div className={styles.reviewText}>
//             <h4>용훈 님 ★ {review.rating}</h4>
//             <hr className={styles.hrLine}/>
//             <p>{review.comment}</p>
//             <p>{review.date}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyReview;
