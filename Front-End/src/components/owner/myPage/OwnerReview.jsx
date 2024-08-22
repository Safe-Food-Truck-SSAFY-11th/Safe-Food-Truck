import Header from "components/common/Header";
import ReviewList from "./ReviewList";
import styles from "./OwnerReview.module.css";

function OwnerReview() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.scrollable}>
          <ReviewList />
        </div>
      </div>
    </>
  );
}

export default OwnerReview;
