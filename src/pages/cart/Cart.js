import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementQty, incrementQty } from '../../features/cart/cartSlice';
import WithRouter from '../../utils/WithRouter';
import styles from './cartStyles.module.css';

class Cart extends Component {
  render() {
    return (
      <div style={{ paddingBottom: '2rem' }}>
        <h2 className={styles.cartHeading}>CART</h2>

        {this.props.ReduxStore.cart.CartItems.map((item, index) => (
          <div className={styles.cartItems} key={index}>
            <div className={styles.cardleft}>
              <div>
                <div
                  style={{
                    color: 'var(--offWhite)',
                    paddingBottom: '0.2rem',
                    fontSize: '0.8rem',
                  }}
                >
                  <h3 style={{ paddingBottom: '10px', fontSize: '18px' }}>
                    {item.brand}
                  </h3>
                  <p style={{ fontSize: '18px', paddingBottom: '10px' }}>
                    {item.name}
                  </p>
                  <h3 style={{ paddingBottom: '10px', fontSize: '18px' }}>
                    {item.price}
                  </h3>
                </div>
              </div>

              {item.selectedAttr.length > 0 &&
                item.selectedAttr.map((attribute, i) => (
                  <div key={i}>
                    <h4>{attribute.name}</h4>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 5,
                        }}
                      >
                        {attribute.name === 'Color' && (
                          <div>
                            <button
                              style={{
                                border: '1px solid #1D1F22',
                                textAlign: 'center',
                                paddingTop: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                marginBottom: 5,
                                background: `${attribute.value}`,
                                width: `${
                                  attribute.name === 'Size' ||
                                  attribute.name === 'Color'
                                    ? '20px'
                                    : ''
                                }`,
                                height: `${
                                  attribute.name === 'Size' ||
                                  attribute.name === 'Color'
                                    ? '20px'
                                    : ''
                                }`,
                              }}
                            ></button>
                          </div>
                        )}

                        {attribute.name === 'Size' && (
                          <div>
                            <button
                              style={{
                                border: '1px solid #1D1F22',
                                textAlign: 'center',
                                paddingTop: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                marginBottom: 5,
                                background: 'var(--green)',
                                color: '#fff',
                                width: `${
                                  attribute.name === 'Size' ||
                                  attribute.name === 'Color'
                                    ? '20px'
                                    : ''
                                }`,
                                height: `${
                                  attribute.name === 'Size' ||
                                  attribute.name === 'Color'
                                    ? '20px'
                                    : ''
                                }`,
                              }}
                            >
                              {' '}
                              {attribute.value}
                            </button>
                          </div>
                        )}

                        {attribute.name === 'Capacity' && (
                          <div>
                            <button
                              style={{
                                border: '0.5px solid  #1D1F22',
                                textAlign: 'center',
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                marginBottom: 5,
                                background: 'var(--green)',
                                color: '#fff',
                              }}
                            >
                              {' '}
                              {attribute.value}
                            </button>
                          </div>
                        )}

                        {attribute.name === 'With USB 3 ports' && (
                          <div>
                            <button
                              style={{
                                border: '0.5px solid  #1D1F22',
                                textAlign: 'center',
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                marginBottom: 5,
                                background: 'var(--green)',
                                color: '#fff',
                              }}
                            >
                              {' '}
                              {attribute.value}
                            </button>
                          </div>
                        )}

                        {attribute.name === 'Touch ID in keyboard' && (
                          <div>
                            <button
                              style={{
                                border: '0.5px solid  #1D1F22',
                                textAlign: 'center',
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                marginBottom: 5,
                                background: 'var(--green)',
                                color: '#fff',
                              }}
                            >
                              {attribute.value}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.cardright}>
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginRight: 2,
                  }}
                >
                  <div>
                    <button
                      onClick={() =>
                        this.props.incrementQty({ id: item.id, index })
                      }
                      style={{
                        fontSize: '30px',
                        padding: '5px 15px',
                        cursor: 'pointer',
                        background: '#fff',
                        border: '1px solid black',
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{
                      fontSize: '18px',
                      padding: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.qty}
                  </div>
                  <div>
                    {' '}
                    <button
                      onClick={() =>
                        this.props.decrementQty({ id: item.id, index })
                      }
                      style={{
                        fontSize: '30px',
                        padding: '5px 15px',
                        cursor: 'pointer',
                        background: '#fff',
                        border: '1px solid black',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div style={{ position: 'relative', marginLeft: '20px' }}>
                  <div className={styles.carousel}>
                    {[...Array(item.qty).keys()].map((x, index) => (
                      <img
                        key={index}
                        src={item.img}
                        alt='pi'
                        style={{ width: '100%', objectFit: 'cover' }}
                      />
                    ))}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                    }}
                  >
                    <button
                      onClick={() => console.log(item.id)}
                      style={{
                        marginRight: '8px',
                        background: 'black',
                        color: '#fff',
                        padding: '0 5px',
                        cursor: 'pointer',
                      }}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => console.log(item.id)}
                      style={{
                        background: 'black',
                        color: '#fff',
                        padding: '0 5px',
                        cursor: 'pointer',
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* footer */}
        <div
          style={{
            borderTop: '1.7px solid var(--offW)',
          }}
        >
          <div
            style={{
              width: '25%',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginTop: '10px',
              }}
            >
              <p style={{ width: '90px', fontSize: '18px' }}>Tax 21%</p>
              <p style={{ fontWeight: 'bold' }}>$50.00</p>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '10px',
              }}
            >
              <p style={{ width: '90px', fontSize: '18px' }}>Quantity:</p>
              <p style={{ fontWeight: 'bold' }}>
                {this.props.ReduxStore?.cart?.CartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '10px',
              }}
            >
              <p style={{ width: '90px', fontSize: '18px' }}>Total:</p>
              <p style={{ fontWeight: 'bold' }}>
                {
                  this.props.ReduxStore?.cart?.CartItems[0]?.price?.split(
                    ' '
                  )[0]
                }{' '}
                {this.props.ReduxStore?.cart?.CartItems.reduce(
                  (acc, item) => acc + item.price.split(' ')[1] * item.qty,
                  0
                ).toFixed(2)}
              </p>
            </div>

            <div>
              <button
                style={{
                  background: 'var(--green)',
                  color: '#fff',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingTop: '.5rem',
                  fontWeight: 'bold',
                  width: '80%',
                  marginTop: '.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ORDER
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
    addToCart: (data) => dispatch(),
    incrementQty: (i) => dispatch(incrementQty(i)),
    decrementQty: (i) => dispatch(decrementQty(i)),
  };
};

const cart = WithRouter(Cart);

export default connect(mapStateToProps, mapDispatchToProps)(cart);
