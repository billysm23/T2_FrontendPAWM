import React from 'react';
import Features from '../components/Features';
import Hero from '../components/Hero';
import styles from '../styles/Hero.module.css';

const Home = () => {
  return (
    <main className={styles.home}>
      <Hero />
      <Features />
    </main>
  );
};

export default Home;