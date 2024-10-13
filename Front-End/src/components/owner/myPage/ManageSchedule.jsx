import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTruckStore from "store/users/owner/truckStore";
import useScheduleStore from "store/trucks/scheduleStore";
import styles from "./ManageSchedule.module.css";
import ScheduleMap from "./ScheduleMap";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const ManageSchedule = () => {
  const navigate = useNavigate();
  const { truckInfo } = useTruckStore();
  const { scheduleList, fetchSchedule, registSchedule, deleteSchedule } =
    useScheduleStore();
  const [selectedDay, setSelectedDay] = useState(0);
  const [formData, setFormData] = useState({
    day: 0,
    address: "",
    addAddress: "",
  });

  useEffect(() => {
    if (truckInfo && truckInfo.storeId) {
      fetchSchedule(truckInfo.storeId);
    }
  }, [truckInfo, fetchSchedule]);

  useEffect(() => {
    if (scheduleList.length > 0) {
      const daySchedule = scheduleList.find(
        (schedule) => schedule.day === selectedDay
      ) || { address: "", addAddress: "" };
      setFormData({
        day: selectedDay,
        address: daySchedule.address,
        addAddress: daySchedule.addAddress,
        scheduleId: daySchedule.scheduleId,
      });
    }
  }, [selectedDay, scheduleList]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    registSchedule(formData);
  };

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  const handleMapConfirm = (address) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: address,
    }));
  };

  const handleDelete = (scheduleId) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      deleteSchedule(scheduleId);
    }
  };

  const handleGoBack = () => {
    navigate("/mypageOwner");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>스케줄 관리</h2>
      <div className={styles.dayButtons}>
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(index)}
            className={selectedDay === index ? styles.selectedButton : styles.dayButton}
          >
            {day}
          </button>
        ))}
      </div>
      <h2 className={styles.header}><span className={styles.weekday}>{days[selectedDay]}요일</span>은 어디로 갈까요? 🛺</h2>
      <div className={styles.mapContainer}>
        <ScheduleMap
          onConfirm={handleMapConfirm}
          initialAddress={formData.address}
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>세부 주소</label>
          <input
            type="text"
            name="addAddress"
            value={formData.addAddress}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>입력</button>
          {formData.scheduleId && (
            <button
              type="button"
              onClick={() => handleDelete(formData.scheduleId)}
              className={styles.deleteButton}
            >
              삭제
            </button>
          )}
          <button type="button" onClick={handleGoBack} className={styles.backButton}>
            나가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSchedule;
