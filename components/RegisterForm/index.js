import React from "react";

function RegisterForm({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values
}) {
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-input">
            Username
            <input
              type="text"
              className="form-control"
              id="username-input"
              placeholder="Enter first name"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              required
            />
            {touched.username && errors.username}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email address *
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              required
            />
            {touched.email && errors.email}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password-input">
            Password *
            <input
              type="password"
              className="form-control"
              id="password-input"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              required
            />
            {touched.password && errors.password}
          </label>
        </div>
        <div className="form-group">
          <input value="Send" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
