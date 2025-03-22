
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, CreditCard, DollarSign, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  const floatingIcons = [
    { icon: <BarChart className="w-12 h-12 text-finbuddy-purple" />, delay: 0 },
    { icon: <CreditCard className="w-10 h-10 text-finbuddy-purple/80" />, delay: 1.2 },
    { icon: <DollarSign className="w-8 h-8 text-finbuddy-purple/90" />, delay: 0.8 },
    { icon: <PiggyBank className="w-11 h-11 text-finbuddy-purple/70" />, delay: 0.4 },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,89,165,0.1),transparent_50%)]"></div>
        <div className="absolute left-0 right-0 top-0 h-[500px] bg-gradient-to-b from-finbuddy-softpurple/30 to-transparent"></div>
        <div className="absolute left-0 right-0 -top-40 h-80 rounded-full blur-3xl bg-finbuddy-softpurple/20 transform rotate-12"></div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <span className="px-3 py-1 inline-block bg-finbuddy-softpurple/60 text-finbuddy-purple text-sm font-medium rounded-full">
              Your Financial Journey Starts Here
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-finbuddy-dark mb-6 tracking-tight"
          >
            Learn Financial Literacy with{' '}
            <span className="text-finbuddy-purple">FinBuddy</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            An interactive platform designed to help young adults master personal finance,
            investment strategies, and develop smart money habits through engaging tools and resources.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="finbuddy-button-primary w-full sm:w-auto group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/simulator"
              className="finbuddy-button-secondary w-full sm:w-auto"
            >
              Try Simulator
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          className="absolute -z-10 inset-0 pointer-events-none"
          variants={iconContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              className="absolute opacity-50"
              style={{
                top: `${20 + Math.random() * 30}%`,
                left: `${5 + (index * 25) + (Math.random() * 8)}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: item.delay,
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
