import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Outlet,
  NavLink,
} from "react-router-dom";
import axios from "../../../utils/axiosUtils";
import { Box, Typography, IconButton, Chip, Avatar, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./StudentProfile.module.css";

const StudentProfile = ({ userId = 0 }) => {
  const { studentId } = useParams();

  let id;
  if (userId != 0) {
    id = userId;
  } else {
    id = studentId;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        showAlert("Error fetching student data", "error");
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleBackClick = () => {
    const isRootPath = location.pathname.endsWith("/top");
    if (isRootPath) {
      navigate("/student");
    } else {
      navigate(-1);
    }
  };

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container>
        <Grid></Grid>
      </Grid>

      <Box className={styles.topControlButtons}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "grey.300",
            flexGrow: 1,
          }}
        >
          <IconButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          | Back
        </Box>
        <Box id="saveButton"></Box>
      </Box>
      <Box className={styles.container}>
        <Box className={styles.avatarContainer}>
          <Avatar
            src={student.photo}
            alt={student.first_name}
            sx={{ width: 130, height: 130 }}
          />
        </Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.nameEmailContainer}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                className={styles.mainTitle}
              >
                {student.first_name} {student.last_name}
              </Typography>
            </Box>
            <Box>
              <a href={`mailto:${student.email}`} className={styles.email}>
                <EmailIcon className={styles.emailIcon} />
                {student.email}
              </a>
            </Box>
          </Box>
          <Box className={styles.chipContainer}>
            <Chip
              label={`学籍番号: ${student.student_id}`}
              variant="outlined"
              sx={{
                fontSize: "12px",
                padding: "2px 6px",
                height: "auto",
                lineHeight: 1,
                width: "160px",
              }}
            />
            <Chip
              label={`年齢: ${calculateAge(student.date_of_birth)}`}
              variant="outlined"
              sx={{
                fontSize: "12px",
                padding: "2px 6px",
                height: "auto",
                lineHeight: 1,
                width: "160px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box className={styles.navbar}>
        <NavLink
          to={`top`}
          state={{ userId: userId }}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          トップ
        </NavLink>
        <NavLink
          to={`qa`}
          state={{ userId: userId }}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Q&A
        </NavLink>
        <NavLink
          to={`stats`}
          state={{ userId: userId }}
          className={({ isActive }) => (isActive ? styles.active : "")}
          style={{ minWidth: "130px" }}
        >
          単位数とスキル
        </NavLink>
      </Box>
      <Outlet />
    </Box>
  );
};

export default StudentProfile;
