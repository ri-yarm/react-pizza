import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './PizzaFullPage.module.less';

const PizzaFullPage = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async function getOnePizza() {
      try {
        const { data } = await axios.get(
          `https://64799bb4a455e257fa636986.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert('ошибка при получении пицфы');
        navigate('/');
        console.log(error);
      }
    })();
  }, []);

  console.log(id);
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <img src={pizza?.imageUrl} alt="" />
        <div>
          <h2 className={styles.title}>{pizza?.title} </h2>

          <h3 className={styles.price}> Всего за {pizza?.price} ₽</h3>

          <p className={styles.desc}>
            Пастрами из мраморной говядины, сладкий перец, томаты, красный лук,
            чеснок, соус ткемали, моцарелла, фирменный томатный соус
          </p>
        </div>
      </div>
    </div>
  );
};

export default PizzaFullPage;
