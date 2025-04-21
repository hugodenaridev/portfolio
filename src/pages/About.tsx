import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Card from '../components/Card';
import Background from '../components/Background';
import Meta from '../components/Meta';
import { useState } from 'react';
import { 
  FaReact, FaGitAlt, FaDocker,
  FaFigma, FaJava, FaMicrosoft, FaBuilding, FaCode
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss,
  SiDotnet, SiSpring
} from 'react-icons/si';

const About = () => {
  const { isDarkMode } = useStore();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { 
      category: 'Frontend', 
      items: [
        { name: 'React', icon: <FaReact className="inline-block mr-2 text-[#61DAFB]" /> },
        { name: 'JavaScript', icon: <SiTypescript className="inline-block mr-2 text-[#F7DF1E]" /> },
        { name: 'TypeScript', icon: <SiTypescript className="inline-block mr-2 text-[#3178C6]" /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss className="inline-block mr-2 text-[#06B6D4]" /> }
      ]
    },
    { 
      category: 'Backend', 
      items: [
        { name: 'C#', icon: <FaMicrosoft className="inline-block mr-2 text-[#239120]" /> },
        { name: '.NET', icon: <SiDotnet className="inline-block mr-2 text-[#512BD4]" /> },
        { name: 'Java', icon: <FaJava className="inline-block mr-2 text-[#007396]" /> },
        { name: 'Spring Boot', icon: <SiSpring className="inline-block mr-2 text-[#6DB33F]" /> }
      ]
    },
    { 
      category: 'Tools', 
      items: [
        { name: 'Git', icon: <FaGitAlt className="inline-block mr-2 text-[#F05032]" /> },
        { name: 'Docker', icon: <FaDocker className="inline-block mr-2 text-[#2496ED]" /> },
        { name: 'Playwright', icon: <FaMicrosoft className="inline-block mr-2 text-[#007ACC]" /> },
        { name: 'Figma', icon: <FaFigma className="inline-block mr-2 text-[#F24E1E]" /> }
      ]
    }
  ];

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'BTG Pactual (Largest investment bank in Latam)',
      period: 'July 2021 - Present',
      achievements: [
        'Developed frontend applications that generated over $20M in quarterly revenue',
        'Wrote E2E tests using Playwright, increasing code coverage to 80%',
        'Implemented Monorepo and monolith architecture, improving webpage performance by 20%',
        'Guided newcomers through the codebase and collaborated with the team to build backend APIs and frontend screens'
      ]
    },
    {
      title: 'Software Engineer Intern',
      company: 'Onebrain',
      period: 'January 2021 - June 2021',
      achievements: [
        'Designed an automated SMS app, saving 8 hours of manual work weekly',
        'Worked closely with senior engineers to develop a chat feature using Java and React'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.S. Computer Science',
      school: 'Universidade Estadual de Campinas',
      year: '2014 - 2020',
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                  {(() => {
                    const bioText = "4.5 years of experience working with JavaScript, React, C# and .NET. I have built full stack web applications for BTG Pactual (World's best SME Bank), such as internet banking features, webviews and backoffice platforms. Additionally, I have built a project for my internship using Java, SpringBoot, JavaScript and React.js that assisted in the daily chores of the company staff.";
                    
                    // Terms to highlight
                    const highlightTerms = [
                      "4.5 years", "JavaScript", "React", "C#", ".NET", 
                      "BTG Pactual", "Java", "SpringBoot", "React.js"
                    ];
                    
                    // Create a regex to match all highlight terms
                    const regex = new RegExp(
                      '(' + 
                      highlightTerms
                        .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                        .join('|') + 
                      ')', 
                      'g'
                    );
                    
                    return bioText.split(regex).map((part, i) => {
                      if (highlightTerms.includes(part)) {
                        return (
                          <span key={i} className="font-bold text-primary-500 dark:text-primary-400">
                            {part}
                          </span>
                        );
                      }
                      return part;
                    });
                  })()}
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
                    className="p-6 overflow-x-auto"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className={`text-3xl mb-3 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`}>
                        {exp.company.includes('BTG') ? <FaBuilding /> : <FaCode />}
                      </div>
                      <h3 className="text-xl font-bold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-medium text-primary-500 dark:text-primary-400 mb-1">
                        {exp.company}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {exp.period}
                      </p>
                    </div>
                    <div className="space-y-3 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.div 
                          key={achievementIndex} 
                          className="flex items-center min-w-max pr-4"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className={`mr-2 flex-shrink-0 text-xl ${
                            isDarkMode ? 'text-primary-400' : 'text-primary-600'
                          }`}>•</span>
                          <p className={`${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          } font-medium leading-relaxed whitespace-nowrap overflow-visible`}>
                            {achievement.includes('$20M') || achievement.includes('80%') || achievement.includes('20%') || achievement.includes('8 hours') ? (
                              <>
                                {achievement.split(/(\$20M|80%|20%|8 hours)/g).map((part, i) => {
                                  if (part === '$20M' || part === '80%' || part === '20%' || part === '8 hours') {
                                    return <span key={i} className="font-bold text-primary-500 dark:text-primary-400">{part}</span>
                                  }
                                  return part;
                                })}
                              </>
                            ) : (
                              achievement
                            )}
                          </p>
                        </motion.div>
                      ))}
                    </div>
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