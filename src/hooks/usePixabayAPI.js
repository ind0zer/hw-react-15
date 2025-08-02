import { useEffect, useMemo } from 'react';

const API_KEY = '48387831-a27bd27e818d37c055dee1b6c';
const PER_PAGE = 12;

export const usePixabayAPI = ({ query, page, onImagesLoaded, setLoading }) => {
  const apiUrl = useMemo(() => {
    if (!query) return '';
    return `https://pixabay.com/api/?q=${encodeURIComponent(query)}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  }, [query, page]);

  useEffect(() => {
    if (!apiUrl) return;
    
    setLoading(true);
    
    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.hits) {
          onImagesLoaded(data.hits, page);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiUrl, page, onImagesLoaded, setLoading]);

  return { apiUrl };
}; 