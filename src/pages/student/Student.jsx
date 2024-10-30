import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Table from "../../components/table/Table";
import Filter from "../../components/filter/Filter";

import axios from "../../utils/axiosUtils";

const Student = ({ OnlyBookmarked = false }) => {
  const [filterState, setFilterState] = useState({});
  const [updatedBookmark, setUpdatedBookmark] = useState({
    studentId: null,
    timestamp: new Date().getTime(),
  });
  const recruiterId = JSON.parse(sessionStorage.getItem("loginUser")).id;
  // Ensure filterProps have unique keys matching your database columns
  const filterProps = [
    {
      key: "semester",
      label: "学年",
      type: "checkbox",
      options: ["1年生", "2年生", "3年生", "4年生"],
      minWidth: "120px",
    },
    {
      key: "it_skills",
      label: "プログラミング言語",
      type: "checkbox",
      options: ["JS", "Python", "Java", "SQL"],
      minWidth: "160px",
    },
    {
      key: "jlpt",
      label: "日本語能力試験",
      type: "checkbox",
      options: ["N1", "N2", "N3", "N4", "N5"],
      minWidth: "160px",
    },
    {
      key: "ielts",
      label: "IELTS (英語力)",
      type: "checkbox",
      options: ["6.0", "6.5", "7.0", "7.5", "8.0"],
      minWidth: "160px",
    },
    {
      key: "jdu_japanese_certification",
      label: "JDU日本語認定試験",
      type: "checkbox",
      options: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      minWidth: "160px",
    },
    {
      key: "partner_university_credits",
      label: "単位数",
      type: "radio",
      options: ["20", "40", "60", "80", "100"],
      unit: "単位内",
      minWidth: "160px",
    },
    {
      key: "partner_university",
      label: "提携大学",
      type: "checkbox",
      options: [
        "東京通信大学",
        "産能短期大学",
        "京都大学",
        "大手前大学",
        "新潟大学",
      ],
      minWidth: "160px",
    },
    {
      key: "other_information",
      label: "特技 (有無)",
      type: "radio",
      options: ["有り", "無し"],
      minWidth: "160px",
    },
  ];

  const handleFilterChange = (newFilterState) => {
    setFilterState(newFilterState);
  };

  const navigate = useNavigate();

  const navigateToProfile = (studentId) => {
    navigate(`profile/${studentId}`);
  };

  const addToBookmark = async (studentId) => {
    try {
      const response = await axios.post("/api/bookmarks/toggle", {
        studentId,
        recruiterId,
      });
      setUpdatedBookmark({
        studentId: response.data.studentId,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.error("Error bookmarking student:", error);
    }
  };

  const headers = [
    {
      id: "bookmark",
      numeric: false,
      disablePadding: true,
      label: "",
      type: "bookmark",
      role: "Recruiter",
      onClickAction: addToBookmark,
    },
    {
      id: "first_name",
      numeric: false,
      disablePadding: true,
      label: "学生",
      type: "avatar",
      minWidth: "220px",
      onClickAction: navigateToProfile,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "メール",
      type: "email",
      minWidth: "160px",
    },
    {
      id: "jlpt",
      numeric: true,
      disablePadding: false,
      label: "日本語能力試験",
      minWidth: "160px",
      isJSON: true,
    },
    {
      id: "ielts",
      numeric: true,
      disablePadding: false,
      label: "IELTS",
      isJSON: true,
    }
  ];

  const tableProps = {
    headers: headers,
    dataLink: "/api/students",
    filter: filterState,
    recruiterId: recruiterId,
    OnlyBookmarked: OnlyBookmarked,
  };

  return (
    <div>
      <Box sx={{ width: "100%", height: "100px" }}>
        <Filter
          fields={filterProps}
          filterState={filterState}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <Table tableProps={tableProps} updatedBookmark={updatedBookmark} />
    </div>
  );
};

export default Student;
