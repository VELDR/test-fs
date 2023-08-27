import {
  Box,
  Button,
  Container,
  Divider,
  Icon,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import StraightenIcon from '@mui/icons-material/Straighten';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditProductForm from '../components/product/EditProductForm';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [isEdit]);

  const handleEditProduct = () => {
    setIsEdit(true);
  };
  return (
    <>
      {product && (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={24} sx={{ width: '75%', p: 4, my: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',

                border: 10,
                borderColor: 'black',
              }}
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200/0'}
                alt={product.image}
                style={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h6">{product.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon component={Grid3x3Icon} fontSize="small" />
                  <Typography variant="subtitle2" mr={2}>
                    {product.categoryId}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'white',
                      bgcolor: 'black',
                      borderRadius: 5,
                      px: 1,
                    }}
                  >
                    {product.categoryName}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6">
                Rp{product.harga.toLocaleString('id')}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography>{product.description}</Typography>
            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle2" width={50}>
                    Height
                  </Typography>
                  <Icon component={HeightIcon} fontSize="small" />
                </Box>
                <Typography variant="subtitle1" textAlign={'center'}>
                  {product.height} cm
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle2" width={50}>
                    Width
                  </Typography>
                  <Icon component={SyncAltIcon} fontSize="small" />
                </Box>
                <Typography variant="subtitle1" textAlign={'center'}>
                  {product.width} cm
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle2" width={50}>
                    Weight
                  </Typography>
                  <Icon component={ScaleIcon} fontSize="small" />
                </Box>
                <Typography variant="subtitle1" textAlign={'center'}>
                  {product.weight} g
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle2" width={50}>
                    Length
                  </Typography>
                  <Icon component={StraightenIcon} fontSize="small" />
                </Box>
                <Typography variant="subtitle1" textAlign={'center'}>
                  {product.length} cm
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex', md: 'block' },
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle2" width={50}>
                    SKU
                  </Typography>
                  <Icon component={DensitySmallIcon} fontSize="small" />
                </Box>
                <Typography variant="subtitle1" textAlign={'center'}>
                  {product.sku}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => navigate('/product')}
              >
                Back
              </Button>
              {user && (
                <Button
                  variant="contained"
                  onClick={handleEditProduct}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Paper>
          {isEdit && (
            <EditProductForm
              product={product}
              onClose={() => setIsEdit(false)}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default ProductDetails;
