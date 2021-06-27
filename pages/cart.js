import Head from 'next/head';
import styles from '../styles/Cart.module.css';
import { useCart } from '../hooks/useCart';
import products from '../products.json';

import Table from '../components/Table/Table';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name',
  },
  {
    columnId: 'quantity',
    Header: 'Quantity',
  },
  {
    columnId: 'pricePerUnit',
    Header: 'Price Per Item',
  },
  {
    columnId: 'total',
    Header: 'Item Total',
  },
];

const Home = () => {
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map(item => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      const handleSubmit = e => {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(
          input => input.name === 'quantity'
        )?.valueAsNumber;

        updateItem({
          id: item.id,
          quantity,
        });

        console.log(`submit`, quantity);
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
          />
          <button type="submit">Update</button>
        </form>
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      total: item.quantity * item.pricePerItem,
      title: product.title,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cart</h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
