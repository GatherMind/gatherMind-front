import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/study-members";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

export const applyStudy = async (studyId, token) => {
  if (!token) {
    throw new Error("Token is missing. User is not authenticated.");

    // // Redirect to login or show an error message
    // window.location.href = "/login"; // Example redirect
    // return;
  }

  try {
    const response = await apiClient.post(`${API_URL}`, { studyId });

    return response;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error(
            "Unauthorized: Please check your login credentials or token."
          );
          // Redirect or prompt for re-authentication if needed
          break;
        case 409:
          console.error("Conflict: You have already applied or are a member.");
          break;
        default:
          console.error(
            `Failed to apply to study - HTTP Code: ${error.response.status}`,
            error.response.data
          );
      }
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error in request setup:", error.message);
    }
    throw error;
  }
};

export const confirmStudyMember = async ({ studyId, memberId }, token) => {
  try {
    const response = await apiClient.put(`${API_URL}`, { studyId, memberId });
    return response;
  } catch (error) {
    console.error("스터디 승인 실패 : ", error);
    throw error.response.data;
  }
};

export const resignStudyMember = async ({ studyId, memberId }, token) => {
  try {
    const response = await apiClient.delete(
      `${API_URL}`,
      {
        data: { studyId, memberId },
      } // 쿼리 스트링으로 데이터 전달
    );
    return response;
  } catch (error) {
    console.error("스터디 승인 실패 : ", error);
    throw error.response.data;
  }
};

export const withdrawStudyMember = async ( studyId) => {
  try {
    const response = await apiClient.delete(
      `${API_URL}/${studyId}`
    );
    return response;
  } catch (error) {
    console.error("스터디 승인 실패 : ", error);
    throw error.response.data;
  }
};
