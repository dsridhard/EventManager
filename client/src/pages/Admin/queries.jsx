import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Queries = () => {
  const [listQuery, setQuery] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/contact", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setQuery(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Typography align="center" variant="h5" gutterBottom>
        List All Queries
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 980 }} aria-label="queries table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Message</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listQuery.map((element) => (
              <TableRow key={element._id}>
                <TableCell align="center">{element.name}</TableCell>
                <TableCell align="center">{element.email}</TableCell>
                <TableCell align="center">{element.message}</TableCell>
                <TableCell align="center">
                  {new Date(element.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Queries;