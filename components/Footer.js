import React from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            &quot;Slice into Happiness: Where Every Bite is a Celebration! This
            is PizzaLord&quot; 🍕✨
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>
            <b>FIND OUR RESTAURANTS</b>
          </h1>
          <p className={styles.text}>
            1234 ABC Street, <br />
            Mumbai, 400001 <br />
            Phone: +91 123 456 7890
          </p>
          <p className={styles.text}>
            5678 XYZ Road, <br />
            Delhi, 110001 <br />
            Phone: +91 987 654 3210
          </p>
          <p className={styles.text}>
            91011 PQR Lane, <br />
            Bangalore, 560001 <br />
            Phone: +91 789 012 3456
          </p>
          <p className={styles.text}>
            1213 LMN Street, <br />
            Kolkata, 700001 <br />
            Phone: +91 345 678 9012
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY TO FRIDAY
            <br /> 09:00 AM – 10:00 PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 PM – 12:00 AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
