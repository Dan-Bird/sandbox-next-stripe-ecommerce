import Link from 'next/link';
import styles from './Nav.module.css';
import { useCart } from '../../hooks/useCart';

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>£{subtotal}</a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
