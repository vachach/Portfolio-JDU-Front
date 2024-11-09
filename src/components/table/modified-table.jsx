import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../utils/axiosUtils";
import style from "./Table.module.css";

import UserAvatar from "./avatar/UserAvatar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Chip,
  LinearProgress,
} from "@mui/material";

import { stableSort, getComparator } from "./TableUtils";
import { useUser } from "../../contexts/UserContext.jsx";

const EnhancedTable = ({ tableProps, updatedBookmark }) => {
  const { isAuthenticated, role, userId } = useUser();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://9hrfxuh377.execute-api.ap-northeast-1.amazonaws.com/default/api/kintone"
        );
        
        // Transform the API response to match the expected format
        const transformedData = response.data.records.map(record => ({
          id: record.$id.value,
          first_name: record.studentName.value,
          last_name: "",
          email: record.studentEmail.value,
          student_id: record.studentId.value,
          photo: "", // Add default photo handling if needed
          isBookmarked: false, // Add bookmark handling if needed
          jlpt: JSON.stringify({ highest: "無し" }), // Add JLPT handling if needed
          ielts: JSON.stringify({ highest: "無し" }), // Add IELTS handling if needed
          semester: record.semester.value,
          partner_university: record.partnerUniversity.value
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [tableProps.filter]);

  useEffect(() => {
    if (updatedBookmark?.studentId) {
      setRows((prevData) =>
        prevData.map((data) =>
          data.id === updatedBookmark.studentId
            ? { ...data, isBookmarked: !data.isBookmarked }
            : data
        )
      );
    }
  }, [updatedBookmark]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%", border: "1px solid #eee", borderRadius: "10px" }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHead>
            <TableRow>
              {tableProps.headers.map(
                (header) =>
                  (header.role === undefined || header.role === role) && (
                    <TableCell
                      sx={{ borderBottom: "1px solid #aaa" }}
                      key={"header" + header.id}
                      align={header.numeric ? "right" : "left"}
                      padding={"normal"}
                      sortDirection={orderBy === header.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === header.id}
                        direction={orderBy === header.id ? order : "asc"}
                        onClick={() => handleRequestSort(header.id)}
                      >
                        {header.label}
                      </TableSortLabel>
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={tableProps.headers.length} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {visibleRows.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected(row.id)}
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected(row.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    {tableProps.headers.map(
                      (header) =>
                        (header.role === undefined || header.role === role) && (
                          <TableCell
                            key={"data" + header.id}
                            align={header.numeric ? "right" : "left"}
                            padding={header.disablePadding ? "none" : "normal"}
                            onClick={() =>
                              header.onClickAction
                                ? header.onClickAction(row.id)
                                : null
                            }
                            className={
                              header.onClickAction
                                ? style.hoverEffect
                                : style.default
                            }
                            style={
                              header.type === "avatar"
                                ? { minWidth: header.minWidth, padding: "4px" }
                                : { minWidth: header.minWidth }
                            }
                          >
                            {header.type === "bookmark" ? (
                              <>
                                {row.isBookmarked ? (
                                  <svg
                                    width="19"
                                    height="18"
                                    viewBox="0 0 19 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.3275 14.1233L4.18417 16.8275L5.16667 11.1L1 7.04417L6.75 6.21083L9.32167 1L11.8933 6.21083L17.6433 7.04417L13.4767 11.1L14.4592 16.8275L9.3275 14.1233Z"
                                      fill="#F7C02F"
                                      stroke="#F7C02F"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="18"
                                    height="17"
                                    viewBox="0 0 18 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.00035 13.7913L3.85702 16.4955L4.83952 10.768L0.672852 6.71214L6.42285 5.8788L8.99452 0.667969L11.5662 5.8788L17.3162 6.71214L13.1495 10.768L14.132 16.4955L9.00035 13.7913Z"
                                      stroke="#F7C02F"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </>
                            ) : header.type === "avatar" ? (
                              <UserAvatar
                                photo={row.photo}
                                name={row.first_name}
                                studentId={row.student_id}
                              />
                            ) : header.type === "email" ? (
                              <a href={`mailto:${row[header.id]}`}>
                                {row[header.id]}
                              </a>
                            ) : header.isJSON ? (
                              JSON.parse(row[header.id])?.highest || "無し"
                            ) : (
                              row[header.id] || "無し"
                            )}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={tableProps.headers.length} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数:"
      />
    </Box>
  );
};

EnhancedTable.propTypes = {
  tableProps: PropTypes.shape({
    dataLink: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        disablePadding: PropTypes.bool,
        type: PropTypes.string,
      })
    ).isRequired,
    filter: PropTypes.object.isRequired,
  }).isRequired,
};

export default EnhancedTable;
