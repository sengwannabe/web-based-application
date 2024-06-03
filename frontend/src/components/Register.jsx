import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FullPageCentered, StyledContainer } from './helperComponents';
import ErrorDismissable from './ErrorDismissable.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Register = (props) => {
  const { handleSubmit } = props;
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const useSetUserEmail = (email) => setUserEmail(email);
  const useSetUserPassword = (password) => setUserPassword(password);
  const useSetConfirmPassword = (password) => setConfirmPassword(password);
  const useSetUserName = (name) => setUserName(name);
  const useSetErrorMessage = (errorMessage) => setErrorMessage(errorMessage);
  const handleShowError = () => setErrorVisible(true);
  const handleCloseError = () => setErrorVisible(false);

  return (
    <FullPageCentered>
      <ErrorDismissable
        show={errorVisible}
        handleCloseError={handleCloseError}
        message={errorMessage}
      />
      <StyledContainer>
        <Form
          id='registrationForm'
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await handleSubmit(userEmail, userPassword, confirmPassword, userName);
              navigate('/dashboard');
            } catch (error) {
              handleShowError();
              useSetErrorMessage(error.toString());
            }
          }}
        >
          <h2>Register</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => useSetUserEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(event) => useSetUserName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(event) => useSetUserPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(event) => useSetConfirmPassword(event.target.value)}
            />
          </Form.Group>
        </Form>
        <Button className="mb-3" variant="primary" type="submit" form='registrationForm'>Submit</Button>
        <div>
          Already have an account? Login <Link to={'/login'}>here!</Link>
        </div>
      </StyledContainer>
    </FullPageCentered>
  );
}

export default Register;
