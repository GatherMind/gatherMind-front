import React from "react";
import { Link } from "react-router-dom"; // Link를 import
import "../../styles/admin/adminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      {/* 헤더 */}
      <header className="dashboard-header">
        <h1>관리자 대시보드</h1>
        <button className="notification-button">알림</button>
      </header>

      {/* 주요 통계 */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <h2>전체 사용자</h2>
          <p>1,245명</p>
        </div>
        <div className="stat-card">
          <h2>신규 가입자</h2>
          <p>25명 (지난 7일)</p>
        </div>
        <div className="stat-card">
          <h2>콘텐츠 수</h2>
          <p>3,412개</p>
        </div>
        <div className="stat-card">
          <h2>신고 콘텐츠</h2>
          <p>12건</p>
        </div>
      </section>

      {/* 그래프 영역 */}
      <section className="dashboard-charts">
        <h2>사용자 증가 추이</h2>
        <div className="chart-placeholder">[그래프 자리]</div>
      </section>

      {/* 빠른 액세스 카드 */}
      <section className="quick-actions">
        <h2>빠른 액세스</h2>
        <div className="action-cards">
          <div className="action-card">
            <h3>사용자 관리</h3>
            <p>사용자 계정 확인 및 권한 설정</p>
            <Link to="/user-management">
              <button>이동</button>
            </Link>
          </div>
          <div className="action-card">
            <h3>콘텐츠 관리</h3>
            <p>게시글, 댓글, 리뷰 관리</p>
            <Link to="/content-management">
              <button>이동</button>
            </Link>
          </div>
          <div className="action-card">
            <h3>권한 관리</h3>
            <p>관리자 계정 생성 및 권한 설정</p>
            <Link to="/role-management">
              <button>이동</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
