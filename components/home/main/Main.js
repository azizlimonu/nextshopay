import React from 'react';
import styles from './main.module.scss';
import Header from './Header';
import Menu from './Menu';
import MainSwiper from './MainSwiper';
import Offers from './Offers';
import User from './User';

const Main = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  )
}

export default Main;