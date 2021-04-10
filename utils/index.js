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

function handleDaysForStatistic (clickInfoArray) {
  const today = new Date()
  const fifteenDaysFromNow = new Date(today)
  fifteenDaysFromNow.setDate( fifteenDaysFromNow.getDate() - 15);

  const days = getDatesBetweenDates(fifteenDaysFromNow, today)

  let concatDays = [...days, ...clickInfoArray]
  let result = [];
  concatDays.reduce(function(res, value) {
    if (!res[value.date]) {
      res[value.date] = { date: value.date, count: 0 };
      result.push(res[value.date])
    }
    res[value.date].count += value.count;
    return res;
  }, {});

  return result;
}

module.exports = {
  checkLinkId,
  nameValidation,
  emailValidation,
  passwordValidation,
  redirectLogin,
  parseIp,
  getDatesBetweenDates,
  handleDaysForStatistic
};
