import React from "react";

function LoginForm({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;