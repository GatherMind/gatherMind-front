import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("/api/members/me");
    console.log(response.data);
  } catch (error) {
    console.error("데이터 요청 중 오류:", error);
  }
};