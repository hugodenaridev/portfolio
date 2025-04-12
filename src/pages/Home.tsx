import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Button from '../components/Button';
import Meta from '../components/Meta';

const Home = () => {
  const { isDarkMode } = useStore();

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Next.js',
    'TailwindCSS', 'MongoDB', 'PostgreSQL', 'AWS'
  ];

  return (
    <>
      <Meta 
        title="Home | Developer Portfolio"
        description="Full-stack developer crafting beautiful and functional web applications that solve real-world problems"
      />
      <div className="min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <div className="container-section min-h-[80vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className={`text-4xl md:text-6xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Building Digital Experiences
              <span className="text-gradient block mt-2">
                With Modern Technologies
              </span>
            </motion.h1>

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
              <Button to="/projects" variant="primary">
                View My Work
              </Button>
              <Button to="/contact" variant="outline">
                Get in Touch
              </Button>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
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
                        ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Stats Section */}
        <motion.div 
          className={`py-20 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  5+
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Years Experience
                </p>
              </div>
              <div>
                <h3 className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  50+
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Projects Completed
                </p>
              </div>
              <div>
                <h3 className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  30+
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Happy Clients
                </p>
              </div>
              <div>
                <h3 className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  100%
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;