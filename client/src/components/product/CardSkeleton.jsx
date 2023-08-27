import { Card, CardContent, Skeleton } from '@mui/material';

const CardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
      <Skeleton variant="rectangular" width="100%" height={150} />
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
