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
        const canScroll = scrollWidth > clientWidth;
        setRightArrowVisible(canScroll);
        setLeftArrowVisible(false);
        setScrollDistance(clientWidth * 0.8);
      }
    };

    const observer = new ResizeObserver(() => {
      updateScrollState();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;

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
    setSelectedCategory(category.name); // 선택된 카테고리 설정
    const element = document.getElementById(`category-${category.code}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="study-categories-wrapper">
      {isLeftArrowVisible &&
        isWideScreen && ( // 왼쪽 화살표 표시 조건
          <button className="scroll-button left-arrow" onClick={scrollLeft}>
            &#8592;
          </button>
        )}
      <div className="group-header-container" ref={containerRef}>
        {studyCategories.map((category) => (
          <div
            key={category.code}
            className={`group-header-title ${
              selectedCategory === category.name ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {isRightArrowVisible &&
        isWideScreen && ( // 오른쪽 화살표 표시 조건
          <button className="scroll-button right-arrow" onClick={scrollRight}>
            &#8594;
          </button>
        )}
    </div>
  );
};

export default StudyCategoriesComponent;
