import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import { subDays } from "date-fns";
import Modal from "./Modal";
import "../styles/global/Modal.css";
import "../styles/global/FormContainer.css";

const ScheduleForm = ({ onSubmit, scheduleData }) => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (scheduleData) {
      // 수정모드일 경우
      setTitle(scheduleData.title);
      setDateTime(scheduleData.dateTime);
      setLocation(scheduleData.location);
      setDescription(scheduleData.description);
    }
  }, [scheduleData]);

  // 주소 값 가져오기
  const [popup, setPopup] = useState(false);
  const handleInput = (data) => {
    let fullAddress = data.address; // 기본 주소
    let extraAddress = ""; // 참고항목

    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      fullAddress = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      fullAddress = data.jibunAddress;
    }

    if (data.userSelectedType === "R") {
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

    setLocation(fullAddress);
    setPopup(!popup);
  };
  const onTogglePopup = (e) => {
    setPopup(!popup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var SceduleDateTime = new Date(
      new Date(dateTime).getTime() + 540 * 60 * 1000
    );
    onSubmit({ title, dateTime: SceduleDateTime, location, description });
  };

  return (
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
        <>
          <DatePicker
            selected={dateTime}
            onChange={(date) => setDateTime(date)}
            minDate={subDays(new Date(), 0)}
            timeInputLabel="Time:"
            dateFormat="yyyy.MM.dd h:mm aa"
            showTimeInput
          />
        </>
      </div>
      <div className="form-group">
        <label>위치 : </label>
        <div className="flex-row">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="자유롭게 입력해주세요. ex) 줌, 학교"
            required
          />
          <button type="button" className="button" onClick={onTogglePopup}>
            정확한 주소 찾기
          </button>
        </div>
        <Modal isOpen={popup} onClose={onTogglePopup} title={"주소 검색하기"}>
          <DaumPostcode onComplete={handleInput} />
        </Modal>
      </div>
      <div className="form-group">
        <label>설명 추가 :</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="button" type="submit">
        저장
      </button>
    </form>
  );
};

export default ScheduleForm;
