import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementQty, incrementQty } from '../../features/cart/cartSlice';
import WithRouter from '../../utils/WithRouter';
import styles from './cartStyles.module.css';

class Cart extends Component {
  render() {
    return (
      <div className={styles.cartWrapper}>
        <h2 className={styles.cartHeading}>CART</h2>

        {this.props.ReduxStore.cart.CartItems.map((item, index) => (
          <div className={styles.cartItems} key={index}>
            <div className={styles.cardleft}>
              <div className={styles.ItemCover}>
                <h3 className={styles.brandy}>{item.brand}</h3>
                <p className={styles.brandyy}>{item.name}</p>
                <h3 className={styles.brandyy}>
                  {item.price.split(' ')[0].concat(item.price.split(' ')[1])}
                </h3>
              </div>

              {/* order left part */}
              {item.attributes.length > 0 &&
                item.attributes.map((attribute, i) => (
                  <div key={i}>
                    <h4 className={styles.Attr}>{attribute.name}:</h4>
                    <div>
                      <div className={styles.ColorTouchy}>
                        {attribute.name === 'Color' &&
                          attribute.items.map((u, c) => (
                            <div key={u.id}>
                              <button
                                className={`${styles.COLORCOVER} ${
                                  c === item.colorIndex ? styles.COLORXTRA : ''
                                }`}
                                style={{
                                  background: `${u.value}`,
                                }}
                              ></button>
                            </div>
                          ))}
                        {attribute.name === 'Size' &&
                          attribute.items.map((s, index) => (
                            <div className={styles.SizeTouchy} key={s.id}>
                              <button
                                className={`${styles.SIZECOVER} ${
                                  index === item.sizeIndex
                                    ? styles.SIZEXTRA
                                    : ''
                                }`}
                              >
                                {s.value}
                              </button>
                            </div>
                          ))}

                        {attribute.name === 'Capacity' &&
                          attribute.items.map((c, i) => (
                            <div className={styles.Wrapper} key={c.id}>
                              <button
                                className={`${styles.WrapperBTN} ${
                                  i === item.capacityIndex
                                    ? styles.WrapperBTNXtra
                                    : ''
                                }`}
                              >
                                {c.value}
                              </button>
                            </div>
                          ))}

                        {attribute.name === 'With USB 3 ports' &&
                          attribute.items.map((u, Uindex) => (
                            <div className={styles.Wrapper} key={u.id}>
                              <button
                                className={`${styles.WrapperBTN} ${
                                  Uindex === item.usbIndex
                                    ? styles.WrapperBTNXtra
                                    : ''
                                }`}
                              >
                                {u.value}
                              </button>
                            </div>
                          ))}

                        {attribute.name === 'Touch ID in keyboard' &&
                          attribute.items.map((t, Tindex) => (
                            <div className={styles.Wrapper} key={t.id}>
                              <button
                                className={`${styles.WrapperBTN} ${
                                  Tindex === item.touchIndex
                                    ? styles.WrapperBTNXtra
                                    : ''
                                }`}
                              >
                                {t.value}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.cardright}>
              <div className={styles.cardrightINNER}>
                <div className={styles.BtnCOVER}>
                  <div>
                    <button
                      onClick={() =>
                        this.props.incrementQty({ id: item.id, index })
                      }
                      className={styles.increBTN}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.QtyY}>{item.qty}</div>
                  <div>
                    <button
                      className={styles.decreBTN}
                      onClick={() =>
                        this.props.decrementQty({ id: item.id, index })
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className={styles.carouselCover}>
                  <div>
                    <div className={styles.carousel}>
                      <img src={item.img} alt='pi' id='img' />
                    </div>
                  </div>
                  {item.qty > 1 && (
                    <div className={styles.gtltCover}>
                      <button className={styles.lessThanBtn}>&lt;</button>
                      <button className={styles.greaterThanBtn}>&gt;</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* footer */}
        <div className={styles.cartFooter}>
          <div>
            <div className={styles.cartFooterContainer}>
              <p className={styles.para}>Tax 21%</p>
              <p className={styles.paraBold}>
                {
                  this.props.ReduxStore?.cart?.CartItems[0]?.price?.split(
                    ' '
                  )[0]
                }
                {this.props.ReduxStore?.cart?.CartItems.reduce(
                  (acc, item) =>
                    acc + item.price.split(' ')[1] * item.qty * 0.21,
                  0
                ).toFixed(2)}
              </p>
            </div>
            <div className={styles.cartFooterContainer}>
              <p className={styles.para}>Quantity:</p>
              <p className={styles.paraBold}>
                {this.props.ReduxStore?.cart?.CartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
              </p>
            </div>
            <div className={styles.cartFooterContainer}>
              <p className={styles.para}>Total:</p>
              <p className={styles.paraBold}>
                {
                  this.props.ReduxStore?.cart?.CartItems[0]?.price?.split(
                    ' '
                  )[0]
                }
                {this.props.ReduxStore?.cart?.CartItems.reduce(
                  (acc, item) => acc + item.price.split(' ')[1] * item.qty,
                  0
                ).toFixed(2)}
              </p>
            </div>

            <div>
              <button className={styles.order}>ORDER</button>
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
    incrementQty: (i) => dispatch(incrementQty(i)),
    decrementQty: (i) => dispatch(decrementQty(i)),
  };
};

const cart = WithRouter(Cart);

export default connect(mapStateToProps, mapDispatchToProps)(cart);
