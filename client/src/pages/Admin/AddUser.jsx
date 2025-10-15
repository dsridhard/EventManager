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
  const [getRole, setRole] = useState([])
  const [getemail, setemail] = useState([])
  const [getname, setname] = useState([])
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
        // console.log(result)
        setUsers(result)
      })
      .catch((error) => console.error(error));

  }, [])
  const updateHandler = (userid) => {
    // alert(userid)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": getname,
      "role": getRole,
      "email": getemail
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`http://localhost:5000/api/User/${userid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          alert("Successfully updated the data")
        } else {
          alert("Something went wrong")
        }
      })
      .catch((error) => console.error(error));
    window.location.reload();
    handleClose()

  }
  const deleteHandler = (userid) => {
    // alert(userid)
    const raw = "";

    const requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow"
    };

    fetch(`http://localhost:5000/api/User/${userid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          alert(result.msg)
        } else {
          alert("Something went wrong")
        }
      })
      .catch((error) => console.error(error));
    window.location.reload();
  }




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
            {  
                getUsers.map((row) => (
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
                          <TextField onChange={(e) => { setname(e.target.value) }} label="username"></TextField>
                          <TextField onChange={(e) => { setemail(e.target.value) }} sx={{ marginTop: 2 }} label="email"></TextField>
                          <TextField onChange={(e) => { setRole(e.target.value) }} sx={{ marginTop: 2 }} label="role"></TextField>
                        </FormControl>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant='text' color='error' onClick={handleClose}>Disagree</Button>
                      <Button variant='text' color="success" onClick={() => { updateHandler(row._id) }} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
                <TableCell align='center'><Button variant='contained' color='error'
                  onClick={() => { deleteHandler(row._id) }}
                >Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




    </div>
  )
}

export default AddUser
