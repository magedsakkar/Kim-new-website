import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  profession: z.string().min(2, 'Profession is required'),
  motivation: z.string().min(20, 'Please tell us more about your motivation'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
