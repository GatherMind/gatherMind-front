import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/schedule";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 일정 조회
export const getSchedule = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 조회 실패: ", error);
    throw error;
  }
};

// 일정 생성
export const createSchedule = async (scheduleData, token) => {
  try {
    const response = await apiClient.post(`${API_URL}`, scheduleData);

    return response.data;
  } catch (error) {
    console.error("일정 생성 실패: ", error);
    throw error;
  }
};

// 일정 수정
export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await apiClient.put(`${API_URL}/${id}`, scheduleData);

    return response.data;
  } catch (error) {
    console.error("일정 수정 실패: ", error);
    throw error;
  }
};

// 일정 삭제
export const deleteSchedule = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.error("일정 삭제 실패: ", error);
    throw error;
  }
};
