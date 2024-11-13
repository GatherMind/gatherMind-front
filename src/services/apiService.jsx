import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 스터디 생성
export const createStudy = async (studyData) => {
  try {
    console.log(studyData);
    const response = await axios.post(`${API_URL}/study`, studyData);

    return response.data;
  } catch (error) {
    console.log("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 수정
export const updateStudy = async (studyId, studyData) => {
  try {
    const response = await axios.put(`${API_URL}/study/${studyId}`, studyData);

    return response.data;
  } catch (error) {
    console.log("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 정보, 멤버 조회, 게시판 조회
export const getStudyInfoAndMembersAndBoards = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/study/${id}/members`);

    return response.data;
  } catch (error) {
    console.error("Meeting data fetch error : ", error);
    throw new Error("Failed to fetch meeting data.");
  }
};

// 스터디 멤버, 게시판 조회
export const getStudyMembersAndBoards = async (id, pageNumber) => {
  console.log("id", id);
  console.log("pageNumber", pageNumber);
  try {
    const response = await axios.get(`${API_URL}/study/${id}/members/boards`, {
      params: { page: pageNumber, size: 5 },
    });
    console.log(response);

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
    const response = await axios.get(`${API_URL}/study/${id}/boards`, {
      params: { page: pageNumber, size: 5 },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 스터디 약속 조회
export const getStudySchedule = async (studyId) => {
  try {
    const response = await axios.get(`${API_URL}/study/${studyId}/schedules`);
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

// 스터디 아이디로 스터디 조회
export const getStudyById = async (studyId) => {
  try {
    const response = await axios.get(`${API_URL}/study/${studyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info: ", error);
    throw new Error("Failed to fetch study info.");
  }
};

// 현재 아이디 정보 조회
export const getMyInfoById = async (memberId, studyId) => {
  try {
    const response = await axios.get(
      `${API_URL}/member/role?memberId=${memberId}&studyId=${studyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my Info: ", error);
    throw new Error("Failed to fetch my Info.");
  }
};

// 게시글 조회
export const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/question/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 조회 실패: ", error);
    throw error;
  }
};

// 게시글 생성
export const createQuestion = async (memberId, studyId, questionData) => {
  try {
    const response = await axios.post(`${API_URL}/question?memberId=${memberId}&studyId=${studyId}`, questionData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw error;
  }
};

// 게시글 수정
export const updateQuestion = async (id, questionData) => {
  try {
    const response = await axios.put(`${API_URL}/question/${id}`, questionData); 
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패: ", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/question/${id}`); 
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패: ", error);
    throw error;
  }
};

// 댓글 생성
export const createAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${API_URL}/answer`, answerData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 생성 실패: ", error);
    throw error;
  }
};

// 댓글 수정
export const updateAnswer = async (id, content) => {
  try {
    const response = await axios.put(`${API_URL}/answer/${id}`,
        content, 
        {
            headers: { "Content-Type": "text/plain" }
        }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패: ", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteAnswer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/answer/${id}`); 
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패: ", error);
    throw error;
  }
};

// 일정 생성
export const createSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(`${API_URL}/schedule`, scheduleData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 생성 실패: ", error);
    throw error;
  }
};