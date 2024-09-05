import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShimmerUI from './ShimmerUI';
import Card from './Card';

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://notswiggy-app.onrender.com/api/restaurants`, {
        params: {
          lat: '12.96340',
          lng: '77.58550',
          page_type: 'DESKTOP_WEB_LISTING'
        }
      });

      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON, but received HTML');
      }

      const json = response.data;
      setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  }

  const handleSearch = () => {
    const filteredData = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRestaurant(filteredData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return listOfRestaurant.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="search">
        <input
          className="search-bar"
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      <div className="body">
          <div className="rest-cards">
            {filteredRestaurant.map((restaurant) => (
              <Link to={`/restaurants/${restaurant.info.id}`} key={restaurant.info.id} className='card-link'>
              <Card
                restaurantId={restaurant.info.id}
                image={restaurant.info.cloudinaryImageId}
                title={restaurant.info.name}
                cuisine={restaurant.info.cuisines.join(', ')}
                rating={restaurant.info.avgRating}
                delivery={restaurant.info.sla.deliveryTime}
              />
            </Link>
            ))}
          </div>
        </div>
        <footer className="footer">
            Developed by Prajwal R 🚀
        </footer>
    </div>
    
  );
};

export default Body;