import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [authorBio, setAuthorBio] = useState("Biography not available.");
  const [wikiSummary, setWikiSummary] = useState("No additional summary available.");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBhHCnv-RVjTfrZIxIlDrajTryGfnmWy_c`
        );
        const data = await response.json();

        if (!data.volumeInfo) {
          console.error("Book details not found");
          return;
        }

        const bookInfo = data.volumeInfo;
        const authorName = bookInfo.authors?.[0] || "Unknown Author";

        fetchWikipediaData(authorName);

        setBook({
          title: bookInfo.title,
          author: authorName,
          description: bookInfo.description || "No summary available.",
          cover: bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/200",
        });
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const fetchWikipediaData = async (authorName) => {
      try {
        const wikiResponse = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorName)}`
        );
        const wikiData = await wikiResponse.json();

        if (wikiData.extract) {
          setAuthorBio(wikiData.extract);
        }
      } catch (error) {
        console.error(`Error fetching Wikipedia author details:`, error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!book) return <div className="text-center text-lg">Loading...</div>;

  return (
// <<<<<<< vamshii
    <div className="flex justify-center items-start min-h-screen w-screen bg-gray-100 mt-20 py-10 px-4 overflow-auto scroll-smooth">
      <div className="bg-white shadow-md hover:shadow-2xl hover:shadow-purple-500 transition-shadow duration-300 rounded-lg p-6 sm:p-8 w-full max-w-4xl sm:max-w-5xl md:max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Book Cover */}
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-48 h-72 sm:w-56 sm:h-80 md:w-64 md:h-96 object-cover rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-400 transition-shadow duration-300"
          />
          
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left w-full">
            {/* Title & Author */}
            <h2 className="text-xl sm:text-2xl font-bold">{book.title}</h2>
            <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-2">By: {book.author}</h3>
  
            {/* Divider */}
            <hr className="border-gray-300 my-4" />
  
            {/* Book Summary */}
            <h4 className="text-md sm:text-lg font-semibold">Summary:</h4>
            <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: book.description }} />
            </p>
  
            {/* Divider */}
            <hr className="border-gray-300 my-4" />
  
            {/* Author Bio */}
            <h4 className="text-md sm:text-lg font-semibold">About the Author:</h4>
            <p className="text-gray-600 text-sm sm:text-base">{authorBio}</p>
          </div>
{/* // =======
//     <div className="page-container glass-card rounded-xl  mx-auto p-6 bg-purple-100 mt-5 overflow-y-scroll ">
//       <div className="flex flex-col md:flex-row items-center gap-10 ">
//         <motion.img src={book.cover} alt={book.title} 
//         whileHover={{  y : -10}}
//         className="w-48 h-auto rounded-lg shadow-lg" />
//         <div className="md:ml-6 mt-4 md:mt-0 ">
//           <h2 className="text-2xl font-bold text-finbuddy-purple">{book.title}</h2>
//           <h3 className="text-lg font-semibold text-finbuddy-purple mt-2 ">By: {book.author}</h3>
//           <p className="text-gray-600 mt-2">
//             <strong className="text-finbuddy-purple">Summary:</strong>{" "}
//             <span dangerouslySetInnerHTML={{ __html: book.description }} />
//           </p>
//           <h4 className="mt-4 font-semibold text-finbuddy-purple">About the Author:</h4>
//           <p className="text-gray-600">{authorBio}</p>
// >>>>>>> main */}
        </div>
      </div>
    </div>
  );
  
  
};

export default BookDetails;
