import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PasswordField from '../components/user/PasswordField';
import EmailField from '../components/user/EmailField';
import StorefrontIcon from '@mui/icons-material/Storefront';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    setIsError(false);
    setSnackbarMessage('Registration successful!');
    setSnackbarOpen(true);

    // Delay navigation to login page
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post('/api/user/register', {
        name,
        email,
        password,
      });
      await user.data;

      if (user.status === 201) {
        handleRegistrationSuccess();
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.response.data.error);
    }
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={24}
        sx={{
          px: 4,
          pt: 2,
          pb: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'black',
            py: 1,
            px: 2,
            mb: 2,
            width: 1,
            borderRadius: 2,
          }}
        >
          <StorefrontIcon sx={{ mr: 2, color: 'white' }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
            }}
          >
            KLONTONG
          </Typography>
        </Box>

        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          CREATE AN ACCOUNT
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <EmailField email={email} setEmail={setEmail} />
          <PasswordField password={password} setPassword={setPassword} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Link href="/login" variant="body2">
              {'Already have an account? Login'}
            </Link>
          </Box>
          {isError && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Paper>
      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};
export default Register;
