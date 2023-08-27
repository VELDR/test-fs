import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import EmailField from '../components/user/EmailField';
import PasswordField from '../components/user/PasswordField';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post('/api/user/login', {
        email,
        password,
      });
      const data = await user.data;

      if (user.status === 200) {
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(setCredentials({ user: data, token: data.token }));
        setIsError(false);
        navigate('/product');
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.response.data.error);
    }
  };

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
          LOGIN
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <EmailField email={email} setEmail={setEmail} />
          <PasswordField password={password} setPassword={setPassword} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
          {isError && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Paper>
    </Container>
  );
};
export default Login;
