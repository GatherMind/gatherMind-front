import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/question";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 게시글 조회
export const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detail/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 조회 실패: ", error);
    throw error;
  }
};

// 댓글 조회
export const getAnswers = async (id, page) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/answers?page=${page}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 조회 실패 : ", error);
    throw error;
  }
};

// 게시글 생성
// export const createQuestion = async (memberId, studyId, questionData) => {
//   console.log(questionData);
//   try {
//     const response = await axios.post(
//       `${API_URL}?memberId=${memberId}&studyId=${studyId}`,
//       questionData
//     );
//     console.log(response);

//     return response.data;
//   } catch (error) {
//     console.error("게시글 생성 실패: ", error);
//     throw error;
//   }
// };

// 게시글 생성
export const createQuestion = async (studyId, questionData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}?studyId=${studyId}`,
      questionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw error;
  }
};

// 게시글 수정
export const updateQuestion = async (id, questionData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, questionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패: ", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteQuestion = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패: ", error);
    throw error;
  }
};
