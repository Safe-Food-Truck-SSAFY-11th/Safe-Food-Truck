import Header from "components/common/Header";
import ReviewList from "./ReviewList";
import styles from "./OwnerReview.module.css";

function OwnerReview() {

    return (
        <>
            <div className={styles.container}>
                <Header />
                <ReviewList />
            </div>
        </>
    );
}

export default OwnerReview;
