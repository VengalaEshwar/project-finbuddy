
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { Button } from '../../components/ui/button';
import { BookOpen, Star, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const Simulators = () => {
  const simulators = [
    {
  title: "Stock Market",
  description: "Learn how stock markets work, trade virtually, and analyze stocks before investing.",
  imageURL: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
  path: "stockmarket"
  // cover: "bg-gradient-to-r from-indigo-500 to-purple-600"
},
{
  title: "Currency Converter",
  description: "Convert currencies in real time and understand the impact of exchange rates on global trade.",
  imageURL: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg",
  path: "currency"
  // cover: "bg-gradient-to-r from-indigo-500 to-purple-600"
},
{
  title: "Virtual EMI",
  description: "Calculate monthly EMI for loans and understand how interest rates impact your finances.",
  imageURL: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg",
  path: "emi"
  // cover: "bg-gradient-to-r from-indigo-500 to-purple-600"
},
{
  title: "Investment & Saving Simulator",
  description: "See how your money grows over time through savings and investments with compounding.",
  imageURL: "https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg",
  path: "savings"
}
  ];
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Financial Simulators</h1>
        
        <div className="glass-card rounded-2xl p-6 mb-8">
          <p className="text-gray-600">
            Expand your financial knowledge with our simulutors which help you undertand the actual things in the real world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simulators.map((sim, index) => (
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
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className={`h-60 flex items-center justify-center overflow-hidden`}>
                <img src={`${sim.imageURL}`} alt=""  class="w-full "/>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-finbuddy-dark mb-1">{sim.title}</h3>
                <p className="text-gray-600 mb-4">{sim.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-500">
                  </div>
                  <Button 
                    className="bg-finbuddy-purple hover:bg-finbuddy-purple/90 px-5 cursor-pointer active:scale-95"
                    size="sm"
                    onClick={() =>navigate(`/simulators/${sim.path}`)}
                  >
                    try
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Simulators;

// cover: "bg-gradient-to-r from-indigo-500 to-purple-600"
//   cover: "bg-gradient-to-r from-blue-500 to-cyan-400"
//   cover: "bg-gradient-to-r from-green-500 to-teal-400"
//   cover: "bg-gradient-to-r from-orange-500 to-yellow-400"
//   cover: "bg-gradient-to-r from-pink-500 to-rose-400"
//   cover: "bg-gradient-to-r from-red-500 to-orange-500"