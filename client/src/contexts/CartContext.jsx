import { createContext, useContext, useReducer, useEffect } from 'react';

// Cart action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_CART: 'SET_CART'
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter(item => item._id !== itemId)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item._id === itemId ? { ...item, quantity } : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload || []
      };
    }

    case CART_ACTIONS.SET_CART: {
      return {
        ...state,
        items: action.payload
      };
    }

    default:
      return state;
  }
};

// Calculate cart totals
const calculateCartTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return { totalItems, totalPrice };
};

// Local storage key
const CART_STORAGE_KEY = 'mahalaxmi_cart';

// Initial cart state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartState.items]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    console.log('CartContext: Adding product to cart:', product, 'quantity:', quantity);
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { ...product, quantity }
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: itemId
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setCart = (items) => {
    dispatch({ type: CART_ACTIONS.SET_CART, payload: items });
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartState.items.some(item => item._id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  // Calculate totals dynamically
  const { totalItems, totalPrice } = calculateCartTotals(cartState.items);

  // Cart context value
  const cartContextValue = {
    items: cartState.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCart,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
