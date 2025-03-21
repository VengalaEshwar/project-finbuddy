
import PageTransition from "../../components/layouts/PageTransition/PageTransition";

const News = () => {
  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="section-heading">Financial News</h1>
        
        <div className="glass-card rounded-2xl p-6 mb-6">
          <p className="text-gray-600">
            Stay updated with the latest market trends and financial insights.
            This page will feature curated news articles and market updates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="feature-card">
              <div className="bg-gray-200 animate-pulse h-40 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-1"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-1 w-5/6"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6"></div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default News;
