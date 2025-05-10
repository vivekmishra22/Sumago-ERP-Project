import React, { useState } from 'react';
import { Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Change_Password = ({ onBackToLogin }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');

    // Validate fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill all fields!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match!');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      // Send request to change password
      const response = await axios.post(
        'http://localhost:8000/hrchange_password',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Password changed successfully!');
        // Clear form fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Redirect back to login after a short delay
        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError(
        error.response?.data?.message ||
          'Failed to change password. Please check your current password and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col md={6} sm={12} lg={6} xl={6} xxl={6} className="mt-5 pt-3">
      <h1 className="text-center text-white">CHANGE PASSWORD</h1>
      <Card className="login4">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleChangePassword}>
            <Col md={12} className="my-3 text-white">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Current Password"
                className="rounded-pill login2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                aria-describedby="currentPasswordHelp"
              />
            </Col>

            <Col md={12} className="my-3 text-white">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                className="rounded-pill login3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                aria-describedby="newPasswordHelp"
              />
              {/* <Form.Text id="newPasswordHelp" muted>
                Password must be at least 6 characters long.
              </Form.Text> */}
            </Col>

            <Col md={12} className="my-3 text-white">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                className="rounded-pill login3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-describedby="confirmPasswordHelp"
              />
            </Col>

            <Col md={12} className="d-flex justify-content-center">
              <Button
                type="submit"
                className="mt-4 w-50 rounded-pill btn btn-primary login2"
                disabled={loading}
              >
                {loading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </Col>

            <Col md={12} className="d-flex justify-content-center mt-3">
              <Button
                variant="link"
                className="text-primary"
                onClick={onBackToLogin}
              >
                Back to Login
              </Button>
            </Col>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Change_Password;