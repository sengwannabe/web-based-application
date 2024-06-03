import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const AuthNavBar = (props) => {
  const { handleClick } = props;
  const navigate = useNavigate();

  return (
    <Navbar className='bg-primary-subtle text-right justify-content-end align-items-center'>
      <Button
        variant='dark'
        type='button'
        onClick={(event) => {
          event.preventDefault();
          handleClick();
          navigate('/login');
        }}
      >
        Logout
      </Button>
    </Navbar>
  )
};

export default AuthNavBar;
