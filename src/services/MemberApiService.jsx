import axios from "axios";
import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/member";
const getAuthToken = () => localStorage.getItem("token");

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 현재 아이디 정보 조회
export const getMyInfoById = async (studyId, token) => {
  try {
    const response = await apiClient.get(`${API_URL}/role?studyId=${studyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my Info: ", error);
    throw new Error("Failed to fetch my Info.");
  }
};

// 멤버 조회
export const getMember = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Member not found.");
      }
      throw new Error("Error occurred while fetching the member data.");
    } else {
      console.error("Network error or server unreachable: ", error);
      throw new Error("Network error or server unreachable.");
    }
  }
};

// 토큰으로 내 정보 가져오기
export const getMemberByToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // 인증 헤더 추가
      },
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const getMyStudyByToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/my-studies`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // 인증 헤더 추가
      },
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 회원 정보 수정
export const updateMember = async (field, value) => {
  try {
    const requestBody = { [field]: value };

    const response = await axios.put(
      `${API_URL}/update`, // 올바른 경로 설정
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // 인증 헤더 추가
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 회원 정보 삭제
export const deleteMember = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete-account`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 가입된 스터디 개수 불러오기
export const getStudyCount = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/study-count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 작성한 질문 개수 불러오기
export const getQuestionCount = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/question-count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 작성한 답변 개수 불러오기
export const getAnswerCount = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/answer-count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 본인 작성 답변 가져오기
export const getMyAnswerList = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent-answers`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 본인 작성 질문 가져오기
export const getMyQuestionList = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent-questions`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 내 스터디 조회
export const getMyStudy = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/joined-groups`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.error("내 스터디 조회 실패 : ", error);
    throw error;
  }
};
