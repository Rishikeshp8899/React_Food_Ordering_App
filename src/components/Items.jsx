import React, { useEffect, useState } from 'react';
import '../css/items.css';
import { Link } from 'react-router-dom';

export default function Items() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/richim/category')
      .then(response => response.json())
      .then(data => {
        console.log(data.success)
setCategories(data.success)})
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="row">
      <div className="column" style={{ margin: 0 }}>
        <div className="btn-group">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/cards/${category.name.toLowerCase().replace(/\s+/g, '')}`}
              style={{ textDecoration: 'none' }}
            >
              <button>{category.name.toUpperCase()}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
