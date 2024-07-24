import styles from './RegistTruck.module.css';
import imageIcon from '../../assets/images/truck-img.png';
import useTruckStore from '../../store/users/owner/truckStore';
import useMenuStore from '../../store/users/owner/menuStore';
import MenuCreate from './MenuCreate';

const RegistTruck = () => {
    const { form, setForm, setImage, toggleWorkingDay } = useTruckStore();
    const { isOpen, openMenu, menus, removeMenu } = useMenuStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(name, value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setImage(imageURL);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>푸드트럭 등록</h1>
            <div className={styles.imageUpload}>
                <img src={form.image || imageIcon} alt="이미지 업로드" className={styles.uploadedImage} />
                <input type="file" accept="image/*" onChange={handleImageChange} className={styles.imageInput} />
                <button type="button" className={styles.imageButton} onClick={() => document.querySelector('.imageInput').click()}>사진 바꾸기</button>
            </div>
            <div className={styles.inputContainer}>
                <label>상호명</label>
                <input type="text" name="storeName" value={form.storeName} onChange={handleChange} />
            </div>
            <div className={styles.inputContainer}>
                <label>카테고리</label>
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">선택하세요</option>
                    <option value="꼬치">꼬치</option>
                    <option value="음료">음료</option>
                    <option value="디저트">디저트</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label>메뉴</label>
                <div className={styles.menuContainer}>
                    {menus.map((menu, index) => (
                        <div key={index} className={styles.menuItem}>
                            <img src={menu.image || imageIcon} alt="메뉴 이미지" className={styles.menuImage} />
                            <div className={styles.menuDetails}>
                                <p>{menu.menuName}</p>
                                <p>{menu.price}원</p>
                            </div>
                            <div className={styles.menuButtons}>
                                <button type="button" className={styles.editButton}>수정</button>
                                <button type="button" className={styles.deleteButton} onClick={() => removeMenu(index)}>삭제</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className={styles.addMenuButton} onClick={openMenu}>+</button>
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>출근 요일</label>
                <div className={styles.daysContainer}>
                    {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                        <button
                            key={day}
                            type="button"
                            className={`${styles.dayButton} ${form.workingDays.includes(day) ? styles.activeDay : ''}`}
                            onClick={() => toggleWorkingDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>가게 설명</label>
                <textarea name="description" value={form.description} onChange={handleChange} />
            </div>
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>등록하기</button>
                <button type="button" className={styles.cancelButton}>취소하기</button>
            </div>
            {isOpen && <MenuCreate />}
        </form>
    );
};

export default RegistTruck;