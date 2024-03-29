import React from "react";
import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";
const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dok2bazmu/image/upload",
        data
      );
      console.log(uploadRes.data);

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
      console.log(uploadRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          &quot;X&quot;
        </span>

        <h1 className={styles.pizzaTitle} style={{ color: "black" }}>
          &quot;Add a new Pizza&quot;
        </h1>

        <div className={styles.item}>
          <label className={styles.label} style={{ color: "black" }}>
            &quot;Choose an image &quot;
          </label>
          <input
            className={styles.label1}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} style={{ color: "black" }}>
            &apos; Title &apos;
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Name of pizza"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <textarea
            className={styles.desc}
            rows={4}
            type="text"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} style={{ color: "black" }}>
        
          </label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
         
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
