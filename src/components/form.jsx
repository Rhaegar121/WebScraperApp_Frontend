import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';

const Form = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const category = useSelector(state => state.product.categories);
  const product = useSelector(state => state.product.products);
  const img = useSelector(state => state.product.images);
  console.log('category', category);
  console.log('product', product);
  console.log('img', img);
  const isLoading = useSelector(state => state.product.isLoading);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetchClick = () => {
    if (url.trim() !== '') {
      console.log('Sending request...');
      setTimeout(() => {
        dispatch(fetchProducts({ url: url, categoryName: 'LG' }));
        console.log('Request sent!'); 
      }, 3000);
    }
  };

  return (
    <div>
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
      <div>
        <div>
          <img src={img} alt={category.name} />
        </div>
        <div>
          <h2>Category: {category.name}</h2>
          <h3>Title: {product.title}</h3>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Model_year: {product.model_year}</p>
          <p>Size: {product.size}</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
