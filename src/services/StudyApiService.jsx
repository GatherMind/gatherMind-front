import axios from "axios";
import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/study";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}
// 스터디 생성
export const createStudy = async (studyData, token) => {
  try {
    const response = await apiClient.post("/study", studyData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 수정
export const updateStudy = async (studyId, studyData, token) => {
  try {
    const response = await apiClient.put(`/study/${studyId}`, studyData);

    return response.data;
  } catch (error) {
    console.error("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 정보, 멤버 조회, 게시판 조회
export const getStudyInfoAndMembersAndBoards = async (id) => {
  try {
    const response = await apiClient.get(`/study/${id}/members`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Meeting data fetch error : ", error);
    throw new Error("Failed to fetch meeting data.");
  }
};

// 스터디 멤버, 게시판 조회
export const getStudyMembersAndBoards = async (id, pageNumber) => {
  try {
    const response = await apiClient.get(`/study/${id}/members/boards`, {
      params: { page: pageNumber, size: 5 },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 스터디 멤버, 게시판 조회
export const getBoards = async (id, pageNumber) => {
  console.log("id", id);
  console.log("pageNumber", pageNumber);
  try {
    const response = await apiClient.get(`/study/${id}/boards`, {
      params: { page: pageNumber, size: 5 },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 스터디 일정 조회
export const getStudySchedule = async (studyId) => {
  try {
    const response = await apiClient.get(`/study/${studyId}/schedules`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting appointments: ", error);
    throw new Error("Failed to fetch meeting appointments.");
  }
};

// 스터디 아이디로 스터디 조회
export const getStudyById = async (studyId) => {
  try {
    const response = await apiClient.get(`/study/${studyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info: ", error);
    throw new Error("Failed to fetch study info.");
  }
};

// 스터디 삭제
export const deleteStudy = async (studyId, token) => {
  try {
    const response = await apiClient.delete(`/study/${studyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info: ", error);
    throw new Error("Failed to fetch study info.");
  }
};

// 전체 스터디 조회
export const getAllStudies = async () => {
  try {
    const response = await axios.get(`${API_URL + '/getallstudies'}`);
    return response;
  } catch (error) {
    console.error("전체 스터디 조회 : ", error);
    throw error;
  }
};
