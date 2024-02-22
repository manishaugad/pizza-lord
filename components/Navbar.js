// Navbar.js
// Navbar.js

import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="/img/logo.png" alt="Logo" width={70} height={70} />
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link href="/" passHref>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/menu" passHref>
            Menu
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin" passHref>
            Admin
          </Link>
        </li>
        <li className={styles.navItem}>Blog</li>
       
      </ul>
      <div className={styles.contactContainer}>
       
            <Link href="/cart" passHref>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="Cart" width={30} height={30} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
