import { useState, useEffect } from "react";
import { getAllStudies } from "../services/StudyApiService.jsx";

export default function UseGroupApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/study/getallstudies");
        console.log(response.data);

        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // 내림차순 정렬
        });

        setData(sortedData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
     console.log('그룹', data)
    fetchData(); 
  }, []); 

  return { data, loading, error };
}
