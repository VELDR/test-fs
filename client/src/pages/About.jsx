import { Box, Container, Typography } from '@mui/material';
import NavBar from '../components/common/NavBar';

const About = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ bgcolor: '#222222', height: '100%', minHeight: '100vh' }}>
        <Container>
          <Box
            sx={{
              padding: '40px',
              color: 'white',
            }}
          >
            <Typography variant="h4" component="h1">
              ℹ️ About Klontong
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, lineHeight: 2 }}>
              Welcome to Klontong - A Simple Product Management Web Application.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, lineHeight: 2 }}>
              Klontong is a simple yet powerful CRUD (Create, Read, Update,
              Delete) product management web application. Built with MERN Stack,
              Klontong is designed to streamline your product management tasks.
              Our mission is to provide you with a user-friendly platform that
              makes product management effortless and efficient.
            </Typography>
            <Typography variant="h4" component="h1" mt={4}>
              🔑 Key Features
            </Typography>
            <Typography variant="h6" sx={{ my: 2 }}>
              Klontong offers a range of features to simplify your product
              management:
            </Typography>

            <Typography
              sx={{ lineHeight: 2, fontWeight: 500, fontStyle: 'italic' }}
            >
              ✓ Effortless product listing and management. <br /> ✓
              User-friendly product editing and deletion. <br />✓ Powerful
              product search functionality to find items quickly. <br />✓ Secure
              user registration and login for data privacy.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;
