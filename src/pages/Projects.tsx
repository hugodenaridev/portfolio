import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressiveImage from '../components/ProgressiveImage';
import Background from '../components/Background';
import Meta from '../components/Meta';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const { isDarkMode } = useStore();

  return (
    <Card
      as="article"
      variant="glass"
      className="group"
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <ProgressiveImage
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDarkMode 
            ? 'from-surface-900/90 to-transparent' 
            : 'from-surface-900/70 to-transparent'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-surface-700/50 text-gray-300 backdrop-blur-sm'
                  : 'bg-surface-100/50 text-gray-800 backdrop-blur-sm'
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
              size="sm"
            >
              View Live
            </Button>
          )}
          <Button
            href={project.githubUrl}
            variant="outline"
            size="sm"
          >
            View Code
          </Button>
        </div>
      </div>
    </Card>
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
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://your-portfolio.com"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce platform with real-time inventory, user authentication, and payment processing.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      imageUrl: "/projects/ecommerce.jpg",
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://your-ecommerce.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features.",
      technologies: ["React", "Firebase", "TailwindCSS", "TypeScript"],
      imageUrl: "/projects/taskmanager.jpg",
      githubUrl: "https://github.com/yourusername/taskmanager"
    },
    {
      title: "AI Chat Interface",
      description: "Modern chat interface for AI interactions with stream responses and code highlighting.",
      technologies: ["React", "OpenAI API", "WebSockets", "TailwindCSS"],
      imageUrl: "/projects/aichat.jpg",
      githubUrl: "https://github.com/yourusername/aichat",
      liveUrl: "https://your-aichat.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Meta 
        title="Projects | Developer Portfolio"
        description="Explore my portfolio of web development projects showcasing expertise in React, TypeScript, and modern web technologies."
      />
      <div className="relative min-h-screen">
        <Background />
        <div className="container-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center mb-8"
              >
                Featured Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-center max-w-2xl mx-auto mb-12 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Here are some of my recent projects. Each one is crafted with attention 
                to detail and modern best practices.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Projects;