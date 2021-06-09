import React from "react";
import Link from "next/link";

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
            Username *
            <input
              type="text"
              className="form-control"
              id="username-input"
              placeholder="Enter username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              required
            />
            <div className="required-placeholder">
              {touched.username && errors.username}
            </div>
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
            <div className="required-placeholder">
              {touched.email && errors.email}
            </div>
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
            <div className="required-placeholder">
              {touched.password && errors.password}
            </div>
          </label>
        </div>
        <div className="form-group action-buttons">
          <button type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
