import React, { useState, useEffect } from 'react'
import {
  Typography, Table, TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl
} from '@mui/material'
const AddUser = () => {
  const [getUsers, setUsers] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("http://localhost:5000/api/User", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setUsers(result)
      })
      .catch((error) => console.error(error));
      
  }, [])

 



  return (
    <div>
      <Typography alignContent="center" textAlign="center">
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 980 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">CreatedAt</TableCell>
              <TableCell align="right">UpdatedAt</TableCell>
              <TableCell width="190" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getUsers.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.createdAt.slice(0, 10)}</TableCell>
                <TableCell align="right">{row.updatedAt.slice(0, 10)}</TableCell>
                <TableCell align='center'><Button onClick={handleClickOpen} variant='outlined' color='warning'>Update</Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
                      {"Update User details"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <FormControl sx={{ marginTop: 2 }}>
                          <TextField label="username"></TextField>
                          <TextField sx={{ marginTop: 2 }} label="email"></TextField>
                          <TextField sx={{ marginTop: 2 }} label="role"></TextField>
                        </FormControl>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant='text' color='error' onClick={handleClose}>Disagree</Button>
                      <Button variant='text' color="success" onClick={updateHandler()} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
                <TableCell align='center'><Button variant='outlined' color='error'>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




    </div>
  )
}

export default AddUser
