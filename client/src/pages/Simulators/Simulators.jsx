
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { Button } from '../../components/ui/button';
import { BookOpen, Star, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';

const Simulators = () => {
  const books = [
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      description: "Timeless lessons on wealth, greed, and happiness.",
      rating: 4.8,
      cover: "bg-gradient-to-r from-indigo-500 to-purple-600"
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      description: "What the rich teach their kids about money.",
      rating: 4.7,
      cover: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      description: "The definitive book on value investing.",
      rating: 4.9,
      cover: "bg-gradient-to-r from-green-500 to-teal-400"
    },
    {
      title: "Financial Freedom",
      author: "Grant Sabatier",
      description: "A proven path to all the money you will ever need.",
      rating: 4.5,
      cover: "bg-gradient-to-r from-orange-500 to-yellow-400"
    },
    {
      title: "Your Money or Your Life",
      author: "Vicki Robin",
      description: "Transforming your relationship with money.",
      rating: 4.6,
      cover: "bg-gradient-to-r from-pink-500 to-rose-400"
    },
    {
      title: "The Millionaire Next Door",
      author: "Thomas J. Stanley",
      description: "Surprising secrets of America's wealthy.",
      rating: 4.7,
      cover: "bg-gradient-to-r from-red-500 to-orange-500"
    }
  ];

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
          {books.map((book, index) => (
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
              <div className={`${book.cover} h-40 flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-finbuddy-dark mb-1">{book.title}</h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <UserRound className="w-4 h-4 mr-1" />
                  <span>{book.author}</span>
                </div>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span>{book.rating}/5</span>
                  </div>
                  <Button 
                    className="bg-finbuddy-purple hover:bg-finbuddy-purple/90"
                    size="sm"
                  >
                    View
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
