import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { Button } from '../../components/ui/button';
import { Briefcase, GraduationCap, DollarSign, LineChart, Building, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Career = () => {
  const careers = [
    {
      title: "Financial Analyst",
      description: "Analyze financial data and create reports to guide business decisions.",
      education: "Bachelor's in Finance/Economics",
      salary: "$65,000 - $95,000",
      icon: <LineChart className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      title: "Investment Banker",
      description: "Assist organizations with capital raising, mergers, and acquisitions.",
      education: "MBA or Master's in Finance",
      salary: "$85,000 - $150,000+",
      icon: <Building className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-400"
    },
    {
      title: "Financial Planner",
      description: "Help individuals set and achieve financial goals through personalized planning.",
      education: "Bachelor's + CFP Certification",
      salary: "$60,000 - $115,000",
      icon: <Users className="w-8 h-8" />,
      color: "bg-gradient-to-r from-green-500 to-teal-400"
    },
    {
      title: "Financial Educator",
      description: "Teach financial literacy and money management to various audiences.",
      education: "Bachelor's + Teaching Experience",
      salary: "$45,000 - $75,000",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-400"
    }
  ];

  const pathways = [
    {
      title: "Education",
      description: "Discover degree programs, certifications, and courses in finance.",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: "Internships",
      description: "Find financial internship opportunities for hands-on experience.",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: "Certifications",
      description: "Explore industry certifications that boost your qualifications.",
      icon: <DollarSign className="w-6 h-6" />,
    }
  ];

  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Financial Career Pathways</h1>
        
        <div className="glass-card rounded-2xl p-6 mb-8">
          <p className="text-gray-600">
            Explore various career opportunities in the financial sector, educational pathways, 
            and resources to help you start your professional journey.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-finbuddy-dark mb-6">Explore Career Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex"
              >
                <div className={`${career.color} w-24 flex-shrink-0 flex items-center justify-center`}>
                  <div className="text-white">
                    {career.icon}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-finbuddy-dark mb-2">{career.title}</h3>
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center text-sm">
                      <GraduationCap className="w-4 h-4 mr-2 text-finbuddy-purple" />
                      <span>{career.education}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-finbuddy-purple" />
                      <span>{career.salary}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-finbuddy-purple text-finbuddy-purple hover:bg-finbuddy-softpurple/30"
                    size="sm"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-finbuddy-dark mb-6">Educational Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((pathway, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="feature-card flex flex-col items-center text-center"
              >
                <div className="bg-finbuddy-softpurple/30 text-finbuddy-purple p-4 rounded-full w-fit mb-4">
                  {pathway.icon}
                </div>
                <h3 className="text-xl font-semibold text-finbuddy-dark mb-2">{pathway.title}</h3>
                <p className="text-gray-600 mb-4">{pathway.description}</p>
                <Button className="mt-auto bg-finbuddy-purple hover:bg-finbuddy-purple/90">
                  Explore
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Career;
