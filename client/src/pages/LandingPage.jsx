import { Box, Typography } from '@mui/material';
import NavBar from '../components/common/NavBar';

export default function LandingPage() {
  return (
    <>
      <Box sx={{ overflow: 'hidden' }}>
        <NavBar />
        <Box
          sx={{
            backgroundImage: `url('https://www.fastpay.co.id/blog/wp-content/uploads/2019/12/21.-Cara-Mempertahankan-Eksistensi-Toko-Kelontong.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            position: 'relative',
          }}
        >
          <Box
            className="landing-text"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              opacity: 0, // Initially invisible
              animation: 'fadeIn 2s ease-in-out forwards',
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                },
                '100%': {
                  opacity: 1,
                },
              },
            }}
          >
            <Typography variant="h3" fontWeight={'700'}>
              From Warung to Your Screen:
            </Typography>
            <Typography variant="h4" fontWeight={'700'}>
              The Evolution of Convenience
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2, fontStyle: 'italic' }}>
              The evolution from the corner warung to the palm of your hand
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
