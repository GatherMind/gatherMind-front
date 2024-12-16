import googleLoginImage from "../assets/google-login.svg";
import githubLoginImage from "../assets/github-login.svg";
import kakaoLoginImage from "../assets/kakao-login.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const socialLinks = [
  {
    id: "google",
    href: `${API_BASE_URL}/oauth2/authorization/google`,
    imageSrc: googleLoginImage,
    alt: "GOOGLE LOGIN",
  },
  {
    id: "github",
    href: `${API_BASE_URL}/oauth2/authorization/github`,
    imageSrc: githubLoginImage,
    alt: "GITHUB LOGIN",
  },
  {
    id: "kakao",
    href: `${API_BASE_URL}/oauth2/authorization/kakao`,
    imageSrc: kakaoLoginImage,
    alt: "KAKAO LOGIN",
  },
];

export default socialLinks;
