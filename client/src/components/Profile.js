import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseApi from '../api/expenses';

function Profile() {
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ExpenseApi.getExpenses().then((data) => {
        console.log(data);
        setExpenses(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  function renderExpenses(){
    let components = []
    
    for(let i = 0; i < expenses.length; i++){
      let expense = expenses[i]
      components.push(
          <div className='expense'>
            {expense.name}<br />
            {expense.type}<br />
            {expense.cost}<br />
            {expense.createdAt}<br />
            <button type='button' className='btn' style={{display: 'revert'}}>Remove</button>
          </div>
      )
    }
      return components
  }
  
  return (
    <div>
      <h1>My expenses</h1>
      <div className='expenses'>{renderExpenses()}</div>
    </div>
  )
}

export default Profile