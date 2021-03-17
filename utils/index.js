const checkLinkId = (id) => {
  let numberAndStringR = "^(?![A-Za-z]+$)[0-9A-Za-z]+$";
  let stringR = "^[a-zA-Z]+$";
  return id.match(numberAndStringR) || id.match(stringR)
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

module.exports = {
  checkLinkId,
  nameValidation,
  emailValidation,
  passwordValidation,
  redirectLogin
}