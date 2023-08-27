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
import { addProduct } from '../../features/productSlice';

const AddProductForm = ({ open, onClose, onAddSuccess }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState('');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [harga, setHarga] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const resetState = () => {
    setImageUrl('');
    setCategoryId(null);
    setCategoryName('');
    setProductName('');
    setSku('');
    setDescription('');
    setWeight(null);
    setHeight(null);
    setLength(null);
    setWidth(null);
    setHarga(null);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('/api/product', {
        categoryId,
        categoryName,
        name: productName,
        sku,
        description,
        weight,
        height,
        length,
        width,
        harga,
        image: imageUrl,
      });
      dispatch(addProduct(response.data));
      onAddSuccess();
      onClose();
      openSnackbar('Product added successfully', 'success');
      resetState();
    } catch (error) {
      console.error('Error adding product:', error);
      openSnackbar(error.response.data.error, 'error');
    }
  };

  const handleNumericInputChange = (event, setter) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters and parse as a number
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ''));

    // Check if numericValue is NaN and set it to an empty string
    if (isNaN(numericValue)) {
      setter('');
    } else {
      setter(numericValue);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Fill in the details to add a new product.
          </DialogContentText>

          <img
            src={imageUrl || 'https://via.placeholder.com/300x200/0'}
            alt={imageUrl}
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
              id="image-url"
              label="Image URL"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
              label="Category ID"
              value={categoryId}
              onChange={(e) => handleNumericInputChange(e, setCategoryId)}
              sx={{ mr: 2 }}
            />
            <TextField
              required
              margin="normal"
              id="categoryName"
              label="Category Name"
              type="text"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              required
              margin="normal"
              id="name"
              label="Product Name"
              type="text"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              sx={{ mr: 2 }}
            />
            <TextField
              required
              margin="normal"
              id="sku"
              label="SKU"
              type="text"
              value={sku.toUpperCase()}
              onChange={(e) => setSku(e.target.value)}
            />
          </Box>
          <TextField
            required
            margin="normal"
            id="description"
            label="Product Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
          />
          <Typography textAlign={'end'}>{description.length}/200</Typography>
          <Box sx={{ display: 'flex', my: 2 }}>
            <FormControl fullWidth variant="outlined" sx={{ mr: 2 }}>
              <InputLabel required>Weight</InputLabel>
              <OutlinedInput
                id="weight"
                label="Weight *"
                value={weight}
                onChange={(e) => handleNumericInputChange(e, setWeight)}
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
                label="Width *"
                value={width}
                onChange={(e) => handleNumericInputChange(e, setWidth)}
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
                label="Length *"
                value={length}
                onChange={(e) => handleNumericInputChange(e, setLength)}
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
                label="Height *"
                value={height}
                onChange={(e) => handleNumericInputChange(e, setHeight)}
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
              label="Price *"
              type="text"
              value={harga}
              onChange={(e) => handleNumericInputChange(e, setHarga)}
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
          <Button onClick={handleAdd} variant="contained">
            Add
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

export default AddProductForm;
