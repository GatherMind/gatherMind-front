import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getMemberByToken,
  getMystudyByToken,
} from "../services/MemberApiService";

export default function UseMemberApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 데이터 로딩 시작
        const response = await getMystudyByToken(); // 토큰으로 로그인된 사용자 정보 확인
        if (response && response.data) {
          console.log(response.data);
          console.log(response);
          setData(response.data);
        }
      } catch (error) {
        console.error("에러입니다:", error);
        setError("데이터를 가져오는 데 실패했습니다."); // 에러 메시지 설정
        setData([]); // 오류 발생 시 빈 데이터 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData();
  }, []); // 의존성 배열이 빈 배열이므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  console.log(data);

  return { data, loading, error }; // 상태를 모두 반환
}

// {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/study/getallstudies");
//         console.log(response.data);
//         const sortedData = response.data.sort((a, b) => {
//           const dateA = new Date(a.createdAt);
//           const dateB = new Date(b.createdAt);
//           return dateB - dateA; // 내림차순 정렬
//         });

//         setData(sortedData);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { data, loading, error };
// }
