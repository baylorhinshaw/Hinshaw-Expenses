const seedUsers = [
    {
      username: "Baylor",
      email: "baylor@gmail.com",
      password: "baylorpassword"
    },
    {
      username: "Diane",
      email: "diane@gmail.com",
      password: "dianepassword"
    },
    {
      username: "Nolan",
      email: "nolan@gmail.com",
      password: "nolanpassword"
    },
];

const seedFixedExpenses = [
    {
      fixedExpenseName: "Car Payment",
      fixedExpenseCost: 500,
      username: "Baylor",
    },
    {
      fixedExpenseName: "House Payment",
      fixedExpenseCost: 1200,
      username: "Diane",
    },
    {
      fixedExpenseName: "Gym Membership",
      fixedExpenseCost: 50,
      username: "Nolan",
    },
];

const seedVariableExpenses = [
  {
    variableExpenseName: "McDonalds",
    variableExpenseCost: 15,
    username: "Baylor",
  },
  {
    variableExpenseName: "Lululemon",
    variableExpenseCost: 73,
    username: "Diane",
  },
  {
    variableExpenseName: "Valorant Skins",
    variableExpenseCost: 50,
    username: "Nolan",
  },
];

const seedSavings = [
  {
    savingName: "Emergency Fund",
    savingCost: 200,
    username: "Baylor",
  },
  {
    savingName: "Vacation",
    savingCost: 150,
    username: "Diane",
  },
  {
    savingName: "New Computer",
    savingCost: 50,
    username: "Nolan",
  },
];

module.exports = { seedUsers, seedFixedExpenses, seedVariableExpenses, seedSavings };