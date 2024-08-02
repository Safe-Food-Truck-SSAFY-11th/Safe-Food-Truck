import useMenuStore from "store/users/owner/menuStore";
import MenuUpdate from "./MenuUpdate";
import MenuRegist from "./MenuRegist";
import MenuDelete from "./MenuDelete";
import MenuItem from "./MenuItem";
import styles from "./ManageMenu.module.css";
import { useEffect } from "react";

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
    fetchMenu,
  } = useMenuStore();

  useEffect(() => {
    fetchMenu();
  }, []); // 빈 배열을 사용하여 마운트 시 한 번만 호출

  const clickRemove = (menuId) => {
    const answer = window.confirm(
      "메뉴를 삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?"
    );
    console.log(answer);
    if (answer) {
      removeMenu(menuId);
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.compSize}>
        <h3>메뉴 관리</h3>
        <div className={styles.menuContainer}>
          {menus.length === 0 ? (
            <p>메뉴가 없습니다.</p>
          ) : (
            menus.map((menu) => (
              <MenuItem
                key={menu.menuId} // menuId를 키로 사용
                menu={menu}
                onEdit={() => openUpdate(menu)} // 메뉴 클릭하면 해당 메뉴 정보 담긴 수정 모달이 뜸
                onDelete={() => clickRemove(menu.menuId)}
              />
            ))
          )}
          <button
            type="button"
            className={styles.addMenuButton}
            onClick={openRegist}
          >
            +
          </button>
        </div>
        {isUpdateOpen && <MenuUpdate />}
        {isRegistOpen && <MenuRegist />}
        {/* {isDeleteOpen && <MenuDelete />} */}
      </div>
    </>
  );
};

export default ManageMenu;
