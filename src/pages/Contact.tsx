import { motion } from 'framer-motion';
import useContactForm from '../hooks/useContactForm';
import Button from '../components/Button';
import Card from '../components/Card';
import Background from '../components/Background';
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

  const inputClasses = `w-full px-4 py-3 rounded-lg bg-surface-50/50 dark:bg-surface-800/50 
    border border-surface-200/50 dark:border-surface-700/50
    focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
    dark:focus:ring-primary-400/30 dark:focus:border-primary-400
    transition-all duration-200 backdrop-blur-sm
    placeholder:text-surface-400 dark:placeholder:text-surface-500`;

  const errorClasses = 'border-red-500 focus:ring-red-500/30 focus:border-red-500';

  const socialLinks = [
    {
      icon: '📧',
      label: 'Email',
      href: 'mailto:hugo@gmail.com',
      value: 'hugodenari.dev@gmail.com'
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/hugo-stanisce-denari/',
      value: 'linkedin.com/in/hugo-stanisce-denari/'
    },
    {
      icon: '💻',
      label: 'GitHub',
      href: 'https://github.com/hugodenaridev',
      value: 'github.com/hugodenaridev'
    },
    {
      icon: '🏢',
      label: 'Company',
      href: 'https://www.btgpactual.com',
      value: 'BTG Pactual'
    }
  ];

  return (
    <>
      <Meta 
        title="Contact | Developer Portfolio"
        description="Get in touch with me to discuss your next project or any opportunities"
      />
      <div className="relative min-h-screen">
        <Background variant="hero" />
        <div className="container-section">
          <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={closeNotification}
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Looking for a software engineer with experience in financial applications? Let's connect.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-8">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card variant="glass" className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label 
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="name-error" 
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="email-error" 
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={5}
                        className={`${inputClasses} ${errors.message ? errorClasses : ''}`}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="message-error" 
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Other ways to reach me
                  </h3>
                  <div className="space-y-6">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target={link.label !== 'Email' ? '_blank' : undefined}
                        rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className="flex items-center group"
                        whileHover={{ x: 4 }}
                      >
                        <span className="mr-3 text-2xl">{link.icon}</span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm text-surface-500 dark:text-surface-400">
                            {link.label}
                          </span>
                          <span className="text-primary-600 dark:text-primary-400 group-hover:text-primary-500 truncate max-w-[180px] sm:max-w-[240px]">
                            {link.value}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;