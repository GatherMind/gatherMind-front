import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMemberByToken } from "../services/MemberApiService";

export default function UseMemberApi() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authToken } = useAuth();

  useEffect(() => {
    const fetchMyInfo = async () => {
      if (!authToken) {
        setLoading(false);
        setData("");
        return;
      }

      try {
        // const response = await getMyInfo(authToken);
        const response = await getMemberByToken();
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    // axios
    //   .get("http://localhost:8080/member/me")
    //   .then((response) => {
    //     console.log(response.data);
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError("Error fetching data");
    //     setLoading(false);
    //   });

    fetchMyInfo();
  }, [authToken]);

  return {
    data,
    loading,
    error,
  };
}
