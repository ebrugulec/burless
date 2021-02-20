import React from "react";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

function FormWrapper({ initialValues, validate, isSignUp, onSignUpSubmit, onLoginSubmit }) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = evt => {
    const { name, value: newValue, type } = evt.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({
      ...values,
      [name]: value
    });
    setTouched({
      ...touched,
      [name]: true
    });
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    let checkEmptyOrTouched = !value || touched[name];
    setErrors({
      ...rest,
      ...(error && { [name]: checkEmptyOrTouched && error })
    });
  };

  const handleBlur = evt => {
    const { name, value } = evt.target;
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    if (value === '') {
      setTouched({
        ...touched,
        [name]: true
      });
    }
    let checkEmptyOrTouched = !value || touched[name];
    setErrors({
      ...rest,
      ...(error && { [name]: checkEmptyOrTouched && error })
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
      Object.values(values).length &&
      Object.values(formValidation.touched).every(t => t === true)
    ) {
      if (isSignUp) {
        onSignUpSubmit(values)
      } else {
        onLoginSubmit(values)
      }
    }
  };

  return (
    <>
      {
        isSignUp ?
          <RegisterForm
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            values={values}
          />
          :
          <LoginForm
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            values={values}
          />
      }

    </>
  );
}

export default FormWrapper;