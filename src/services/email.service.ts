import axios from 'src/lib/axios';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface QuoteFormData {
  projectType: string;
  technologies: string[];
  timeline: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  requirements?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

// ----------------------------------------------------------------------
// Email Service
// ----------------------------------------------------------------------

export const emailService = {
  /**
   * Send contact form email
   * Sends emails to both company and client
   */
  sendContactEmail: async (data: ContactFormData): Promise<EmailResponse> => {
    try {
      const response = await axios.post<EmailResponse>('/api/contact', data);
      return response.data;
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw new Error('Failed to send contact email');
    }
  },

  /**
   * Send quote request email
   * Sends emails to both company and client
   */
  sendQuoteEmail: async (data: QuoteFormData): Promise<EmailResponse> => {
    try {
      const response = await axios.post<EmailResponse>('/api/quote', data);
      return response.data;
    } catch (error) {
      console.error('Error sending quote email:', error);
      throw new Error('Failed to send quote email');
    }
  },
};
