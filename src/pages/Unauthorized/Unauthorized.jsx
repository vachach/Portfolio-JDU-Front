import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Unauthorized.module.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Box className={styles.unauthorizedBackground}>
      <Container maxWidth="md" className={styles.unauthorizedContainer}>
        <Typography variant="h3" gutterBottom>
          403 - アクセスが拒否されました
        </Typography>
        <Typography variant="body1" gutterBottom>
          このページにアクセスする権限がありません。
        </Typography>
        <Button onClick={handleBackToLogin} variant="contained" className={styles.unauthorizedButton}>
          ログインページへ戻る
        </Button>
      </Container>
    </Box>
  );
};

export default Unauthorized;
