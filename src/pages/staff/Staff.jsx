import React, { useState } from "react";

import { Box } from "@mui/material";

import Table from "../../components/table/Table";
import Filter from "../../components/filter/Filter";

const Staff = () => {
  const headers = [
    {
      id: "first_name",
      numeric: false,
      disablePadding: false,
      label: "職員",
      type: "avatar",
      minWidth: "220px",
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
      id: "department",
      numeric: false,
      disablePadding: false,
      label: "部署",
      minWidth: "160px",
    },
    {
      id: "position",
      numeric: false,
      disablePadding: false,
      label: "役職",
      minWidth: "160px",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "電話番号",
      minWidth: "200px",
    }
  ];

  const [filterState, setFilterState] = useState({});
  // must match with db table col names
  const filterProps = [
    { key: "name", label: "名前", type: "text", minWidth: "160px" },
  ];

  const tableProps = {
    headers: headers,
    dataLink: "/api/staff",
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

export default Staff;
