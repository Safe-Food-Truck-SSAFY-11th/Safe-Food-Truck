import Header from '../../common/Header';
import TruckStatus from './TruckStatus';
import OpenClose from './OpenClose';
import JiguemOrder from './JiguemOrder';
import styles from './MainOwner.module.css';

const MainOwner = () => {
  return (
    <div className={styles.container}>
      <Header />
      <TruckStatus />
      <OpenClose />
      <JiguemOrder />
    </div>
  );
};

export default MainOwner;