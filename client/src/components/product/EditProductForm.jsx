import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import StraightenIcon from '@mui/icons-material/Straighten';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProduct, editProduct } from '../../features/productSlice';
import { useNavigate } from 'react-router-dom';

const EditProductForm = ({ product, onClose }) => {
  const [formState, setFormState] = useState(product);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === 'weight' ||
      name === 'height' ||
      name === 'length' ||
      name === 'width' ||
      name === 'harga' ||
      name === 'categoryId'
    ) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

      if (isNaN(numericValue)) {
        setFormState((prevState) => ({ ...prevState, [name]: '' }));
      } else {
        setFormState((prevState) => ({ ...prevState, [name]: numericValue }));
      }
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `/api/product/${product._id}`,
        formState
      );
      if (response.status === 200) {
        dispatch(
          editProduct({ productId: product._id, updatedProduct: formState })
        );
        openSnackbar('Product updated successfully', 'success');
        onClose();
      } else {
        openSnackbar('Failed to update product', 'error');
      }
    } catch (error) {
      console.error(error);
      openSnackbar(error.response.data.error, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/product/${product._id}`);
      if (response.status === 200) {
        dispatch(deleteProduct(product._id));
        openSnackbar('Product deleted successfully', 'success');
        navigate('/product');
      } else {
        openSnackbar('Failed to update product', 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      openSnackbar(error.response.data.error, 'error');
    }
  };

  return (
    <>
      <Dialog open={Boolean(product)} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Edit your product.
          </DialogContentText>

          <img
            src={formState.image || 'https://via.placeholder.com/300x200/0'}
            alt={formState.image}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 5,
            }}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Image URL</InputLabel>
            <OutlinedInput
              id="image"
              name="image"
              label="Image URL"
              type="text"
              value={formState.image}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <TextField
              required
              margin="normal"
              id="categoryId"
              name="categoryId"
              label="Category ID"
              value={formState.categoryId}
              onChange={handleChange}
              sx={{ mr: 2 }}
            />
            <TextField
              required
              margin="normal"
              id="categoryName"
              name="categoryName"
              label="Category Name"
              type="text"
              fullWidth
              value={formState.categoryName}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              required
              margin="normal"
              id="name"
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              value={formState.name}
              onChange={handleChange}
              sx={{ mr: 2 }}
            />
            <TextField
              required
              margin="normal"
              id="sku"
              name="sku"
              label="SKU"
              type="text"
              value={formState.sku.toUpperCase()}
              onChange={handleChange}
            />
          </Box>
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            label="Product Description"
            multiline
            rows={3}
            fullWidth
            value={formState.description}
            onChange={handleChange}
          />
          <Typography textAlign={'end'}>
            {formState.description.length}/200
          </Typography>
          <Box sx={{ display: 'flex', my: 2 }}>
            <FormControl fullWidth variant="outlined" sx={{ mr: 2 }}>
              <InputLabel required>Weight</InputLabel>
              <OutlinedInput
                id="weight"
                name="weight"
                label="Weight *"
                value={formState.weight}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                startAdornment={
                  <InputAdornment position="start">
                    <ScaleIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ ml: 2 }}>
              <InputLabel required>Width</InputLabel>
              <OutlinedInput
                id="width"
                name="width"
                label="Width *"
                value={formState.width}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SyncAltIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', my: 2 }}>
            <FormControl fullWidth variant="outlined" sx={{ mr: 2 }}>
              <InputLabel required>Length</InputLabel>
              <OutlinedInput
                id="length"
                name="length"
                label="Length *"
                value={formState.length}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <StraightenIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ ml: 2 }}>
              <InputLabel required>Height</InputLabel>
              <OutlinedInput
                id="height"
                name="height"
                label="Height *"
                value={formState.height}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <HeightIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{ my: 2 }}
          >
            <InputLabel required>Price</InputLabel>
            <OutlinedInput
              id="price"
              name="harga"
              label="Price *"
              type="text"
              value={formState.harga}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">Rp</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ mr: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProductForm;
