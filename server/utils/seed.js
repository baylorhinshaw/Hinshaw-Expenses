const connection = require("../config/connection");
const { User, FixedExpense, VariableExpense, Saving } = require("../models");
const { seedUsers, seedFixedExpenses, seedVariableExpenses, seedSavings } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await FixedExpense.deleteMany({});
  await VariableExpense.deleteMany({});
  await Saving.deleteMany({});
 
  await User.collection.insertMany(seedUsers);
  await FixedExpense.collection.insertMany(seedFixedExpenses);
  await VariableExpense.collection.insertMany(seedVariableExpenses);
  await Saving.collection.insertMany(seedSavings);

  console.table(seedUsers);
  console.table(seedFixedExpenses);
  console.table(seedVariableExpenses);
  console.table(seedSavings);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});