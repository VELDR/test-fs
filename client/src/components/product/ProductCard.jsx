import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ProductCard = ({ product }) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: '0 auto',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={product.image || 'https://via.placeholder.com/300x200/0'}
          alt={product.name}
        />
        <CardContent>
          <Tooltip title={product.name} placement="bottom-start">
            <Typography variant="h6" noWrap>
              {product.name}
            </Typography>
          </Tooltip>
          <Box display={'flex'}>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'white',
                bgcolor: 'black',
                borderRadius: 5,
                px: 1,
                mb: 1,
              }}
            >
              {product.categoryName}
            </Typography>
          </Box>
          <Tooltip title={product.description} placement="bottom-start">
            <Typography variant="body2" color="text.secondary" noWrap>
              {product.description}
            </Typography>
          </Tooltip>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <LocalOfferIcon fontSize="small" />
            <Typography variant="subtitle1">
              Rp{product.harga.toLocaleString('id')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default ProductCard;
