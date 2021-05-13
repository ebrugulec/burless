const checkLinkId = (id) => {
  let numberAndStringR = /^[a-zA-Z0-9_.-]*$/;
  return numberAndStringR.test(id);
}

const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

const emailValidation = email => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
};

const passwordValidation = password => {
  if (password.trim() === "") {
    return `Password is required`;
  }
  if (password.trim().length < 6) {
    return `Password needs to be at least six characters`;
  }
  return null;
};

function redirectLogin() {
  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false
    }
  };
}

function parseIp (req) {
  return (typeof req.headers['x-forwarded-for'] === 'string'
    && req.headers['x-forwarded-for'].split(',').shift())
  || (req.connection && req.connection.remoteAddress)
  || (req.socket && req.socket.remoteAddress)
  || (req.connection && req.connection.socket && req.connection.socket.remoteAddress);
}

function getDatesBetweenDates (startDate, endDate) {
  let dates = []
  const theDate = new Date(startDate)
  while (theDate <= endDate) {
    let newDate = {
      date:new Date(theDate).toJSON().slice(0,10),
      count: 0,
    };
    dates = [...dates, newDate]
    theDate.setDate(theDate.getDate() + 1)
  }
  return dates
}

function concatAndSumTwoArray(arrayData, clickInfoArray) {
  let concatDays = [...arrayData, ...clickInfoArray];
  let result = [];
  concatDays.reduce(function(res, value) {
    if (!res[value.date]) {
      res[value.date] = { date: value.date, count: 0 };
      result.push(res[value.date])
    }
    res[value.date].count += value.count;
    return res;
  }, {});
  return result
}
const monthsObj = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July', '08': 'Aug', '09': 'Sept', '10': 'Oct', '11': 'Nov', '12': 'Dec' };

function handleDaysForStatistic (clickInfoArray) {
  const today = new Date()
  const fifteenDaysFromNow = new Date(today)
  fifteenDaysFromNow.setDate( fifteenDaysFromNow.getDate() - 15);
  const days = getDatesBetweenDates(fifteenDaysFromNow, today)

  let concatDays = concatAndSumTwoArray(days, clickInfoArray);

  concatDays.map((day, i) => {
    let splitMonth = day.date.split('-')[1]
    let splitDay = day.date.split('-')[2]
    concatDays[i].date = `${monthsObj[splitMonth]} ${splitDay}`
  });


  return concatDays
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

function reverse(s){
  return s.split("-").reverse().join("-");
}

function handleMonthsForStatistic (clickInfoArray) {
  const monthDate = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let d = new Date();
  d.setDate(1);
  let months = [];
  //TODO: Change map
  for (let i=0; i<=11; i++) {
    const newDate = `${d.getFullYear()}-${monthDate[d.getMonth()]}`;
    months.push({date: newDate, count: 0});
    d.setMonth(d.getMonth() - 1);
  }
  let concatArray = concatAndSumTwoArray(months, clickInfoArray);
  console.log('concatArray', concatArray)

  for (let j=0; j<=11; j++) {
    let splitMonth = concatArray[j].date.split('-')[1];
    concatArray[j].date = reverse(concatArray[j].date.replaceAt(5, monthsObj[splitMonth]))
  }
  console.log('concatArray2', concatArray)

  return concatArray;
}

module.exports = {
  checkLinkId,
  nameValidation,
  emailValidation,
  passwordValidation,
  redirectLogin,
  parseIp,
  getDatesBetweenDates,
  handleDaysForStatistic,
  handleMonthsForStatistic
};
