import React from 'react'
import { Link } from 'react-router-dom';
import { FullPageCentered } from './helperComponents';

function Start () {
  return (
    <FullPageCentered>
      <h1>Slides</h1>
      <div className="d-flex gap-2">
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
      </div>
    </FullPageCentered>
  )
}

export default Start;
