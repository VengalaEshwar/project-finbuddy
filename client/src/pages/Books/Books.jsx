/* import { Link } from "react-router-dom";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { Button } from '../../components/ui/button';
import { BookOpen, Star, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import LoadingComponents from "../../components/LoadingComponents";

const API_KEY = "AIzaSyBhHCnv-RVjTfrZIxIlDrajTryGfnmWy_c";
const categories = ["finance", "investing", "business"];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let allBooks = new Map();

        for (const category of categories) {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${category}&key=${API_KEY}`);
          const data = await response.json();

          if (data.items) {
            data.items.forEach(book => {
              const volume = book.volumeInfo;
              const bookId = book.id;

              if (!allBooks.has(bookId)) {
                allBooks.set(bookId, {
                  id: bookId,
                  title: volume.title,
                  author: volume.authors ? volume.authors.join(", ") : "Unknown",
                  cover: volume.imageLinks?.thumbnail || "https://via.placeholder.com/200",
                  rating: volume.averageRating || null,
                });
              }
            });
          }
        }
        const sortedBooks = Array.from(allBooks.values()).sort((a, b) => {
          if (a.rating === null && b.rating !== null) return 1;
          if (a.rating !== null && b.rating === null) return -1;
          return b.rating - a.rating;
        });

        setBooks(sortedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle Buy button click
  const handleBuy = (title) => {
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(title)}`;
    const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(title)}`;

    // First try Amazon, then Flipkart
    fetch(amazonUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open(amazonUrl, "_blank");
        } else {
          return fetch(flipkartUrl, { method: 'HEAD' });
        }
      })
      .then(response => {
        if (response && response.ok) {
          window.open(flipkartUrl, "_blank");
        } else {
          alert("Not available.");
        }
      })
      .catch(() => alert("Not available."));
  };

  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Popular Finance, Investing & Business Books</h1>
        <div className="glass-card rounded-2xl p-6 mb-6">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eum alias et maxime dolorum, doloremque velit laboriosam nemo officiis id. Iste enim fugiat repellat iusto consectetur quae saepe eveniet soluta.
          </p>
        </div>
        {loading ? <LoadingComponents /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-40 flex items-center justify-center">
                  <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-finbuddy-dark mb-1">{book.title}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <UserRound className="w-4 h-4 mr-1" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-yellow-500">
                      {book.rating !== null ? (
                        <>
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          <span>{book.rating.toFixed(1)}/5</span>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">No rating available</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/books/${book.id}`}>
                        <Button className="bg-finbuddy-purple hover:bg-finbuddy-purple/90" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                        onClick={() => handleBuy(book.title)}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Books;
 */


import { Link } from "react-router-dom";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { Button } from '../../components/ui/button';
import { BookOpen, Star, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import LoadingComponents from "../../components/LoadingComponents";

const API_KEY = "AIzaSyBhHCnv-RVjTfrZIxIlDrajTryGfnmWy_c";
const categories = ["finance", "investing", "business"];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let allBooks = new Map();

        for (const category of categories) {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${category}&key=${API_KEY}`);
          const data = await response.json();

          if (data.items) {
            data.items.forEach(book => {
              const volume = book.volumeInfo;
              const bookId = book.id;

              if (!allBooks.has(bookId)) {
                allBooks.set(bookId, {
                  id: bookId,
                  title: volume.title,
                  author: volume.authors ? volume.authors.join(", ") : "Unknown",
                  cover: volume.imageLinks?.thumbnail || "https://via.placeholder.com/200",
                  rating: volume.averageRating || null,
                });
              }
            });
          }
        }
        const sortedBooks = Array.from(allBooks.values()).sort((a, b) => {
          if (a.rating === null && b.rating !== null) return 1;
          if (a.rating !== null && b.rating === null) return -1;
          return b.rating - a.rating;
        });

        setBooks(sortedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle Buy button click
  const buyBook = (title) => {
    if (!title) {
      alert("Title not available");
      return;
    }
  
    const formattedTitle = encodeURIComponent(title);
    const amazonURL = `https://www.amazon.in/s?k=${formattedTitle}`;
    const flipkartURL = `https://www.flipkart.com/search?q=${formattedTitle}`;
  
    // Open Amazon first
    window.open(amazonURL, "_blank");
  
    // Set a timeout to open Flipkart if the user does not find it on Amazon
    setTimeout(() => {
      window.open(flipkartURL, "_blank");
    }, 2000); // Opens Flipkart 2 seconds later as a backup
  };
  

  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Popular Finance, Investing & Business Books</h1>
        <div className="glass-card rounded-2xl p-6 mb-6">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eum alias et maxime dolorum, doloremque velit laboriosam nemo officiis id. Iste enim fugiat repellat iusto consectetur quae saepe eveniet soluta.
          </p>
        </div>
        {loading ? (
          <LoadingComponents />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-40 flex items-center justify-center">
                  <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-finbuddy-dark mb-1">{book.title}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <UserRound className="w-4 h-4 mr-1" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-yellow-500">
                      {book.rating !== null ? (
                        <>
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          <span>{book.rating.toFixed(1)}/5</span>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">No rating available</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/books/${book.id}`}>
                        <Button className="bg-finbuddy-purple hover:bg-finbuddy-purple/90" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                        onClick={() => buyBook(book.title)}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Books;
