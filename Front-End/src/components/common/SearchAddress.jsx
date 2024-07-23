import styles from './SearchAddress.module.css';

const SearchAddress = () => {
    return (
        <div className={styles.searchBar}>
            <span role="img" aria-label="search" className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="검색어를 입력하세요" className={styles.searchInput} />
        </div>
    );
};

export default SearchAddress;
