import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './cardStyles.module.css';
import WithRouter from '../../utils/WithRouter';

import Svg from './Svg';

import { changeID } from '../../features/quickshop/quickShopSlice';
import QuickAdd from './QuickAdd';

class Card extends Component {
  OpenQuickAddToCart = () => {
    const modal = document.getElementById('quickAdd');
    modal.classList.add('quickAdd');
  };
  render() {
    const { name, brand, id, gallery, inStock, prices } = this.props;

    const { currencyIndex } = this.props.ReduxStore.switcher;

    return (
      <div>
        <QuickAdd />
        <div
          className={styles.card}
          onClick={(e) => {
            e.stopPropagation();
            this.props.router.navigate(`/product/${id}`);
          }}
        >
          <div className={styles.imgWrapper}>
            <img
              src={gallery[0]}
              alt={brand}
              className={`${styles.productImg} ${
                !inStock ? styles.productOutofStock : ''
              }`}
            />
            <div
              className={styles.svgWrapper}
              onClick={(e) => {
                e.stopPropagation();

                this.OpenQuickAddToCart({ id });
                this.props.quickShop(id);
              }}
            >
              <Svg />
            </div>
          </div>
          <div
            className={`${styles.cardFooter} ${
              !inStock ? styles.greyText : ''
            }`}
          >
            <p>
              {brand} {name}
            </p>
            <h3 className={styles.price}>
              {prices[currencyIndex].currency.symbol}{' '}
              {prices[currencyIndex].amount}
            </h3>
          </div>
          <div className={!inStock ? styles.outofStock : ''}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ReduxStore: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    quickShop: (id) => dispatch(changeID(id)),
  };
};

const card = WithRouter(Card);

export default connect(mapStateToProps, mapDispatchToProps)(card);
