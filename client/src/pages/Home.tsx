import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="text-primary">InnovateInk</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A platform where selected writers share their insights and readers discover compelling articles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Reader Card */}
          <div className="card hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <BookOpenIcon className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Reader Panel</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Explore a curated collection of articles from our talented writers. Search, read, and stay informed.
            </p>
            <div className="text-center">
              <Link to="/reader" className="btn btn-primary">
                Start Reading
              </Link>
            </div>
          </div>

          {/* Writer Card */}
          <div className="card hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <PencilSquareIcon className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Writer Panel</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              For our selected writers: Create, manage, and share your articles with our growing community.
            </p>
            <div className="text-center">
              <Link to="/writer" className="btn btn-primary">
                Start Writing
              </Link>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose InnovateInk?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only selected writers contribute, ensuring high-quality articles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intuitive interface for both readers and writers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comfortable reading experience in any lighting condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}