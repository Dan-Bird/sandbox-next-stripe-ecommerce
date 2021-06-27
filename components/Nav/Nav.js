import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <button type="button">$0.00</button>
      </p>
    </nav>
  );
};

export default Nav;
