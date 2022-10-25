import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './cardStyles.module.css';
import WithRouter from '../../utils/WithRouter';
import { AddToCART } from '../../features/cart/cartSlice';

class Card extends Component {
  render() {
    const { name, brand, id, attributes, gallery, inStock, prices } =
      this.props;

    const {
      capacityIndex,
      colorIndex,
      currencyIndex,
      sizeIndex,
      touchIndex,
      usbIndex,
    } = this.props.ReduxStore.switcher;

    const label = prices[currencyIndex]?.currency.symbol;
    const price = label + ' ' + prices[currencyIndex]?.amount;
    const img = this.props.gallery[0];

    const selectedAttr = attributes.map((item) => {
      return {
        name: item.name,
        value:
          item.name === 'Color'
            ? item?.items[colorIndex].value
            : item.name === 'Size'
            ? item?.items[sizeIndex].value
            : item.name === 'Capacity'
            ? item?.items[capacityIndex].value
            : item.name === 'With USB 3 ports'
            ? item?.items[usbIndex].value
            : item.name === 'Touch ID in keyboard'
            ? item?.items[touchIndex].value
            : '',
      };
    });

    return (
      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img
            src={gallery[0]}
            alt={brand}
            className={styles.productImg}
            onClick={() => this.props.router.navigate(`/product/${id}`)}
          />
          <div
            className={styles.svgWrapper}
            onClick={() =>
              this.props.addToCart({
                id,
                name,
                brand,
                selectedAttr,
                price,
                img,
                attributes,
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              fill='currentColor'
              className='bi bi-cart'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
            </svg>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <p>
            {brand} {name}
          </p>
          <h5 className={styles.price}>
            {prices[currencyIndex].currency.symbol}{' '}
            {prices[currencyIndex].amount}
          </h5>
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
