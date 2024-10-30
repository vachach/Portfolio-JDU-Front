import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation, useParams } from "react-router-dom";
import styles from "./Qa.module.css";
import QATextField from "../../../components/QATextField/QATextField";
import QAAccordion from "../../../components/QAAccordion/QAAccordion";
import qaList from "../../../utils/qaList";
import {
  School,
  AutoStories,
  Face,
  WorkHistory,
  TrendingUp,
} from "@mui/icons-material";
import axios from "../../../utils/axiosUtils";
import { Box, Tabs, Tab, Button, Snackbar, Alert } from "@mui/material";

const QA = () => {
  const role = sessionStorage.getItem("role");
  const labels = ["学生成績", "専門知識", "個性", "実務経験", "キャリア目標"];
  let id;
  const { studentId } = useParams();
  const location = useLocation();
  const { userId } = location.state || {};

  if (userId != 0 && userId) {
    id = userId;
  } else {
    id = studentId;
  }

  const [studentQA, setStudentQA] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`/api/qa/student/${id}`);
      setStudentQA(response.data);

      if (Object.keys(response.data.idList).length === 0) {
        // Initialize editData based on qaList if response.data is empty
        let tempData = {};
        Object.entries(qaList.QAPage).forEach(([category, questions]) => {
          tempData[category] = {};
          Object.entries(questions).forEach(([key, question]) => {
            tempData[category][key] = { question: question, answer: "" };
          });
        });
        setEditData(tempData);
        setIsFirstTime(true);
      } else {
        setEditData(response.data);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleUpdate = (category, keyName, value) => {
    setEditData((prevEditData) => {
      const updatedEditData = { ...prevEditData };
      if (updatedEditData[category]) {
        updatedEditData[category] = {
          ...updatedEditData[category],
          [keyName]: {
            ...updatedEditData[category][keyName],
            answer: value,
          },
        };
      }
      return updatedEditData;
    });
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      let res;
      if (isFirstTime) {
        res = await axios.post("/api/qa/", { studentId: id, data: editData });
      } else {
        res = await axios.put(`/api/qa/${id}`, { data: editData });
      }
      setStudentQA(res.data);
      setEditMode(false);
      showAlert("Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving student data:", error);
      showAlert("Error saving changes.", "error");
    }
  };

  const handleCancel = () => {
    fetchStudent();
    setEditMode(false);
  };

  const [subTabIndex, setSubTabIndex] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSubTabChange = (event, newIndex) => {
    setSubTabIndex(newIndex);
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: "", severity: "" });
  };

  const getCategoryData = (index) => {
    const category = labels[index];
    return editData[category] || {}; // Ensure we return an empty object if category not found
  };

  if (!studentQA) {
    return <div>Loading...</div>;
  }

  const portalContent = (
    <Box my={2} className={styles.buttonsContainer}>
      {role == "Student" && (
        <>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                size="small"
              >
                保存
              </Button>

              <Button
                onClick={handleCancel}
                variant="outlined"
                color="error"
                size="small"
              >
                キャンセル
              </Button>
            </>
          ) : (
            <Button
              onClick={toggleEditMode}
              variant="contained"
              color="primary"
              size="small"
            >
              QAを編集
            </Button>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Box my={2}>
      <>
        {ReactDOM.createPortal(
          portalContent,
          document.getElementById("saveButton")
        )}
      </>

      <Tabs
        className={styles.Tabs}
        value={subTabIndex}
        onChange={handleSubTabChange}
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab icon={<School />} iconPosition="bottom" label="学生成績" />
        <Tab icon={<AutoStories />} iconPosition="bottom" label="専門知識" />
        <Tab icon={<Face />} iconPosition="bottom" label="個性" />
        <Tab icon={<WorkHistory />} iconPosition="bottom" label="実務経験" />
        <Tab icon={<TrendingUp />} iconPosition="bottom" label="キャリア目標" />
      </Tabs>

      <Box my={2}>
        {editMode &&
          Object.entries(getCategoryData(subTabIndex)).map(
            ([key, { question, answer }]) => (
              <QATextField
                key={key}
                data={studentQA} // Pass any relevant data here if needed
                editData={editData}
                category={labels[subTabIndex]} // Use labels to get the current category
                question={question}
                keyName={key}
                updateEditData={handleUpdate}
              />
            )
          )}
      </Box>

      <Box my={2}>
        {!editMode &&
          Object.entries(getCategoryData(subTabIndex)).map(
            ([key, { question, answer }]) =>
              !(question.split("]")[0] == "[任意" && !answer) && (
                <QAAccordion
                  key={key}
                  question={question.split("]")[1]}
                  answer={answer ? answer : "回答なし"}
                />
              )
          )}
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QA;
