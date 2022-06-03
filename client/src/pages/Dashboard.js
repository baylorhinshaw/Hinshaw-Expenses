import React from 'react'
import UserApi from '../api/user';
import Profile from '../components/Profile';

function Dashboard() {
  
  // const userExpenseData = UserApi.getExpenses()
  // console.log(userExpenseData)

  return (
    <div>
      Dashboard
      <Profile />
    </div>
  )
}

export default Dashboard