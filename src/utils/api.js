import axios from 'axios';

// Replace these with actual endpoints for your AI features
const GLOSSARY_API = 'https://api.example.com/glossary';
const SUMMARY_API = 'https://api.example.com/summarize';

export const fetchGlossaryTerms = async (text) => {
  try {
    const response = await axios.post(GLOSSARY_API, { text });
    return response.data.terms; // Example: [{ term: "React", definition: "A JS library..." }]
  } catch (error) {
    console.error('Error fetching glossary terms:', error);
    return [];
  }
};

export const fetchSummary = async (text) => {
  try {
    const response = await axios.post(SUMMARY_API, { text });
    return response.data.summary; // Example: "This is a summary."
  } catch (error) {
    console.error('Error fetching summary:', error);
    return '';
  }
};
