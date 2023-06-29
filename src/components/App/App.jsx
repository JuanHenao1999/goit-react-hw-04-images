import { useState, useEffect } from 'react';
import style from './App.module.css';
import api from "../../services/api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (data) => {
    if (searchQuery === data) {
      return;
    }
    resetState();
    setSearchQuery(data);
  };

  const resetState = () => {
    setSearchQuery('');
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const imagesData = await api.fetchImageWithQuery(searchQuery, page);
        const imagesHits = imagesData.hits;

        if (!imagesHits.length) {
          Notify.warning(
            'No results were found for your search, please try something else.'
          );
        }

        setImages((prevImages) => [...prevImages, ...imagesHits]);

        if (page > 1) {
          const CARD_HEIGHT = 300; // preview image height
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        Notify.failure(`Sorry something went wrong. ${error.message}`);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery && page) {
      fetchData();
    }
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={style['app']}>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length !== 0 && <Button onClick={loadMore} />}
    </div>
  );
};

export default App;