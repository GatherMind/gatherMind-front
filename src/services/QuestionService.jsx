// 날짜/시간 포맷
export const dateFormat = (data) => {
    // console.log(datetime);
    var datetime = new Date(data);

    var year = datetime.getFullYear();
    var month = datetime.getMonth()+1;
    var date = datetime.getDate();

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;

    var hour = datetime.getHours();
    var minute = datetime.getMinutes();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    return year + ". " + month + ". " + date + " "  + hour + ":" + minute;
}