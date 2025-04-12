import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Card from '../components/Card';
import Background from '../components/Background';
import Meta from '../components/Meta';
import { useState } from 'react';
import { 
  FaReact, FaNodeJs, FaGitAlt, FaDocker,
  FaFigma 
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiNextdotjs,
  SiExpress, SiPostgresql, SiMongodb
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
        // { name: 'VS Code', icon: <SiVisualstudio className="inline-block mr-2 text-[#007ACC]" /> },
        { name: 'Figma', icon: <FaFigma className="inline-block mr-2 text-[#F24E1E]" /> }
      ]
    }
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
    }
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
    }
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
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      <Meta 
        title="About | Developer Portfolio"
        description="Learn about my journey, skills, and experience as a full-stack developer"
      />
      <div className="relative">
        <Background />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Bio Section */}
            <motion.section 
              variants={itemVariants}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <Card variant="glass" className="p-8">
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Passionate developer with expertise in modern web technologies. 
                  Focused on creating performant and user-friendly applications.
                </p>
              </Card>
            </motion.section>

            {/* Skills Section */}
            <motion.section variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-8">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skills.map((skillGroup) => (
                  <Card
                    key={skillGroup.category}
                    variant="glass"
                    className="p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">
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
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-8">Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card
                    key={index}
                    variant="glass"
                    className="p-6"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="text-xl font-bold mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-medium text-primary-500 dark:text-primary-400 mb-1">
                      {exp.company}
                    </p>
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {exp.period}
                    </p>
                    <p className={
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }>
                      {exp.description}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card
                    key={index}
                    variant="glass"
                    className="p-6"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="text-xl font-bold mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary-500 dark:text-primary-400">
                      {edu.school}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {edu.year}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Certifications Section */}
            <motion.section variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-8">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    variant="glass"
                    className="p-6"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.badge}</span>
                      <div>
                        <h3 className="text-xl font-bold">
                          {cert.name}
                        </h3>
                        <p className="text-primary-500 dark:text-primary-400">
                          {cert.issuer}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {cert.year}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;