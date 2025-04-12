import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Button from '../components/Button';
import Card from '../components/Card';
import Background from '../components/Background';
import Meta from '../components/Meta';

const Home = () => {
  const { isDarkMode } = useStore();

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Next.js',
    'TailwindCSS', 'MongoDB', 'PostgreSQL', 'AWS'
  ];

  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Client Satisfaction', value: '100%' }
  ];

  return (
    <>
      <Meta 
        title="Home | Developer Portfolio"
        description="Full-stack developer crafting beautiful and functional web applications that solve real-world problems"
      />
      <div className="relative min-h-[calc(100vh-4rem)]">
        <Background variant="hero" />
        
        {/* Hero Section */}
        <div className="container-section min-h-[80vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Building Digital Experiences
                <motion.span 
                  className="text-gradient block mt-2"
                  animate={{ 
                    backgroundSize: ['100% 100%', '200% 100%', '100% 100%'] 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  With Modern Technologies
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p 
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Full-stack developer crafting beautiful and functional web applications
              that solve real-world problems
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button to="/projects" variant="primary" size="lg">
                View My Work
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Get in Touch
              </Button>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative"
            >
              <p className={`text-sm font-medium mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Technologies I work with
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{
                      duration: 0.3,
                      delay: 1 + (index * 0.1),
                      type: "spring",
                      stiffness: 100
                    }}
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                      isDarkMode
                        ? 'bg-surface-800/50 backdrop-blur-sm text-gray-300 border border-surface-700/50 hover:border-primary-500/50'
                        : 'bg-surface-100/50 backdrop-blur-sm text-gray-800 hover:bg-surface-200/50'
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="py-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Background variant="subtle" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  variant="glass"
                  className="p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.h3 
                    className={`text-4xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.2 + (index * 0.1)
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className={
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }>
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;