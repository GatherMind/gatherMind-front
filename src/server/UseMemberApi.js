


import axios from "axios";
import React, { useEffect, useState } from "react";



export default function UseMemberApi() { 
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);





  useEffect(() => {


    axios
     .get("http://localhost:8080/member/me")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
  
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);



  return  {


    data,loading,error
};  


}

