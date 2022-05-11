const seedUsers = [
    {
      username: "Baylor",
      email: "baylor@gmail.com",
      password: "baylorpassword",
      fixedExpense: [{
        fixedExpenseName: "House Payment",
        fixedExpenseCost: 1200,
      }],
      variableExpense: [{
        variableExpenseName: "Gucci Bag Payment",
        variableExpenseCost: 500,
      }],
      saving: [{
        savingName: "Emergency Fund",
        savingExpenseCost: 200,
      }]
    },
    {
      username: "Diane",
      email: "diane@gmail.com",
      password: "dianepassword",
      fixedExpense: [{
        fixedExpenseName: "House Payment",
        fixedExpenseCost: 3000,
      }],
      variableExpense: [{
        variableExpenseName: "Gucci Bag Payment",
        variableExpenseCost: 5000,
      }],
      saving: [{
        savingName: "Emergency Fund",
        savingExpenseCost: 1000,
      }]
    },
    {
      username: "Nolan",
      email: "nolan@gmail.com",
      password: "nolanpassword",
      fixedExpense: [{
        fixedExpenseName: "House Payment",
        fixedExpenseCost: 1600,
      }],
      variableExpense: [{
        variableExpenseName: "Gucci Bag Payment",
        variableExpenseCost: 2000,
      }],
      saving: [{
        savingName: "Emergency Fund",
        savingExpenseCost: 300,
      }]
    },
]
module.exports = { seedUsers };