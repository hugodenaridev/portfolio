import { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface NotificationState {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

const useContactForm = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      message,
      type,
      isVisible: true
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setFormData({ name: '', email: '', message: '' });
      showNotification('Message sent successfully!', 'success');
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    notification,
    handleSubmit,
    handleChange,
    closeNotification
  };
};

export default useContactForm;