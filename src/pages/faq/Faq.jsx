import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FAQstyle from './Faq.module.css';

const FAQ = () => {
  const questionAnswer = [
    {
      question: "ポートフォリオシステムで何を登録できますか？",
      answer: "ポートフォリオシステムでは、自己 PR、特技、IT スキル、成果物、その他を他人と共有できます。これにより、あなたの学業成果やスキルを効果的にアピールできます。"
    },
    {
      question: "他の学生のポートフォリオを見ることはできますか？",
      answer: "リクルーターのプロフィールを見ることができますが、他の学生のポートフォリを見られません。"
    },
    {
      question: "モバイルデバイスでもポートフォリオを閲覧できますか？",
      answer: "はい、ポートフォリオシステムはレスポンシブデザインを対応しており、スマートフォンやタブレットなど、どのデバイスでも快適に閲覧できます。"
    }
  ];

  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h5' gutterBottom className={FAQstyle["faq-title"]}>
        FAQ
      </Typography>
      {questionAnswer.map((qa, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          defaultExpanded={index === 0}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography className={FAQstyle["title-accordion"]}>
              {qa.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={FAQstyle['body-accordion']}>
              {qa.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" >
              <EmailIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>test@jdu.uz</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" >
              <PhoneIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>+998 90 123 45 67</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" >
              <AccessTimeIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>09:00 ~ 18:00</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" >
              <LocationOnIcon className={FAQstyle["faq-icons"]} />
              <Typography sx={{ ml: 1 }}>
                Tashkent, Shayhontohur district, Sebzor, 21
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FAQ;
