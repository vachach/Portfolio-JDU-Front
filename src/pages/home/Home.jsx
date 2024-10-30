import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Photo1 from "../../assets/Photo1.jpg";
import Photo2 from "../../assets/Photo2.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/student");
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Japan Digital University</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <div className={styles.titleContainer}>
            <span className={styles.subtitle}>より良い</span>
            <span className={styles.title}>明日へ</span>
          </div>
          <p className={styles.textParagraph}>
            2020年に日本資本がウズベキスタンに設立し運営している正式な私立大学です。ウズベキスタンにあるサテライトキャンパスをJDUと呼びます。ウズベキスタンの学生は、提携している日本の大学の授業にオンラインで参加し、日本の大学の試験を経て単位取得、卒業を目指します。（日本とウズベキスタン両面の学位を取得し卒業することが可能です）卒業時には日本企業への就職を目指し、勉学に励む学生がたくさん入学しています。
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleClick}>
              次へ➜
            </button>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src={Photo1} alt="Large class photo" />
          <img src={Photo2} alt="Group photo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
