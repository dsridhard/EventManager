import React from 'react'

const Booking = () => {
const userDataString = localStorage.getItem('role')
const TestuserData = JSON.stringify(userDataString);
const TestParseData = JSON.parse(TestuserData)
console.log(TestParseData)
  return (
    <div>
    This is   Manage Booking Page
    </div>
  )
}

export default Booking
