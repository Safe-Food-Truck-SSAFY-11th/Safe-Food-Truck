import { create } from 'zustand';
import axios from 'utils/axiosInstance';

const useScheduleStore = create((set) => ({
    scheduleList: [],
    fetchSchedule: async (storeId) => {
        try {
            const response = await axios.get(`schedules/${storeId}`);
            set({ scheduleList: response.data.scheduleList });
            console.log(response.data);
        } catch (error) {
            console.error("스케줄 조회 실패: ", error);
        }
    },

    registSchedule: async (data) => {
        try {
            await axios.post('schedules', data);
            alert('스케줄 입력이 완료되었습니다');
        } catch (error) {
            console.error("스케줄 등록 실패: ", error);
        }
    },

    deleteSchedule: async (scheduleId) => {
        try {
            await axios.delete(`schedules/${scheduleId}`);
            alert('스케줄이 삭제되었습니다');
        } catch (error) {
            console.error("스케줄 삭제 실패: ", error);
        }
    }
}));

export default useScheduleStore;