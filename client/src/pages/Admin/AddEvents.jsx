import React from 'react'
import {
  Typography, Table, TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  Paper
} from '@mui/material'
const AddEvents = () => {
  return (
    <>
      <Typography alignContent="center" textAlign="center">
        All Events
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>



    </>
  )
}

export default AddEvents
