import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [token, setToken] = useState('');
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    if (token) {
      const res = await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch food list');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.get(url + '/api/cart/get-cart', { headers: { token } });
      setCartItems(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart data');
    }
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      await fetchFoodList();
    }
    loadData();
  }, []);

  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] === 1) {
        delete newCartItems[itemId];
      } else {
        newCartItems[itemId] -= 1;
      }
      return newCartItems;
    });
    if (token) {
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    if (loading) return 0; // Return 0 if still loading

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) { // Ensure itemInfo is found
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
