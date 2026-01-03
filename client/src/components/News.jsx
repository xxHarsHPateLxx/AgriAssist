import React, { useEffect, useState } from 'react';
import { Calendar, ExternalLink, Leaf, Clock, RefreshCw, AlertCircle } from 'lucide-react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      setError('');
      const response = await fetch('https://agriassist-llyw.onrender.com/news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffHours < 1) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading latest agriculture news...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-4 rounded-2xl shadow-lg">
                <Leaf className="text-white" size={40} />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-800 mb-2 gradient-text">Agriculture News</h1>
                <p className="text-gray-600 text-lg">Stay updated with the latest in agriculture and farming innovations</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <RefreshCw className={`${refreshing ? 'animate-spin' : ''}`} size={20} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 rounded-xl flex items-center space-x-4 shadow-md animate-slideInLeft">
            <div className="bg-red-500 p-2 rounded-lg">
              <AlertCircle className="text-white" size={20} />
            </div>
            <span className="text-red-700 font-semibold flex-1">{error}</span>
            <button
              onClick={handleRefresh}
              className="ml-auto text-red-600 hover:text-red-700 font-bold bg-white px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* News Articles */}
        {articles.length === 0 && !loading && !error ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-full inline-block mb-4">
              <Leaf className="text-green-600" size={48} />
            </div>
            <p className="text-gray-500 text-lg font-semibold">No news articles available at the moment.</p>
            <p className="text-gray-400 mt-2">Check back soon for the latest agriculture updates</p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-300 transform hover:-translate-y-2 animate-fadeInUp hover:scale-[1.02]"
                style={{animationDelay: `${idx * 50}ms`}}
              >
                {/* Article Image Placeholder */}
                <div className="h-52 bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center overflow-hidden relative">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>


                <div className="p-6">
                  {/* Article Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-3 hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h2>

                  {/* Date and Time */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full">
                      <Calendar size={14} className="text-emerald-600" />
                      <span className="font-medium">{formatDate(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                      <Clock size={14} className="text-blue-600" />
                      <span className="font-medium">{getTimeAgo(article.publishedAt)}</span>
                    </div>
                  </div>

                  {/* Article Description */}
                  <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                    {article.description || 'No description available for this article.'}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold group transform hover:scale-105"
                  >
                    <span>Read Article</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Article Footer */}
                <div className="px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-semibold">🌾 Agriculture</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                    Latest
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 text-gray-600 font-semibold">
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-2 rounded-full">
              <Leaf size={20} className="text-white" />
            </div>
            <span>Stay informed about agriculture trends and innovations</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default News;
