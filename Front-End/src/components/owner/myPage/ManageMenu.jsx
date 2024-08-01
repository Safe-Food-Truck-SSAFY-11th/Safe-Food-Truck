import useMenuStore from "store/users/owner/menuStore";
import MenuUpdate from "./MenuUpdate";
import MenuRegist from "./MenuRegist";
import MenuDelete from "./MenuDelete";
import MenuItem from "./MenuItem";
import styles from "./ManageMenu.module.css";

const ManageMenu = () => {
  const {
    menus,
    removeMenu,
    isRegistOpen,
    isUpdateOpen,
    isDeleteOpen,
    openRegist,
    openUpdate,
    openDelete,
  } = useMenuStore();

  return (
    <>
      <div className={styles.compSize}>
        <h3>메뉴 관리</h3>
        <div className={styles.menuContainer}>
          {menus.map((menu, index) => (
            <MenuItem
              key={index}
              menu={menu}
              onEdit={() => openUpdate(menu)} //메뉴 클릭하면 해당 메뉴 정보 담긴 수정 모달이 뜸
              onDelete={() => removeMenu(index)}
            />
          ))}
          <button
            type="button"
            className={styles.addMenuButton}
            onClick={openRegist}
          >
            +
          </button>
        </div>
        {isUpdateOpen && <MenuUpdate />} // 각각 수정할 것
        {isRegistOpen && <MenuRegist />}
        {isDeleteOpen && <MenuDelete />}
      </div>
    </>
  );
};

export default ManageMenu;
