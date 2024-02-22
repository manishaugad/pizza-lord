import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> 🍕THE BEST PIZZA IN TOWN 🍕</h1>
      <p className={styles.desc}>
        Are
        you ready to elevate your taste buds to a whole new level? Look no
        further – our mouthwatering pizzas are here to deliver an unforgettable
        dining experience!
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;

