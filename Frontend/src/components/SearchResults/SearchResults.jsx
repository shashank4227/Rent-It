import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import Display from '../../shared/Display';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState(location.state?.searchResults ?? null);
  const [loading, setLoading] = useState(!location.state?.searchResults && !!query);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.searchResults) {
      setResults(location.state.searchResults);
      setLoading(false);
      setError(null);
      return;
    }
    if (query) {
      setLoading(true);
      setError(null);
      fetch(`${import.meta.env.VITE_BACKEND_URL}/tours/search/${encodeURIComponent(query)}`, {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Search failed');
          return res.json();
        })
        .then((data) => {
          setResults(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Search error:', err);
          setError('Failed to load search results.');
          setLoading(false);
        });
    } else {
      setResults(null);
      setLoading(false);
    }
  }, [query, location.state]);

  return (
    <div className="results-page">
      <div className="results-search-section">
        <SearchBar initialQuery={query} />
      </div>
      <div className="results-container">
        {!query && !results ? (
          <div className="results-empty-state">
            <p>Search for equipment by campus, lab, or equipment name.</p>
            <button onClick={() => navigate('/')} className="results-browse-btn">
              Browse All Equipment
            </button>
          </div>
        ) : loading ? (
          <div className="results-loading">
            <i className="ri-loader-4-line ri-spin"></i>
            <p>Searching...</p>
          </div>
        ) : error ? (
          <div className="results-error">
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="results-browse-btn">
              Go to Home
            </button>
          </div>
        ) : results && results.length > 0 ? (
          <>
            <h2 className="results-heading">Search Results for &quot;{query}&quot;</h2>
            <p className="results-count">{results.length} equipment found</p>
            <div className="tour-results-grid">
              {results.map((tour) => (
                <Display
                  key={tour._id}
                  tour={tour}
                  showReviewButton={1}
                  showBookButton={1}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="results-no-results">
            <p>No equipment found for &quot;{query}&quot;.</p>
            <p className="results-hint">Try a different search term or browse all equipment.</p>
            <button onClick={() => navigate('/book')} className="results-browse-btn">
              Browse All Equipment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
