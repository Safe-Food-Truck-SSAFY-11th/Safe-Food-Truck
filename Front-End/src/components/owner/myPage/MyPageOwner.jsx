import Header from "../../common/Header";
import OwnerInfo from "./OwnerInfo";
import SalesChart from "./SalesChart";
import styles from "./MyPageOwner.module.css";

const MyPageOwner = () => {
  return (
    <>
      <Header />
      <OwnerInfo />
      <SalesChart />
    </>
  );
};

export default MyPageOwner;
