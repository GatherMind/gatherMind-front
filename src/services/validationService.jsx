// 에러 메시지 상수
const ERROR_MESSAGES = {
  id: "아이디는 8~20자의 영문 소문자와 숫자만 사용할 수 있습니다.",
  password:
    "비밀번호는 8~20자이며, 영문 소문자, 숫자, 특수문자 @$!%*#?& 중 각각 하나 이상을 포함해야 합니다.",
  passwordMatch: "입력하신 비밀번호와 동일하게 적어주세요.",
  nickname: "닉네임은 한글(+숫자)만 가능하며 2~10글자 사이로 입력해주세요.",
  phone: "숫자 11자리만 입력해주세요.",
};

// 아이디 유효성 검사
export const isIdValid = (loginId) => {
  const isValid = /^[a-z0-9]{8,20}$/.test(loginId);
  return { isValid, errorMessage: isValid ? "" : ERROR_MESSAGES.id };
};

// 비밀번호 유효성 검사
export const isPasswordValid = (loginPw) => {
  const isValid =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
      loginPw
    );
  return { isValid, errorMessage: isValid ? "" : ERROR_MESSAGES.password };
};

// 비밀번호 일치 여부 검사
export const isPasswordMatch = (password, confirmPw) => {
  const isValid = password === confirmPw;
  return { isValid, errorMessage: isValid ? "" : ERROR_MESSAGES.passwordMatch };
};

// 닉네임 유효성 검사
export const isNicknameValid = (nick) => {
  const isValid =
    /^(?![ㄱ-ㅎ]$)(?![ㅏ-ㅣ]$)(?![ㅐ-ㅚ]$)(?=.{2,10}$)[가-힣0-9]{2,10}$/.test(
      nick
    );
  return { isValid, errorMessage: isValid ? "" : ERROR_MESSAGES.nickname };
};

// 핸드폰 번호 유효성 검사
export const isPhoneValid = (phone) => {
  const isValid = /^\d{11}$/.test(phone);
  return { isValid, errorMessage: isValid ? "" : ERROR_MESSAGES.phone };
};

// 개별 필드 유효성 검사 및 상태 업데이트
export const validateField = (validator, value, updateValid, updateError) => {
  const { isValid, errorMessage } = validator(value);
  updateValid(isValid);
  updateError(errorMessage);
  return isValid;
};
