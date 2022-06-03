import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseApi from '../api/expenses';

function Profile() {
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ExpenseApi.getExpenses().then((response) => {
        console.log(response);
        setExpenses(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h1>My expenses</h1>
      <h3></h3>
    </div>
  )
}

export default Profile