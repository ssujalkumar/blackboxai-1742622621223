import { useState, useEffect } from 'react';
import { articlesApi, Article } from '../services/api';

export function WriterPanel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await articlesApi.create(formData);
      setFormData({ title: '', content: '' });
      fetchArticles(); // Refresh the list
      setError(null);
    } catch (err) {
      setError('Failed to create article. Please try again.');
      console.error('Error creating article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await articlesApi.delete(id);
      setArticles(articles.filter(article => article._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete article. Please try again.');
      console.error('Error deleting article:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Writer Panel</h1>

      {/* Create Article Form */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input min-h-[200px]"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Article'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Articles</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven't created any articles yet.
          </p>
        ) : (
          articles.map((article) => (
            <article
              key={article._id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {article.content.substring(0, 150)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}