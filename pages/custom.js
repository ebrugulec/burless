// import style from './NavBar.module.scss'
import React, {useState} from 'react'
import Link from "next/link";

const Custom = (props) => {
  const [newLink, setNewLink] = useState('');

  const handleSubmit = () => {

  };

  return (
    <div className="nav-menu">
      <form onSubmit={handleSubmit}>
        <label htmlFor="link">
          Link *
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Shorten your link"
            value={newLink}
            onChange={setNewLink}
            name="email"
            required
          />
        </label>
        <label htmlFor="custom">
          Link *
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="custom"
            value={newLink}
            onChange={setNewLink}
            name="custom"
          />
        </label>
      </form>
    </div>
  )
};

export default Custom
