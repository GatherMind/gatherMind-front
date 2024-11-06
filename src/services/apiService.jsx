import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 그룹 생성
export const createMeeting = async (meetingData) => {
  try {
    const response = await axios.post(`${API_URL}/meeting`, meetingData);

    return response.data;
  } catch (error) {
    console.log("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 그룹생성, 그룹 멤버, 그룹 랭킹 조회
export const getMeetingWithMember = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/meeting/${id}`);

    return response.data;
  } catch (error) {
    console.error("Meeting data fetch error : ", error);
    throw new Error("Failed to fetch meeting data.");
  }
};

// 그룹 멤버, 랭킹 조회
export const getMeetingMembers = async (id, pageNumber) => {
  try {
    const response = await axios.get(`${API_URL}/meeting/${id}/member`, {
      params: { page: pageNumber, size: 10 },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 그룹 약속 조회
export const getMeetingAppointment = async (id, userId, pageNumber) => {
  try {
    const response = await axios.get(
      `${API_URL}/meeting/${id}/appointment/${userId}`,
      {
        params: { page: pageNumber, size: 5 },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting appointments: ", error);
    throw new Error("Failed to fetch meeting appointments.");
  }
};

// 멤버 조회
export const getMember = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/member/${id}`);

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

// 그룹에 멤버 초대(멤버쉽 생성)
export const createMembership = async (membershipData) => {
  try {
    const response = await axios.post(
      `${API_URL}/membership/member`,
      membershipData
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create membership: ", error);
    throw new Error("Failed to create membership.");
  }
};

// 참석 버튼
export const attendAppointment = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/membership/appointment`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to attend appointment: ", error);
    throw new Error("Failed to attend appointment.");
  }
};

// 아이디, 닉네임 중복 체크
export const checkDuplicate = async (field, value) => {
  try {
    const endpoint =
      field === "signupId" ? "/api/check-id" : "/api/check-nickname";
    const response = await axios.get(`${endpoint}?${field}=${value}`, {
      params: { [field]: value },
    });

    return response.data.isDuplicate
      ? `이미 사용 중인 ${field === "signupId" ? "아이디" : "닉네임"}입니다.`
      : `사용 가능한 ${field === "signupId" ? "아이디" : "닉네임"}입니다.`;
  } catch (error) {
    console.error("Duplicate check error: ", error);
    throw new Error("Failed to check duplicate.");
  }
};
