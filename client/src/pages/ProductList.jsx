import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import NavBar from '../components/common/NavBar';
import ProductCard from '../components/product/ProductCard';
import AddProductForm from '../components/product/AddProductForm';
import CardSkeleton from '../components/product/CardSkeleton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../features/productSlice';
import SearchBar from '../components/product/SearchBar';

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const totalItems = useSelector((state) => state.product.totalItems);
  const { user } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/product', {
        params: {
          pageNumber: page,
          pageSize: productsPerPage,
          name: searchQuery,
        },
      });

      dispatch(
        setProducts({
          items: response.data,
          totalItems: response.totalItems,
        })
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, page, searchQuery, productsPerPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const fetchProductsAfterAdd = () => {
    fetchProducts();
    setIsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleProductsPerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    setProductsPerPage(newPerPage);
    setPage(1);
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ my: 2, fontWeight: 700 }} variant="h4">
            Products
          </Typography>

          <SearchBar onSearch={handleSearch} />

          {user && (
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              sx={{
                my: 2,
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Add Products
            </Button>
          )}
        </Box>
        {totalItems === 0 ? (
          <Box sx={{ mt: 2, color: 'black', textAlign: 'center' }}>
            <Typography variant="h3">🔍🤔</Typography>
            <Typography variant="h6">
              Sorry, we couldn't find any products that match your search.{' '}
              <br /> Please check your spelling or try a different keyword.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  {loading ? (
                    <CardSkeleton />
                  ) : (
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <ProductCard product={product} />
                    </Link>
                  )}
                </Grid>
              ))}
            </Grid>

            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Pagination
                  count={Math.ceil(totalItems / productsPerPage)}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handleChangePage}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <Typography variant="caption" mx={2}>
                    Products per page:
                  </Typography>
                  <FormControl size="small">
                    <Select
                      value={productsPerPage}
                      onChange={handleProductsPerPageChange}
                      sx={{ fontSize: 'small' }}
                    >
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Stack>
          </>
        )}
      </Container>
      <AddProductForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={fetchProductsAfterAdd}
      />
    </>
  );
};

export default ProductList;
