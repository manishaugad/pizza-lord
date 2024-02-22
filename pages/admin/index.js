import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import AddButton from "@/components/AddButton";
import Add from "@/components/Add";
const Index = ({ orders, products, admin }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const status = ["Preparing", "On the way", "Delivered"];
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log("Error deleting product:", err);
      // Handle error gracefully (e.g., display error message)
    }
  };
  
  const handleStatus = async (id) => {
    try {
      const item = orderList.find((order) => order._id === id);
      if (!item) {
        console.log("Order not found");
        return;
      }
      const currentStatus = item.status;
      const res = await axios.put(`/api/orders/${id}`, { status: currentStatus + 1 });
      setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log("Error updating order status:", err);
      // Handle error gracefully (e.g., display error message)
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h2>
          🍕Crafting Moments, One Slice at a Time: Where Your Pizza Journey
          Begins!🍕
        </h2>
        <br></br>
        <div style={{ 
  color: 'white', 
  backgroundColor: 'red', 
  border: '3px solid goldenrod', 
  borderRadius: '50px',
  fontWeight: 'bold', // Set font weight to bold
  padding: '10px', // Add padding
  width: '200pxpx', // Increase width
  height: '50px' // Increase height
}}>
          {admin && <AddButton setClose={setClose} />}
          {!close && <Add setClose={setClose} />}
        </div>
      </div>

      <br></br>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  {" "}
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                  <div className={styles.trs}></div>
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  {" "}
                  <button
                    className={styles.button2}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>
                  {order._id.slice(0, 5)}...
                  <div className={styles.trs}></div>
                </td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td className="payment-column">
                  {order.method === 0 ? <span>Cash</span> : <span>paid</span>}
                </td>

                <td>{status[order.status]}</td>
                <td>
                  {" "}
                  <button
                    className={styles.button1}
                    onClick={() => handleStatus(order._id)}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      admin,
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};
export default Index;
