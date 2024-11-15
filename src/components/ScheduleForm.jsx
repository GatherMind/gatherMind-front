import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import { subDays } from "date-fns";

const ScheduleForm = ({ onSubmit, studyId, scheduleData }) => {

    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log(scheduleData);
    
        if (scheduleData) { // 수정모드일 경우
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
        console.log(fullAddress);

        setLocation(fullAddress);
    };
    const handleComplete = (e) => {
        e.preventDefault();
        setPopup(!popup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var SceduleDateTime = new Date(new Date(dateTime).getTime() + 540 * 60 * 1000);
        onSubmit({title, dateTime : SceduleDateTime, location, description, studyId});
    }

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
    );
};

export default ScheduleForm;