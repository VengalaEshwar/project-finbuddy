
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  BookOpen, 
  MessageCircle, 
  Newspaper, 
  Gamepad2, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={link} className="block h-full">
        <div className="feature-card group h-full flex flex-col">
          <div className="bg-finbuddy-softpurple/30 text-finbuddy-purple p-3 rounded-xl w-fit mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-finbuddy-dark mb-2">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
          <div className="mt-4 text-finbuddy-purple font-medium flex items-center">
            <span>Learn more</span>
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Stock Simulator",
      description: "Practice trading with virtual money in a risk-free environment to build investment skills.",
      link: "/simulators"
    },
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: "Financial News",
      description: "Stay updated with the latest market trends and financial insights curated for beginners.",
      link: "/news"
    },
    // {
    //   icon: <MessageCircle className="w-6 h-6" />,
    //   title: "FinBuddy Chatbot",
    //   description: "Get instant answers to your financial questions from our AI-powered assistant.",
    //   link: "/chatbot"
    // },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning Resources",
      description: "Access a library of guides on personal finance, loans, credit scores, and more.",
      link: "/books"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Personalised Learning Paths",
      description: "Make learning fun with interactive modules that teach important money concepts.",
      link: "/learn"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Discover financial career paths and educational resources for your professional journey.",
      link: "/career"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-finbuddy-softpurple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-finbuddy-dark mb-4">
            Everything You Need to Master Finance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of tools designed to make financial literacy accessible and engaging.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              index={index}
            />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default FeatureCards;
