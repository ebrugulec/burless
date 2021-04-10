import React, {useState} from 'react'
import Link from "next/link";
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const NewLink = ({addedNewLink}) => {
  const [newLink, setNewLink] = useState('');
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${BASE_URL}/api/links`,
      data: {
        link: newLink,
        linkCode: custom
      }
    })
      .then((response) => {
        if (response && response.data) {
          addedNewLink(response.data)
        }
      }).catch((err) => {
        console.log('err', err.response)
        if (err.response && err.response.data) {
          setError(err.response.data.errors[0].msg)
        }
    })
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
            onChange={event => setNewLink(event.target.value)}
            name="email"
            required
          />
        </label>
        <label htmlFor="link">
          Custom
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter custom"
            value={custom}
            onChange={event => setCustom(event.target.value)}
            name="custom"
          />
          <button type="submit" className="btn btn-primary">
            Shorten
          </button>
        </label>
      </form>
      {
        error &&
        <div>{error}</div>
      }
    </div>
  )
};

export default NewLink
