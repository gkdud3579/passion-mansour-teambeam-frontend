import React from "react";
import Link from 'next/link';
import Header from "../_components/Header";
import './layout.scss';

const TeambeamHome = () => {
  return (
    <>
      <Header />
      <div className="teamBeam_container">
        <div className="comment_box">
          <p>팀플 <span>일정관리</span>가 고민인 당신</p>
          <p>팀플 <span>일정관리</span>가 고민인 당신</p>
          <p>팀플 <span>일정관리</span>가 고민인 당신</p>
        </div>
        <div className="start_button">
          <Link href="/user/join" passHref>
            <button className="join_button">회원가입</button>
          </Link>
          <Link href="/user/login" passHref>
            <button className="login_button">로그인</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TeambeamHome;