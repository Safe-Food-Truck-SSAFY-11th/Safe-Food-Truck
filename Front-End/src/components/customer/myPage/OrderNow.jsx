import React, { useEffect } from "react";
import styles from "./OrderNow.module.css";
import { useCustomerEventStore } from "store/eventStore";
import customerOrderStore from "store/orders/customerOrderStore";

const OrderNow = ({ memberInfo, joonbiOrders }) => {
  const { nowOrder, getOrderDetails, pastOrders } = customerOrderStore();
  const { customerOrderNotice, setCustomerOrderNotice, customerOrderDetail } =
    useCustomerEventStore();

  console.log("준비오더스!!!!!!!!!!!!", joonbiOrders);
  const recentOrders =
    joonbiOrders?.count === 0
      ? []
      : joonbiOrders.customerPreparingOrderResponseDtos;
  console.log("리센트 오더스!!!!!!!!!", recentOrders);
  const recentOrder =
    recentOrders.length > 0 ? recentOrders[recentOrders.length - 1] : null;

  useEffect(() => {
    console.log("나우오더!!!!!!!!!!!!!!!", nowOrder);
    console.log("패스트오더!!!!!!!!!!!!!!!", pastOrders);

    if (customerOrderNotice) {
      // getOrderList();
      setCustomerOrderNotice(false);
    }
  }, [customerOrderNotice]);

  const completeOrder =
    pastOrders.count === 0
      ? []
      : pastOrders.customerOrderResponseDtos[
          pastOrders.customerOrderResponseDtos.length - 1
        ];

  const statusMessage = (order) => {
    if (order.status === "pending") {
      return { message: "주문을 확인하고 있어요!", color: "#FF7F50" };
    } else if (order.status === "accepted") {
      if (order.cookingStatus === "completed") {
        return { message: "준비 완료 됐어요!", color: "green" };
      } else if (
        order.cookingStatus === "waiting" ||
        order.cookingStatus === "preparing"
      ) {
        return { message: "메뉴를 준비중이에요!", color: "#FF7F50" };
      }
    } else if (order.status === "rejected") {
      return { message: "주문을 거절했어요", color: "red" };
    }
    return { message: "상태를 알 수 없습니다.", color: "#000" };
  };

  useEffect(() => {
    console.log("최근오더!!!!!!!!!!!!!!!", recentOrder);

    if (recentOrder) {
      console.log("recentOrder :", recentOrder);
      getOrderDetails(recentOrder.orderId);
    } else if (!recentOrder) {
      console.log("completeOrder :", completeOrder);
      getOrderDetails(completeOrder.orderId);
    }
  }, [recentOrder, getOrderDetails]);

  if (completeOrder.length === 0 && !recentOrder) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  console.log("나우 오더!!!!!!", nowOrder);
  const orderToShow = recentOrder || nowOrder;

  if (!orderToShow) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  console.log("오더 투 쇼!!!!!!!!", orderToShow);
  const { message, color } = statusMessage(orderToShow);

  // orderTime을 월, 일, 시, 분 형식으로 변환하는 함수
  const formatOrderTime = (orderTime) => {
    if (!orderTime) return "시간 정보 없음";
    const date = new Date(orderTime);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // recentOrder와 nowOrder의 필드 차이를 처리하는 조건문
  const menuName = recentOrder
    ? orderToShow.orderTitle // recentOrder의 필드 사용
    : nowOrder?.orderMenuListResponseDto?.orderMenuResponseDtos[0]?.menuName ||
      "메뉴 정보가 없습니다"; // nowOrder의 필드 사용

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <span className={styles.status} style={{ color: color }}>
            {message}
          </span>
          <span className={styles.orderTime}>
            주문 시간 : {formatOrderTime(orderToShow.orderTime)}
          </span>
        </div>
        <div className={styles.orderDetails}>
          <p>{menuName}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
