import { create } from "zustand";
import permitAreaListData from "assets/전국푸드트럭허가구역표준데이터.json";

const usePermitAreaStore = create((set) => ({
  permitAreaList: permitAreaListData.records, // 초기 상태에 데이터 설정
  filteredAreaList: [], // 시군구명, 시도명으로 필터링된 데이터
  coordList: [],
  addCoord: (x, y) => {
    set((state) => ({
      coordList: [...state.coordList, [x, y]],
    }));
  },
  filterByRegion: (sigungu, sido) => {
    set((state) => ({
      filteredAreaList: state.permitAreaList.filter((area) => {
        const matchesSido = sido ? area.시도명.includes(sido) : true;
        return matchesSido;
      }),
    }));
  },
  updateCoordinates: (address, coordX, coordY) => {
    console.log("여기 왔어용");
    set((state) => ({
      filteredAreaList: state.filteredAreaList.map((area) => {
        if (
          area.소재지도로명주소 === address ||
          area.소재지지번주소 === address
        ) {
          console.log("업데이트 해용");
          return { ...area, 경도: coordX, 위도: coordY }; // 경도와 위도 업데이트
        }
        return area;
      }),
    }));
  },
}));

export default usePermitAreaStore;
