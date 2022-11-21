import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './cardStyles.module.css';
import WithRouter from '../../utils/WithRouter';

import Svg from './Svg';

import { AddToCART } from '../../features/cart/cartSlice';

class Card extends Component {
  render() {
    const { name, brand, id, gallery, inStock, prices, attributes } =
      this.props;

    const {
      currencyIndex,
      colorIndex,
      sizeIndex,
      capacityIndex,
      usbIndex,
      touchIndex,
    } = this.props.ReduxStore.switcher;
    const img = gallery[0];
    const label = prices[currencyIndex]?.currency?.symbol;
    let price = label + ' ' + prices[currencyIndex]?.amount;

    return (
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

              this.props.addToCart({
                id,
                name,
                brand,
                price,
                img,
                attributes,
                colorIndex,
                sizeIndex,
                capacityIndex,
                usbIndex,
                touchIndex,
                comp: {
                  colorIndex,
                  sizeIndex,
                  capacityIndex,
                  usbIndex,
                  touchIndex,
                },
              });
            }}
          >
            <Svg />
          </div>
        </div>
        <div
          className={`${styles.cardFooter} ${!inStock ? styles.greyText : ''}`}
        >
          <p>
            {brand} {name}
          </p>
          <h3 className={styles.price}>
            <span>
              {prices[currencyIndex].currency.symbol}
              {prices[currencyIndex].amount}
            </span>
          </h3>
        </div>
        <div className={!inStock ? styles.outofStock : ''}></div>
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
    addToCart: (data) => dispatch(AddToCART(data)),
  };
};

const card = WithRouter(Card);

export default connect(mapStateToProps, mapDispatchToProps)(card);
