import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import React from 'react'

const Menu = ({ pizzaList }) => {
  return (
    <>
      <PizzaList pizzaList={pizzaList} />
    </>
  )
}

export default Menu;

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    return {
      props: {
        pizzaList: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching pizza list:", error);
    return {
      props: {
        pizzaList: [],
      },
    };
  }
};
