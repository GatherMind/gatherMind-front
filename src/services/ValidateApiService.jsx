import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// validate
export const duplicationCheck = async (field, value) => {
  try {
    const response = await axios.post(`${API_URL}/member/check-${field}`, {
      [field]: value,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch my Info: ", error);
    throw new Error("Failed to fetch my Info.");
  }
};