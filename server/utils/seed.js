const connection = require("../config/connection");
const { User, Expense } = require("../models");
const { seedUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Expense.deleteMany({});
 
  await User.collection.insertMany(seedUsers);

  console.table(seedUsers);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});