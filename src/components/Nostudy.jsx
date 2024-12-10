import React, { useEffect, useState } from 'react';


export default function Nostudy(){

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);



  return (


    <div className='nostudy'>
          <div className="mytitle">내 스터디</div>
    
          <div className={`animate__animated ${animate ? 'animate__shakeY animate__bounce' : ''}`}>
      <h1 className='bounce'>

        참여 내역이 없습니다
        <br/>
       스터디에 참여해보세요

      </h1>
     </div>
     </div>

  ) 


}


