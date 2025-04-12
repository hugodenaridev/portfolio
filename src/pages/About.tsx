import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Meta from '../components/Meta';
import { useState } from 'react';
import { 
  FaReact, FaNodeJs, FaGitAlt, FaDocker,
  FaFigma 
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiNextdotjs,
  SiExpress, SiPostgresql, SiMongodb, 
  SiVscodium as SiVisualstudio
} from 'react-icons/si';

const About = () => {
  const { isDarkMode } = useStore();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { 
      category: 'Frontend', 
      items: [
        { name: 'React', icon: <FaReact className="inline-block mr-2 text-[#61DAFB]" /> },
        { name: 'TypeScript', icon: <SiTypescript className="inline-block mr-2 text-[#3178C6]" /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss className="inline-block mr-2 text-[#06B6D4]" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="inline-block mr-2" /> }
      ]
    },
    { 
      category: 'Backend', 
      items: [
        { name: 'Node.js', icon: <FaNodeJs className="inline-block mr-2 text-[#339933]" /> },
        { name: 'Express', icon: <SiExpress className="inline-block mr-2" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="inline-block mr-2 text-[#336791]" /> },
        { name: 'MongoDB', icon: <SiMongodb className="inline-block mr-2 text-[#47A248]" /> }
      ]
    },
    { 
      category: 'Tools', 
      items: [
        { name: 'Git', icon: <FaGitAlt className="inline-block mr-2 text-[#F05032]" /> },
        { name: 'Docker', icon: <FaDocker className="inline-block mr-2 text-[#2496ED]" /> },
        { name: 'VS Code', icon: <SiVisualstudio className="inline-block mr-2 text-[#007ACC]" /> },
        { name: 'Figma', icon: <FaFigma className="inline-block mr-2 text-[#F24E1E]" /> }
      ]
    },
  ];

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Led development of enterprise web applications using React and TypeScript.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2021 - 2023',
      description: 'Built and maintained multiple client projects using modern web technologies.',
    },
  ];

  const education = [
    {
      degree: 'Master of Computer Science',
      school: 'University Name',
      year: '2021',
    },
    {
      degree: 'Bachelor of Software Engineering',
      school: 'University Name',
      year: '2019',
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2024',
      badge: '🏅',
    },
    {
      name: 'Professional Cloud Developer',
      issuer: 'Google Cloud',
      year: '2024',
      badge: '🎯',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skillVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: isDarkMode 
        ? "0 8px 16px rgba(255, 255, 255, 0.1)"
        : "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <>
      <Meta 
        title="About | Developer Portfolio"
        description="Learn about my journey, skills, and experience as a full-stack developer"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Bio Section */}
          <motion.section variants={itemVariants}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About Me
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Passionate developer with expertise in modern web technologies. 
              Focused on creating performant and user-friendly applications.
            </p>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={itemVariants}>
            <h2 className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup) => (
                <div 
                  key={skillGroup.category}
                  className={`p-6 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        whileHover="hover"
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className={`flex items-center ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {skill.icon}
                        <span className={hoveredSkill === skill.name ? 'font-semibold' : ''}>
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={itemVariants}>
            <h2 className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-6 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
                >
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {exp.title}
                  </h3>
                  <p className={`text-lg font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {exp.company}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {exp.period}
                  </p>
                  <p className={`mt-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={itemVariants}>
            <h2 className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-6 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
                >
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {edu.degree}
                  </h3>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {edu.school}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {edu.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section variants={itemVariants}>
            <h2 className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-6 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
                >
                  <span className="text-2xl mr-2">{cert.badge}</span>
                  <h3 className={`text-xl font-bold inline-block ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {cert.name}
                  </h3>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {cert.issuer}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {cert.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
};

export default About;