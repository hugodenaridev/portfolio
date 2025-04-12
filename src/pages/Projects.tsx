import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import ProgressiveImage from '../components/ProgressiveImage';
import Button from '../components/Button';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Meta from '../components/Meta';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: Project;
  isDarkMode: boolean;
}

const ProjectCard = ({ project, isDarkMode }: ProjectCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <motion.article
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg overflow-hidden ${
        isDarkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white shadow-lg'
      }`}
    >
      <ProgressiveImage
        src={project.imageUrl}
        alt={project.title}
        className="aspect-video"
      />
      <div className="p-6 space-y-4">
        <h3 className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              variant="primary"
            >
              View Live
            </Button>
          )}
          <Button
            href={project.githubUrl}
            variant="outline"
          >
            View Code
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { isDarkMode } = useStore();

  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS. Features dark mode, animations, and responsive design.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      imageUrl: "/projects/portfolio.jpg",
      githubUrl: "https://github.com/yourusername/portfolio"
    },
    {
      title: 'Project One',
      description: 'A full-stack web application built with modern technologies.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      imageUrl: '/project1.jpg',
      githubUrl: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Project Two',
      description: 'Mobile-first responsive web application.',
      technologies: ['Next.js', 'TailwindCSS', 'MongoDB'],
      imageUrl: '/project2.jpg',
      githubUrl: 'https://github.com/yourusername/project2'
    },
    // Add more projects as needed
  ];

  return (
    <>
      <Meta 
        title="Projects | Developer Portfolio"
        description={`Explore my portfolio of ${projects.length} web development projects showcasing expertise in React, TypeScript, and modern web technologies.`}
      />
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              My Projects
            </h1>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Here are some of my recent projects. Each one is crafted with attention to detail and modern best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Projects;