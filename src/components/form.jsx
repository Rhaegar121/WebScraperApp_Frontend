import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';

const Form = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const isLoading = useSelector(state => state.product.isLoading);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetchClick = () => {
    if (url.trim() !== '') {
      console.log('Sending request...');
      setTimeout(() => {
        dispatch(fetchProducts({ url: url, categoryName: 'Lenovo' }));
        console.log('Request sent!'); 
      }, 3000);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL to scrape the data"
      />
      <button
        type="button"
        onClick={handleFetchClick}
        disabled={false}
      >
        {isLoading ? 'Fetching...' : 'Fetch'}
      </button>
    </div>
  );
};

export default Form;
