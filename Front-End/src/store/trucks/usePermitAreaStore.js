import { create } from "zustand";
// import permitAreaListData from "assets/전국푸드트럭허가구역표준데이터.json";
// import permitAreaListData from "assets/전국푸드트럭허가구역표준데이터1.json";
import permitAreaListData from "assets/전국푸드트럭허가구역표준데이터2.json";

const usePermitAreaStore = create((set) => ({
  isOpen: false,
  openWarning: () => set({ isOpen: true }),
  closeWarning: () => set({ isOpen: false }),
  permitAreaList: permitAreaListData.records, // 초기 상태에 데이터 설정
  filteredAreaList: [], // 시군구명, 시도명으로 필터링된 데이터
  coordList: [],
  addCoord: (x, y) => {
    set((state) => {
      const newCoord = [x, y];
      // 기존 좌표 리스트에서 중복 체크
      const isDuplicate = state.coordList.some(
        (coord) => coord[0] === x && coord[1] === y
      );

      // 중복이 아닐 경우에만 추가
      if (!isDuplicate) {
        return {
          coordList: [...state.coordList, newCoord],
        };
      }
      return state; // 중복일 경우 상태를 그대로 반환
    });
  },
  filterByRegion: (sido) => {
    set((state) => ({
      filteredAreaList: state.permitAreaList.filter((area) => {
        const matchesSido = sido ? area.시도명.includes(sido) : true;
        return matchesSido;
      }),
    }));
  },
}));

export default usePermitAreaStore;
