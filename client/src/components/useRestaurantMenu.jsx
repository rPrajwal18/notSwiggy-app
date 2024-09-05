import { useEffect, useState } from 'react';
import axios from 'axios';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://notswiggy-app.onrender.com/api/menu`, {
        params: {
          'page-type': 'REGULAR_MENU',
          'complete-menu': true,
          lat: '12.96340',
          lng: '77.58550',
          submitAction: 'ENTER',
          restaurantId: resId,
        }
      });

      setResInfo(response.data?.data);
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
