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
  Button,
} from "@mui/material";

const Events = () => {
  const [listEvent, setEvent] = useState([]);
  let sno =1 
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEvent(result);
        console.log(result);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <Typography align="center" variant="h5" gutterBottom>
        List All Events
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 980 }} aria-label="events table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Speaker</TableCell>
              <TableCell align="center">Organizer</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">No. Attendees</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listEvent.length > 0 ? (
              listEvent.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>{sno++}</TableCell>
                  <TableCell align="center">{element.title}</TableCell>
                  <TableCell align="center">{element.description}</TableCell>
                  <TableCell align="center">{element.location}</TableCell>
                  <TableCell align="center">{element.speaker}</TableCell>
                  <TableCell align="center">
                    {element.organizer?.name || "N/A"}
                  </TableCell>
                  <TableCell align="center">{formatDate(element.date)}</TableCell>
                  <TableCell align="center">
                    {element.attendees?.length > 0
                      ? element.attendees.length
                      : "No attendees yet"}
                  </TableCell>
                  <TableCell><Button variant="contained" color="error">Delete</Button></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Events;