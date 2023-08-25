import { TextField } from '@mui/material';

const EmailField = ({ email, setEmail }) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};

export default EmailField;
