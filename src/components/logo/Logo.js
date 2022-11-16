import React, { Component } from 'react';
import styles from './logoStyles.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={styles.logo}>
        <svg
          className={styles.base}
          width='100'
          height='50'
          viewBox='0 0 33 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M32.0988 28.6014C32.1313 28.9985 31.8211 29.339 31.4268 29.339H1.59438C1.2009 29.339 0.890922 29.0002 0.922082 28.6037L3.06376 1.34718C3.09168 0.992702 3.38426 0.719727 3.73606 0.719727H29.1958C29.5468 0.719727 29.8391 0.991612 29.868 1.34499L32.0988 28.6014Z'
            fill='url(#paint0_linear_150_1237)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_150_1237'
              x1='25.8733'
              y1='25.3337'
              x2='7.51325'
              y2='3.9008'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#52D67A' />
              <stop offset='1' stopColor='#5AEE87' />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width='30'
          height='46'
          viewBox='0 0 15 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.curve}
        >
          <path
            d='M7.92324 9.69529C4.04024 9.69529 0.881348 5.86314 0.881348 1.15278C0.881348 0.90747 1.07815 0.708496 1.32109 0.708496C1.56403 0.708496 1.76084 0.907334 1.76084 1.15278C1.76084 5.3732 4.52531 8.80672 7.92337 8.80672C11.3214 8.80672 14.0859 5.3732 14.0859 1.15278C14.0859 0.90747 14.2827 0.708496 14.5257 0.708496C14.7686 0.708496 14.9654 0.907334 14.9654 1.15278C14.9653 5.86314 11.8062 9.69529 7.92324 9.69529Z'
            fill='white'
          />
        </svg>
        <svg
          width='12'
          height='20'
          viewBox='0 0 7 5'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.arrow}
        >
          <path
            d='M1.25807 4.03371C1.14557 4.03371 1.03307 3.99037 0.947147 3.90356C0.77543 3.73007 0.77543 3.44878 0.947147 3.2753L3.22601 0.972924C3.30843 0.889655 3.42025 0.842773 3.53693 0.842773C3.65362 0.842773 3.76544 0.889519 3.84786 0.972924L6.10446 3.25295C6.27618 3.42643 6.27618 3.70772 6.10446 3.88121C5.93275 4.05456 5.65433 4.0547 5.48261 3.88121L3.5368 1.91546L1.569 3.90356C1.48307 3.99037 1.37057 4.03371 1.25807 4.03371Z'
            fill='white'
          />
        </svg>
      </div>
    );
  }
}

export default Logo;
