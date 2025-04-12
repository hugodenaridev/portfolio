import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import useStore from '../store/useStore';
import Button from '../components/Button';
import Card from '../components/Card';
import Background from '../components/Background';
import Meta from '../components/Meta';

const Home = () => {
  const { isDarkMode } = useStore();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  const technologies = [
    'React', 'JavaScript', 'TypeScript', 'C#',
    '.NET', 'Java', 'Spring Boot', 'Playwright'
  ];

  const stats = [
    { label: 'Years Experience', value: '4.5+' },
    { label: 'Banking Features Built', value: '20+' },
    { label: 'Revenue Generated', value: '$20M+' },
    { label: 'Code Coverage', value: '80%' }
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
                Transforming Finance
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
                  Through Technology
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
              Crafting high-performance banking solutions with 4.5 years of expertise in financial technology.
              From revenue-generating apps to optimized user experiences, I build software that empowers institutions and delights users.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button to="/projects" variant="primary" size="lg">
                Explore My Solutions
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Let's Collaborate
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
                My Toolkit for Financial Innovation
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
        <div 
          className="py-20 relative"
          ref={statsRef}
        >
          <Background variant="subtle" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.2 + (index * 0.1),
                  }}
                >
                  <Card
                    variant="glass"
                    className="p-6 text-center"
                  >
                    <div
                      className={`text-4xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <p className={
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }>
                      {stat.label}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;