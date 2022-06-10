const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['fixed','variable','saving']
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  cost: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: date => {
      
      const formatData = (input) => {
        if (input > 9) {
          return input;
        } else return `0${input}`;
      };
      
      const formatHour = (input) => {
        if (input > 12) {
          return input - 12;
        }
        return input;
      };

      const format = {
        mm: formatData(date.getMonth() + 1),
        dd: formatData(date.getDate()),
        yyyy: date.getFullYear(),
        hh: formatData(formatHour(date.getHours())),
        MM: formatData(date.getMinutes()),
        SS: formatData(date.getSeconds())
      }

      const format12Hour = ({ dd, mm, yyyy, hh, MM, SS }) => {
        return `${mm}/${dd}/${yyyy} ${hh}:${MM}:${SS}`;
      };
      
      return format12Hour(format)
    }
    // get: date => {
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   return `${year}-${month}-${day}`
    // }
  },
});
  
const Expense = model("expense", expenseSchema);
  
module.exports = Expense;