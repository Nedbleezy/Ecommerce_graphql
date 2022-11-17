import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddToCART } from '../../features/cart/cartSlice';
import { getproductDetails } from '../../features/productDetails/productDetails';
import {
  changeCapacity,
  changeColor,
  changeSize,
  changeTouch,
  changeUsb,
} from '../../features/switcher/switcherSlice';

import withRouter from '../../utils/WithRouter';
import styles from './quick.module.css';

class QuickAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    window.addEventListener('click', this.CloseQuickoutsideClick);
    if (this.props.ReduxStore.quickshopID.id !== null) {
      const data = await this.props.details(
        this.props.ReduxStore.quickshopID.id
      );

      this.setState({ data: data.payload });
    }
  }
  async componentDidUpdate(prevProps) {
    if (
      this.props.ReduxStore.quickshopID.id !==
      prevProps.ReduxStore.quickshopID.id
    ) {
      const data = await this.props.details(
        this.props.ReduxStore.quickshopID.id
      );
      this.setState({ data: data.payload });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.CloseQuickoutsideClick);
  }

  CloseQuickoutsideClick = (e) => {
    const modal = document.getElementById('quickAdd');

    if (e.target === modal) {
      modal.classList.remove('quickAdd');
    }
  };
  render() {
    const {
      capacityIndex,
      colorIndex,
      currencyIndex,
      sizeIndex,
      touchIndex,
      usbIndex,
    } = this.props.ReduxStore.switcher;

    const id = this.state.data && this.state.data.id;
    const name = this.state.data && this.state.data.name;
    const brand = this.state.data && this.state.data.brand;
    const attributes = this.state.data && this.state.data.attributes;
    const img = this.state.data && this.state.data.gallery[0];
    const label =
      this.state.data && this.state.data.prices[currencyIndex].currency.symbol;
    let price =
      this.state.data &&
      label + ' ' + this.state.data.prices[currencyIndex].amount;

    return (
      <div className={styles.modalWrapper} id='quickAdd'>
        <div className={styles.inner}>
          <div className={styles.imgCovered}>
            <img
              src={this.state.data && this.state.data.gallery[0]}
              alt={brand}
              className={styles.img}
            />
          </div>
          <div className='quickRight'>
            <h1 className={styles.brand}>{brand}</h1>
            <h2 className={styles.name}>{name}</h2>

            <h3 className={styles.price}>Price</h3>
            <h3>
              {this.state.data &&
                this.state.data.prices[currencyIndex].currency.symbol}
              {this.state.data && this.state.data.prices[currencyIndex].amount}
            </h3>
            {this.state.data &&
              this.state.data.attributes.map((attribute, i) => (
                <div key={i} style={{ marginTop: 19 }}>
                  <h4 className={styles.name}>{attribute.name}</h4>
                  <div className={styles.touchCover}>
                    {attribute.name === 'Color' &&
                      attribute.items.map((u, c) => (
                        <div key={u.id}>
                          <button
                            disabled={
                              !this.props.ReduxStore.productDetails
                                .productDetails.inStock
                            }
                            style={{ background: `${u.value}` }}
                            onClick={() => {
                              this.props.changeColor(c);
                            }}
                            className={`${styles.SizeColorBtn} ${
                              c === colorIndex ? styles.ColorXtra : ''
                            }`}
                          ></button>
                        </div>
                      ))}
                    {attribute.name === 'Size' &&
                      attribute.items.map((s, index) => (
                        <div className={styles.touchCover} key={s.id}>
                          <button
                            disabled={
                              !this.props.ReduxStore.productDetails
                                .productDetails.inStock
                            }
                            onClick={() => {
                              this.props.changeSize(index);
                            }}
                            className={`${styles.SizeColorBtn} ${
                              index === sizeIndex ? styles.SizeColorXtra : ''
                            }`}
                          >
                            {s.value}
                          </button>
                        </div>
                      ))}

                    {attribute.name === 'Capacity' &&
                      attribute.items.map((c, i) => (
                        <div className={styles.touchCover} key={c.id}>
                          <button
                            disabled={
                              !this.props.ReduxStore.productDetails
                                .productDetails.inStock
                            }
                            onClick={() => {
                              this.props.changeCapcity(i);
                            }}
                            className={`${styles.touchBtn} ${
                              i === capacityIndex ? styles.touchXtra : ''
                            }`}
                          >
                            {c.value}
                          </button>
                        </div>
                      ))}

                    {attribute.name === 'With USB 3 ports' &&
                      attribute.items.map((u, Uindex) => (
                        <div className={styles.touchCover} key={u.id}>
                          <button
                            disabled={
                              !this.props.ReduxStore.productDetails
                                .productDetails.inStock
                            }
                            onClick={() => {
                              this.props.changeUsb(Uindex);
                            }}
                            className={`${styles.touchBtn} ${
                              Uindex === usbIndex ? styles.touchXtra : ''
                            }`}
                          >
                            {u.value}
                          </button>
                        </div>
                      ))}

                    {attribute.name === 'Touch ID in keyboard' &&
                      attribute.items.map((t, Tindex) => (
                        <div className={styles.touchCover} key={t.id}>
                          <button
                            disabled={
                              !this.props.ReduxStore.productDetails
                                .productDetails.inStock
                            }
                            onClick={() => {
                              this.props.changeTouch(Tindex);
                            }}
                            className={`${styles.touchBtn} ${
                              Tindex === touchIndex ? styles.touchXtra : ''
                            }`}
                          >
                            {t.value}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            <div className='btn'>
              <button
                className={styles.addToCartBtn}
                onClick={() => {
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
                Add to cart
              </button>
            </div>
          </div>
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
    addToCart: (data) => dispatch(AddToCART(data)),
    details: (id) => dispatch(getproductDetails(id)),

    changeColor: (id) => dispatch(changeColor(id)),
    changeTouch: (id) => dispatch(changeTouch(id)),
    changeUsb: (id) => dispatch(changeUsb(id)),
    changeCapcity: (id) => dispatch(changeCapacity(id)),
    changeSize: (id) => dispatch(changeSize(id)),
  };
};

const quick = withRouter(QuickAdd);

export default connect(mapStateToProps, mapDispatchToProps)(quick);
