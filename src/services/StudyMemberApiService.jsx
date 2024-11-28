import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/study-members";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

export const applyStudy = async (studyId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      { studyId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("스터디 지원 실패 : ", error);
    throw error;
  }
};

export const confirmStudyMember = async ({ studyId, memberId }, token) => {
  try {
    const response = await axios.put(
      `${API_URL}`,
      { studyId, memberId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("스터디 승인 실패 : ", error);
    throw error.response.data;
  }
};
