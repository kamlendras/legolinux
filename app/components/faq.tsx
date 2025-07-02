import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData: FAQItem[] = [
    {
      question: "What is LegoLinux?",
      answer: "LegoLinux is a modular Linux distribution that comes with built-in local AI models. It allows you to build your perfect computing environment by combining different components like building blocks.",
      category: "General"
    },
    {
      question: "What AI models are included?",
      answer: "LegoLinux includes popular open-source AI models like Llama, Mistral, and CodeLlama. All models run locally on your machine, ensuring privacy and offline functionality.",
      category: "AI Features"
    },
    {
      question: "How is LegoLinux modular?",
      answer: "You can choose and combine different desktop environments, AI tools, development frameworks, and applications. Install only what you need, when you need it.",
      category: "Features"
    },
    {
      question: "What are the system requirements?",
      answer: "Minimum: 8GB RAM, 50GB storage. Recommended: 16GB+ RAM, dedicated GPU for AI acceleration, 100GB+ storage for full AI model suite.",
      category: "Technical"
    },
    {
      question: "Is my data private?",
      answer: "Yes! All AI processing happens locally on your machine. No data is sent to external servers, ensuring complete privacy and security.",
      category: "Privacy"
    },
    {
      question: "Can I use it for development?",
      answer: "Absolutely! LegoLinux includes development tools, IDEs, and AI coding assistants. Perfect for developers who want AI-powered workflows without cloud dependencies.",
      category: "Development"
    },
    {
      question: "How do I install LegoLinux?",
      answer: "Download the ISO from our website, create a bootable USB drive, and follow our step-by-step installation guide. We support both fresh installs and dual-boot setups.",
      category: "Installation"
    },
    {
      question: "Is it free and open source?",
      answer: "Yes! LegoLinux is completely free and open source under the GPL license. You can modify, distribute, and contribute to the project.",
      category: "General"
    }
  ];

  const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "warning" | "info" => {
    switch (category) {
      case "AI Features": return "primary";
      case "Privacy": return "success";
      case "Technical": return "warning";
      case "Development": return "info";
      default: return "secondary";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Everything you need to know about LegoLinux
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2,
              '&:before': {
                display: 'none',
              },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 2,
                },
                minHeight: 64,
              }}
            >
              {item.category && (
                <Chip
                  label={item.category}
                  size="small"
                  color={getCategoryColor(item.category)}
                  variant="outlined"
                />
              )}
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      
   </Container>
  );
};

export default FAQ;