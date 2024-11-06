import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function MyPage() {
    const [memberInfo, setMemberInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get('/api/members/me');
                setMemberInfo(response.data);
            } catch (error) {
                console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchMemberInfo();
    }, []);

    const handleEditInfo = () => {
        navigate('/edit-info'); // 정보 수정 페이지로 이동
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.delete('/api/members/delete-account');
                alert("회원 탈퇴가 완료되었습니다.");
                navigate('/');
            } catch (error) {
                alert("회원 탈퇴에 실패했습니다.");
            }
        }
    };

    return (
        <div className="mypage-container">
            <header>
                <Header />
                <button onClick={() => navigate('/mypage')}>정보 보기</button>
                <button onClick={() => navigate('/mypage/act')}>활동 보기</button>
            </header>
            <h2>마이 페이지</h2>
            
            {/* 기본 정보 표시 */}
            {memberInfo && (
                <div>
                    <h3>아이디</h3>
                    <p><strong>아이디:</strong> {memberInfo.memberId}</p>
                    <h3>닉네임</h3>
                    <p><strong>닉네임:</strong> {memberInfo.nickname}</p>
                    <h3>이메일</h3>
                    <p><strong>이메일:</strong> {memberInfo.email}</p>
                    <button onClick={handleEditInfo}>정보 수정</button>
                    <button onClick={handleDeleteAccount} style={{ color: 'red' }}>회원 탈퇴</button>
                </div>
            )}

            {/* 활동 탭으로 이동할 수 있는 버튼 */}
            
        </div>
    );
}

export default MyPage;
