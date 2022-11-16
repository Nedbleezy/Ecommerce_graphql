import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementQty, incrementQty } from '../../features/cart/cartSlice';
import withRouter from '../../utils/WithRouter';
import styles from './modal.module.css';

class Modal extends Component {
  render() {
    return (
      <div className={styles.modalWrapper} id='modal'>
        <div className={styles.minicart} id='minicart'>
          <div className={styles.cardBox}>
            <h5 className={styles.title}>
              My Bag{' '}
              <span>
                {this.props.ReduxStore?.cart?.CartItems?.length} items
              </span>{' '}
            </h5>
            {this.props.ReduxStore.cart.CartItems.map((item, index) => (
              <div className={styles.myItems} key={index}>
                <div className={styles.cardItemLeft}>
                  <div className={styles.LeftInnerDiv}>
                    <h3 className={styles.brand}>{item.brand}</h3>
                    <p className={styles.name}>{item.name}</p>
                    <h3 className={styles.price}>{item.price}</h3>
                  </div>
                  {item.attributes.length > 0 &&
                    item.attributes.map((attribute, i) => (
                      <div key={i}>
                        <h4 className={styles.name}>{attribute.name}</h4>
                        <div>
                          <div className={styles.colorCover}>
                            {attribute.name === 'Color' &&
                              attribute.items.map((u, c) => (
                                <div key={u.id}>
                                  <button
                                    className={`${styles.ColorBTN} ${
                                      c === item.colorIndex
                                        ? styles.ColorXtra
                                        : ''
                                    }`}
                                    style={{ background: `${u.value}` }}
                                  ></button>
                                </div>
                              ))}
                            {attribute.name === 'Size' &&
                              attribute.items.map((s, index) => (
                                <div className={styles.sizeCover} key={s.id}>
                                  <button
                                    className={`${styles.SizeBTN} ${
                                      index === item.sizeIndex
                                        ? styles.SizeXtra
                                        : ''
                                    }`}
                                  >
                                    {s.value}
                                  </button>
                                </div>
                              ))}

                            {attribute.name === 'Capacity' &&
                              attribute.items.map((c, i) => (
                                <div className={styles.sizeCover} key={c.id}>
                                  <button
                                    className={`${styles.touchBtn} ${
                                      i === item.capacityIndex
                                        ? styles.touchXtra
                                        : ''
                                    }`}
                                  >
                                    {c.value}
                                  </button>
                                </div>
                              ))}

                            {attribute.name === 'With USB 3 ports' &&
                              attribute.items.map((u, Uindex) => (
                                <div className={styles.sizeCover} key={u.id}>
                                  <button
                                    className={`${styles.touchBtn} ${
                                      Uindex === item.usbIndex
                                        ? styles.touchXtra
                                        : ''
                                    }`}
                                  >
                                    {u.value}
                                  </button>
                                </div>
                              ))}

                            {attribute.name === 'Touch ID in keyboard' &&
                              attribute.items.map((t, Tindex) => (
                                <div className={styles.sizeCover} key={t.id}>
                                  <button
                                    className={`${styles.touchBtn} ${
                                      Tindex === item.touchIndex
                                        ? styles.touchXtra
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
                <div className={styles.cardItemRight}>
                  <div className={styles.btnCoverRR}>
                    <div className={styles.btnCoverR}>
                      <div>
                        <button
                          onClick={() =>
                            this.props.incrementQty({
                              id: item.id,
                              index,
                            })
                          }
                          className={styles.btnQty}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.QTY}>{item.qty}</div>
                      <div>
                        {' '}
                        <button
                          onClick={() =>
                            this.props.decrementQty({
                              id: item.id,
                              index,
                            })
                          }
                          className={styles.btnQty}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className={styles.IMGW}>
                      <img src={item.img} alt='pi' className={styles.miniIMG} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.footerWrapper}>
            <div style={{ padding: '10px' }}>
              <div className={styles.totalWrapper}>
                <h4>Total</h4>
                <h4>
                  {
                    this.props.ReduxStore?.cart?.CartItems[0]?.price?.split(
                      ' '
                    )[0]
                  }{' '}
                  {this.props.ReduxStore?.cart?.CartItems.reduce(
                    (acc, item) => acc + item.price.split(' ')[1] * item.qty,
                    0
                  ).toFixed(2)}
                </h4>
              </div>
              <div className={styles.viewCheckCover}>
                <div>
                  <Link to='/cart'>
                    <button className={styles.viewBtn} id='vue'>
                      VIEW BAG
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to='/checkout'>
                    <button className={styles.checkoutBtn} id='hire'>
                      CHECK OUT
                    </button>
                  </Link>
                </div>
              </div>
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
    decrementQty: (i) => dispatch(decrementQty(i)),
    incrementQty: (i) => dispatch(incrementQty(i)),
  };
};

const modal = withRouter(Modal);

export default connect(mapStateToProps, mapDispatchToProps)(modal);
