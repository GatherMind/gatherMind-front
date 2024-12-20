import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/admin";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

export const getMemberCount = async () => {
  try {
    const response = await apiClient.get(`/admin/member-count`);

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const getMemberCount7Day = async () => {
  try {
    const response = await apiClient.get(`/admin/member-count-7day`);

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const getContentCount = async () => {
  try {
    const response = await apiClient.get(`/admin/content-count`);

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const getMembers = async () => {
  try {
    const response = await apiClient.get(`/admin/members`);

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const modifyMember = async (data) => {
  try {
    await apiClient.put(`/admin/member`, data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // 서버에서 반환된 유효성 검사 메시지 처리
      throw error.response.data; // JSON 형태의 에러 메시지 전달
    }
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};

export const deleteMember = async (memberId) => {
  try {
    await apiClient.delete(`/admin/member/${memberId}`);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // 서버에서 반환된 유효성 검사 메시지 처리
      throw error.response.data; // JSON 형태의 에러 메시지 전달
    }
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};

export const getAllContent = async () => {
  try {
    const response = await apiClient.get(`/admin/contents`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};

export const deleteContent = async (contentId, type) => {
  try {
    await apiClient.delete(`/admin/${type}/${contentId}`);
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};

export const modifyStudy = async (data) => {
  try {
    await apiClient.put(`/admin/study`, data);
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};

export const deleteStudy = async (studyId) => {
  try {
    await apiClient.delete(`/admin/study/${studyId}`);
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Unexpected error occurred.");
  }
};
