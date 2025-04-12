import { motion } from 'framer-motion';
import useContactForm from '../hooks/useContactForm';
import Button from '../components/Button';
import Notification from '../components/Notification';
import Meta from '../components/Meta';

const Contact = () => {
  const {
    formData,
    errors,
    isSubmitting,
    notification,
    handleSubmit,
    handleChange,
    closeNotification
  } = useContactForm();

  return (
    <>
      <Meta 
        title="Contact | Developer Portfolio"
        description="Get in touch with me to discuss your next project or any opportunities"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={closeNotification}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant={isSubmitting ? 'secondary' : 'primary'}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Other ways to reach me:</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-600">
                  <span className="mr-3">📧</span>
                  <a href="mailto:your.email@example.com" className="hover:text-blue-600">
                    your.email@example.com
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-3">🔗</span>
                  <a 
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    LinkedIn Profile
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-3">💻</span>
                  <a 
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    GitHub Profile
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;