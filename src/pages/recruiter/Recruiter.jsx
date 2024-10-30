import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";
import Filter from "../../components/filter/Filter";

const Recruiter = () => {
  const navigate = useNavigate();
  const navigateToCompanyProfile = (recruiterId) => {
    navigate(`/companyprofile`, {
      state: { recruiterId: recruiterId }, // passing state
    });
  };

  const headers = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "リクルーター",
      type: "avatar",
      minWidth: "160px",
      onClickAction: navigateToCompanyProfile,
    },
    {
      id: "company_name",
      numeric: false,
      disablePadding: false,
      label: "会社名",
      minWidth: "220px",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "電話番号",
      minWidth: "160px",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "メール",
      type: "email",
      minWidth: "220px",
    }
  ];

  const [filterState, setFilterState] = useState({});
  // must match with db table col names
  const filterProps = [
    { key: "name", label: "名前", type: "text", minWidth: "160px" },
  ];

  const tableProps = {
    headers: headers,
    dataLink: "/api/recruiters",
    filter: filterState,
  };

  const handleFilterChange = (value) => {
    setFilterState(value);
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
      <Table tableProps={tableProps} />
    </div>
  );
};

export default Recruiter;
