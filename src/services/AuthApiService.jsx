import axios from "axios";
import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 로그인
export const loginMember = async (memberId, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      memberId,
      password,
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const PasswordVerify = async (password) => {
  try {
    const response = await apiClient.post(`/auth/validate-password`, {
      password,
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachabnle: ", error);
    throw new Error("Network error or server unreachable.");
  }
};
