import { useEffect } from "react";
import "../css/Category.css"; // 스타일 파일 import

export default function Category() {

  useEffect(() => {
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const carousel = document.querySelector('.carousel');

    // 왼쪽 화살표 클릭 시
    leftArrow.addEventListener('click', () => {
      carousel.scrollBy({
        left: -carousel.offsetWidth, // 한 화면만큼 왼쪽으로 스크롤
        behavior: 'smooth' // 부드러운 스크롤
      });
    });

    // 오른쪽 화살표 클릭 시
    rightArrow.addEventListener('click', () => {
      carousel.scrollBy({
        left: carousel.offsetWidth, // 한 화면만큼 오른쪽으로 스크롤
        behavior: 'smooth' // 부드러운 스크롤
      });
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      leftArrow.removeEventListener('click', () => {});
      rightArrow.removeEventListener('click', () => {});
    };

  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="category">
      <button className="arrow left" id="left-arrow">&#8592;</button> 

      <div className="carousel">
        <div className="item">시험 준비</div>
        <div className="item">비지니스</div>
        <div className="item">외국어</div>
        <div className="item">기술,개발</div>
        <div className="item">크리에이티브</div>
        <div className="item">커뮤니티</div>
        <div className="item">라이프스타일</div>
      </div>

      <button className="arrow right" id="right-arrow">&#8594;</button>
    </div>
  );
}
