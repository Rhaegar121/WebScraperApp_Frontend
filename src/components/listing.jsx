import { useState } from 'react';
import Form from './form';
import { urlsByCategory } from "../index.js"

const Listing = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  };

  return (
    <div>
      <h1>List of Scraped URLs by Category</h1>
      <div>
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {urlsByCategory.map(category => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Scraped URLs for {selectedCategory}</h2>
        <ul>
          {selectedCategory && urlsByCategory.find(category => category.name === selectedCategory).urls.map(url => (
            <li key={url}>
            {url}
            <button onClick={() => copyToClipboard(url)}>Copy Text</button>
          </li>
          ))}
        </ul>
      </div>

      <Form name={selectedCategory} />
    </div>
  )
}

export default Listing