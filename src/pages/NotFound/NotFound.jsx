import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box className={styles.notfoundBackground}>
      <Container maxWidth="md" className={styles.notfoundContainer}>
        <Typography variant="h3" gutterBottom>
          404 - ページが見つかりません
        </Typography>
        <Typography variant="body1" gutterBottom>
          お探しのページは見つかりませんでした。
        </Typography>
        <Button onClick={handleBackToHome} variant="contained" className={styles.notfoundButton}>
          ホームへ戻る
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
