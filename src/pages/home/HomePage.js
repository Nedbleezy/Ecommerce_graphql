import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './homeStyles.module.css';

class HomePage extends Component {
  render() {
    return (
      <main className={styles.container}>
        <Outlet />
      </main>
    );
  }
}

export default HomePage;
