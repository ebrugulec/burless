import React, {useState} from 'react'
import axios from "axios";
import DashboardHeader from "../components/Layout/DashboardHeader";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Reset () {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')

  function sendResetLink () {
    axios.post(`${BASE_URL}/api/users/reset-password`, { email })
      .then((res) => {
        setMessage('Password reset link has been sent to your inbox.')
      })
      .catch((err) => {
        setMessage('Something went wrong');
      });
  }

  return (
    <>
      <DashboardHeader/>
      <div className="reset">
        <div>
          <input value={email} onChange={event => setEmail(event.target.value)} />
          <button onClick={sendResetLink}>Send Rest Link</button>
        </div>
        { message &&
        <div>
          {message}
        </div>
        }
      </div>
    </>
  )
}
