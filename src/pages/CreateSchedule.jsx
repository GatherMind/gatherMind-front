import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import { subDays } from "date-fns";
import "../styles/MeetingForm.css";
import "../styles/CreateSchedule.css";

const CreateSchedule = () => {
  const navigate = useNavigate();
  // const {studyId} = useLocation(); // StudyInfo 페이지에서 StudyId 값 받아오기

  // StudyInfo 페이지에서 StudyId 값 받아오기
  // 24.11.11 suhwan
  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};

  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // 주소 값 가져오기
  const [popup, setPopup] = useState(false);
  const handleInput = (data) => {
    let fullAddress = data.address; // 기본 주소
    let extraAddress = ""; // 참고항목

    if (data.addressType === "R") {
      // 도로명 주소 값 입력
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    setLocation(fullAddress);
  };
  const handleComplete = (e) => {
    e.preventDefault();
    setPopup(!popup);
  };

  // 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("일정 생성");
    console.log(
      "study_id : ",
      studyId,
      "title : ",
      title,
      ", time : ",
      dateTime,
      ", location : ",
      location
    );

    try {
      const response = await axios.post("http://localhost:8080/api/schedule", {
        studyId: 1, // test용
        title,
        dateTime: new Date(new Date(dateTime).getTime() + 540 * 60 * 1000),
        location,
        description,
      });
      console.log("일정 생성 완료 ", response);
    } catch (error) {
      console.log("일정 생성 실패");
    }

    navigate("./"); // 그룹 페이지로 이동하도록 수정
  };

  return (
    <div className="container">
      <h1>새로운 일정 생성</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>일정 이름 : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="일정 이름"
            required
          />
        </div>
        <div className="form-group">
          <label>날짜/시간 : </label>
          <div>
            <DatePicker
              selected={dateTime}
              onChange={(date) => setDateTime(date)}
              minDate={subDays(new Date(), 0)}
              timeInputLabel="Time:"
              dateFormat="yyyy.MM.dd h:mm aa"
              showTimeInput
            />
          </div>
        </div>
        <div className="form-group">
          <label>위치 : </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="모이는 위치"
            required
          />
          <button onClick={handleComplete}>주소 검색</button>
          {popup && (
            <span>
              <DaumPostcode autoClose onComplete={handleInput} />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>설명 추가 :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default CreateSchedule;
