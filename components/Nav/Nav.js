import styles from './Nav.module.css';
import { useCart } from '../../hooks/useCart';

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <button type="button" onClick={checkout}>
          £{subtotal}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
