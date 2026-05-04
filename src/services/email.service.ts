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

interface QuoteFormDetailedData {
  // BLOQUE 1: Datos del cliente
  companyName: string;
  ruc?: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;

  // BLOQUE 2: Objetivo del proyecto
  projectGoals: string[];
  otherGoal?: string;

  // BLOQUE 3: Tipo de solución
  solutionType: string;

  // BLOQUE 4: Detalle de la solución
  webAppType?: string;
  mobileplatforms?: string[];
  systemType?: string;

  // BLOQUE 5: Funcionalidades
  features: string[];

  // BLOQUE 6: Roles del sistema
  hasRoles: string;
  roles?: string;

  // BLOQUE 7: Diseño y experiencia
  hasDesign: string;
  needsPrototype: string;
  visualStyle: string;

  // BLOQUE 8: Requerimientos técnicos
  needsCloud: string;
  securityLevel: string;
  needsIntegrations: string;
  integrations?: string;

  // BLOQUE 9: Tiempo y presupuesto
  timeline: string;
  budget: string;

  // BLOQUE 10: Soporte y continuidad
  needsSupport: string;

  // BLOQUE 11: Comentarios finales
  additionalComments?: string;
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
  sendQuoteEmail: async (data: QuoteFormDetailedData): Promise<EmailResponse> => {
    try {
      const response = await axios.post<EmailResponse>('/api/quote', data);
      return response.data;
    } catch (error) {
      console.error('Error sending quote email:', error);
      throw new Error('Failed to send quote email');
    }
  },
};
