import { useState, useEffect, createContext, useContext } from 'react';
import { initiateCheckout } from '../lib/payments';
import products from '../products.json';

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('spacejelly_cart');
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('spacejelly_cart', data);
  }, [cart]);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
    return acc + pricePerItem * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  const addToCart = ({ id } = {}) => {
    updateCart(prev => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  };

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map(item => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
  };

  return {
    cart,
    updateCart,
    subtotal,
    totalItems,
    addToCart,
    checkout,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
