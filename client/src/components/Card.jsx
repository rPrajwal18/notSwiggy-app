import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const Card = ({ image, title, cuisine, rating, delivery, restaurantId }) => {
  return (
    <Link to={`/restaurants/${restaurantId}`} className="card-links-none">
      <div className="card ">
        <div className="card-icon">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${image}`}
            alt={title}
            className="card-icon-img"
          />
        </div>
        <div className="card-items">
          <h4 className="card-title">{title}</h4>
          <p className="card-cuisine" >{cuisine}</p>
          <p>{rating} ⭐</p>
          <p>{delivery} mins</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
