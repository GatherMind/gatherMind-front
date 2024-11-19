import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/schedule";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 일정 조회
export const getSchedule = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 조회 실패: ", error);
    throw error;
  }
};

// 일정 생성
export const createSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(`${API_URL}`, scheduleData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 생성 실패: ", error);
    throw error;
  }
};

// 일정 수정
export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, scheduleData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 수정 실패: ", error);
    throw error;
  }
};

// 일정 삭제
export const deleteSchedule = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.error("일정 삭제 실패: ", error);
    throw error;
  }
};
