import React, { Component } from 'react';
import parse from 'html-react-parser';
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
import WithRouter from '../../utils/WithRouter';
import styles from './productDetails.module.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Imgindex: 0,
      img: '',
      gallery: [],
      attributes: [],
      prices: [],
      name: '',
      brand: '',
      id: '',
    };
  }

  async componentDidMount() {
    const data = await this.props.details(
      this.props.router.location.pathname.split('/')[2]
    );

    this.setState({
      img: data.payload.gallery[this.state.Imgindex],
      gallery: data.payload.gallery,
      attributes: data.payload.attributes,
      prices: data.payload.prices,
      id: data.payload.id,
      name: data.payload.name,
      brand: data.payload.brand,
    });
  }

  ChangeImg = (index) => {
    this.setState({ Imgindex: index });
  };

  render() {
    const error = this.props.ReduxStore.productDetails.error;
    const loading = this.props.ReduxStore.productDetails.loading;
    const details = this.props.ReduxStore.productDetails.productDetails;

    const colorIndex = this.props.ReduxStore.switcher.colorIndex;

    const sizeIndex = this.props.ReduxStore.switcher.sizeIndex;
    const capacityIndex = this.props.ReduxStore.switcher.capacityIndex;
    const usbIndex = this.props.ReduxStore.switcher.usbIndex;
    const touchIndex = this.props.ReduxStore.switcher.touchIndex;
    const CurrencyIndex = this.props.ReduxStore.switcher.currencyIndex;
    const id = this.state.id;
    const name = this.state.name;
    const brand = this.state.brand;
    const attributes = this.state.attributes;
    const img = this.state.img;

    const label = this.state.prices[CurrencyIndex]?.currency?.symbol;
    let price = label + ' ' + this.state.prices[CurrencyIndex]?.amount;

    return (
      <>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {details && (
          <div className={styles.container}>
            <div className={styles.flexLeft}>
              {this.state.gallery?.length > 1
                ? this.state.gallery?.map((img, i) => (
                    <div className={styles.thumbnail} key={i}>
                      <img
                        onClick={this.ChangeImg.bind(this, i)}
                        src={img}
                        alt='pi'
                      />
                    </div>
                  ))
                : ''}
            </div>

            <div className={styles.flexCenter}>
              <img
                src={this.state.gallery[this.state.Imgindex]}
                alt='img'
                className={styles.bigImg}
              />
            </div>
            <div className={styles.flexRight}>
              <h2 className={styles.brand}>{this.state.brand}</h2>
              <div className={styles.name}>{this.state.name}</div>
              {this.state.attributes?.length !== 0 &&
                this.state.attributes.map((attribute, i) => (
                  <div key={i}>
                    <h4 className={styles.name1}>{attribute.name}:</h4>
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
                              className={`${styles.ColorBtn} ${
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
                              className={`${styles.SizeBtn} ${
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

              <h2 className={styles.price}>PRICE:</h2>
              <div className={styles.symbol}>
                <h3>
                  <span>
                    {this.state.prices[CurrencyIndex]?.currency?.symbol}
                    {this.state.prices[CurrencyIndex]?.amount}
                  </span>
                </h3>
              </div>

              <button
                disabled={
                  !this.props.ReduxStore.productDetails.productDetails.inStock
                }
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
                {!this.props.ReduxStore.productDetails.productDetails.inStock
                  ? 'OUT OF STOCK'
                  : 'ADD TO CART'}
              </button>

              <div className={styles.desc}>
                {parse(
                  `${this.props?.ReduxStore?.productDetails?.productDetails?.description}`
                )}
              </div>
            </div>
          </div>
        )}
      </>
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

const details = WithRouter(ProductDetails);

export default connect(mapStateToProps, mapDispatchToProps)(details);
