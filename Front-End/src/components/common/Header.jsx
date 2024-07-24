import styles from './Header.module.css';
import SearchAddress from './SearchAddress';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.topSection}>
                <div className={styles.leftSection}>
                    <span role="img" aria-label="location" className={styles.icon}>📍</span> 대전광역시 유성구 봉명동 655-3
                </div>
                <div className={styles.rightSection}>
                    <span role="img" aria-label="cart" className={styles.icon}>🛒</span>
                    <span role="img" aria-label="myPage" className={styles.icon}>👤</span>
                    <span role="img" aria-label="notification" className={styles.icon}>🔔</span>
                    <span role="img" aria-label="logout" className={styles.icon}>🔲</span>
                </div>
            </div>
            <SearchAddress />
        </header>
    );
};

export default Header;