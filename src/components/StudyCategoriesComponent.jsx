import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/StudyCategory.css";

const StudyCategoriesComponent = ({
  studyCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const containerRef = useRef(null);
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setRightArrowVisible] = useState(false);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);

  const [scrollDistance, setScrollDistance] = useState(300);

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      console.log({ scrollLeft, scrollWidth, clientWidth });

      // 스크롤 가능한 경우에만 화살표 표시
      const canScroll = scrollWidth > clientWidth;
      setLeftArrowVisible(scrollLeft > 0 && canScroll);
      setRightArrowVisible(scrollLeft + clientWidth < scrollWidth && canScroll);
    }
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        console.log("Initial Check", { scrollWidth, clientWidth }); // 디버깅
        const canScroll = scrollWidth > clientWidth;
        setRightArrowVisible(canScroll);
        setLeftArrowVisible(false);
        setScrollDistance(clientWidth * 0.8);
      }
    };

    // 초기 렌더링 후 강제 크기 확인
    const timeout = setTimeout(updateScrollState, 1); // 50ms 지연

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        console.log("Resize/Scroll Check", { scrollWidth, clientWidth }); // 디버깅
        const canScroll = scrollWidth > clientWidth;
        setRightArrowVisible(canScroll);
        setLeftArrowVisible(false);
        setScrollDistance(clientWidth * 0.8);
      }
    };

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
      updateScrollState();
    };

    const container = containerRef.current;
    window.addEventListener("resize", handleResize);
    if (container) {
      container.addEventListener("scroll", checkScroll);
    }

    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [checkScroll]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.code); // 선택된 카테고리 설정
    const element = document.getElementById(`category-${category.code}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    console.log(`Selected category: ${category.name}`);
  };

  return (
    <div className="study-categories-wrapper">
      {isLeftArrowVisible &&
        isWideScreen && ( // 왼쪽 화살표 표시 조건
          <button className="scroll-button left" onClick={scrollLeft}>
            ◀
          </button>
        )}
      <div className="group-header-container" ref={containerRef}>
        {studyCategories.map((category) => (
          <div
            key={category.code}
            className={`group-header-title ${
              selectedCategory === category.code ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {isRightArrowVisible &&
        isWideScreen && ( // 오른쪽 화살표 표시 조건
          <button className="scroll-button right" onClick={scrollRight}>
            ▶
          </button>
        )}
    </div>
  );
};

export default StudyCategoriesComponent;
