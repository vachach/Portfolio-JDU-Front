import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedLayout from "./components/ProtectedLayout";
import { UserContext } from "./contexts/UserContext";

import Login from "./pages/login/Login";
import FirstLoginPage from "./pages/FirstLoginPage/FirstLoginPage";
import Home from "./pages/home/Home";
import Student from "./pages/student/Student";
import Recruiter from "./pages/recruiter/Recruiter";
import Staff from "./pages/staff/Staff";
import CompanyProfile from "./pages/profile/CompanyProfile/CompanyProfile";
import StudentProfile from "./pages/profile/StudentProfile/StudentProfile";
import Top from "./pages/profile/Top/Top";
import Qa from "./pages/profile/Qa/Qa";
import Stats from "./pages/profile/Stats/Stats";
import CreditDetails from "./pages/CreditDetails/CreditDetails";
import Setting from "./pages/setting/Setting";
import FAQ from "./pages/faq/Faq";
import NotFound from "./pages/NotFound/NotFound";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import LogOut from "./components/LogOut";

const AppRoutes = () => {
  const { role, userId, updateUser } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedLayout />}>
            <Route index element={role === "Student" ? <Navigate to={`/profile`} /> : <Home />} />
            <Route
              path="/student"
              element={<ProtectedLayout allowedRoles={["Admin", "Staff", "Recruiter"]} />}
            >
              <Route index element={<Student key="students" />} />
              <Route path="profile/:studentId/*" element={<StudentProfile />}>
                <Route index element={<Navigate to="top" />} />{" "}
                {/* Redirect index to top */}
                <Route path="top" element={<Top />} />
                <Route path="qa" element={<Qa />} />
                <Route path="stats" element={<Stats />} />
              </Route>
            </Route>

            <Route
              path="/recruiter"
              element={<ProtectedLayout allowedRoles={["Admin", "Staff", "Student"]} />}
            >
              <Route index element={<Recruiter />} />
            </Route>

            <Route
              path="/companyprofile"
              element={<ProtectedLayout allowedRoles={["Admin", "Staff", "Recruiter", "Student"]} />}
            >
              <Route index element={<CompanyProfile userId={role === "Recruiter" ? userId : 0} />} />
            </Route>

            <Route path="/profile" element={<ProtectedLayout allowedRoles={["Student"]} />}>
              <Route path="*" element={<StudentProfile userId={userId} />}>
                <Route index element={<Navigate to="top" state={{ userId: userId }} />} />{" "}
                {/* Redirect index to top */}
                <Route path="top" element={<Top />} />
                <Route path="qa" element={<Qa />} />
                <Route path="stats" element={<Stats />} />
              </Route>
            </Route>

            <Route path="/staff" element={<ProtectedLayout allowedRoles={["Admin"]} />}>
              <Route index element={<Staff />} />
            </Route>

            <Route path="/bookmarked" element={<ProtectedLayout allowedRoles={["Recruiter"]} />}>
              <Route index element={<Student key="bookmarked" OnlyBookmarked={true} />} />
              <Route path="profile/:studentId/*" element={<StudentProfile />}>
                <Route index element={<Navigate to="top" />} />{" "}
                {/* Redirect index to top */}
                <Route path="top" element={<Top />} />
                <Route path="qa" element={<Qa />} />
                <Route path="stats" element={<Stats />} />
              </Route>
            </Route>

            <Route path="/settings" element={<Setting />} />
            <Route path="/help" element={<FAQ />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="/credit-details" element={<CreditDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut updateUser={updateUser} />} />
        <Route path="/FirstloginPage" element={<FirstLoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
