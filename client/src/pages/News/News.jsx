import React, { useEffect, useState } from "react";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import defaultImage from "./defaultNewsImage.webp";
import "./News.css";
const BASE_URL = "http://localhost:5000";



const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/news`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: "finance" }),
        });

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          console.log(result.data);
          setNews(result.data);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Financial News</h1>

        <div className="glass-card">
          <p className="news-description">
            Stay updated with the latest market trends and financial insights.
            This page features curated news articles and market updates.
          </p>
        </div>

        <div className="news-grid">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="feature-card">
                <div className="loading-box"></div>
                <div className="loading-text w-3/4"></div>
                <div className="loading-text"></div>
                <div className="loading-text w-5/6"></div>
                <div className="loading-text w-4/6"></div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-card">
                <div className="img-container">
                  <img
                    src={article.thumbnail}
                    alt="News Thumbnail"
                    className="news-thumbnail"
                    onError={(e) => { e.target.src = defaultImage; }}
                  />
                  <a href={article.publisher.url} target="_blank" rel="noopener noreferrer" className={`${article.publisher.url ? "news-source-link" : " news-source-link block-cursor"}`} >
                    {article.publisher.name || "Unknown"}
                  </a>
                </div>
                <h3 className="news-title">{article.title}</h3>
                <p className="news-excerpt">{article.excerpt}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p className="no-news ">No news available at the moment.</p>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default News;
