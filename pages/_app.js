import '../styles/globals.css';

import { CartContext, useCartState } from '../hooks/useCart';

import Nav from '../components/Nav/Nav';

function MyApp({ Component, pageProps }) {
  const cart = useCartState();
  return (
    <CartContext.Provider value={cart}>
      <Nav />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
