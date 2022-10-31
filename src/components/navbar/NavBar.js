import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementQty, incrementQty } from '../../features/cart/cartSlice';
import {
  getAllCategories,
  getAllCurrencies,
} from '../../features/products/productsAPI';
import {
  ChangeLinkIndex,
  CurrencyChange,
} from '../../features/switcher/switcherSlice';
import withRouter from '../../utils/WithRouter';
import styles from './navStyles.module.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      active: true,
      linkIndex: 0,
    };
    this.outsideClick = this.outsideClick.bind(this);
    this.outsideClick2 = this.outsideClick2.bind(this);
  }

  async componentDidMount() {
    await this.props.categories();
    await this.props.currencies();
    window.addEventListener('click', this.outsideClick);
    window.addEventListener('click', this.outsideClick2);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClick);
    window.removeEventListener('click', this.outsideClick2);
  }

  handleClick = () => {
    const caret = document.getElementById('caret');
    const selected = document.getElementById('selected');
    const menu = document.getElementById('menu');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;

        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
      });
    });
  };

  handleMouseOver = () => {
    if (this.state.isHovering) {
      this.setState({ isHovering: false });
    } else {
      this.setState({ isHovering: true });
    }
  };

  outsideClick = (e) => {
    const modal = document.getElementById('miniCart');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
  outsideClick2 = (e) => {
    const caret = document.getElementById('caret');
    const menu = document.getElementById('menu');
    const modal = document.getElementById('caret');
    if (e.target !== modal) {
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
    }
  };

  render() {
    const symbol =
      this.props.ReduxStore?.products?.Currencies[
        this.props.ReduxStore?.switcher?.currencyIndex
      ]?.symbol;
    console.log(this.props.ReduxStore?.cart?.CartItems);
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            {this.props.ReduxStore.products.Categories.map(
              (category, index) => (
                <div
                  key={category.name}
                  style={{
                    borderBottom: `${
                      this.state.active &&
                      index === this.props.ReduxStore.switcher.linkIndex
                        ? '2px solid var(--green)'
                        : ''
                    }`,
                    color: `${
                      this.state.active &&
                      index === this.props.ReduxStore.switcher.linkIndex
                        ? 'var(--green)'
                        : ''
                    }`,
                    padding: '1.5rem',
                  }}
                >
                  <Link
                    style={{
                      color: `${
                        this.state.active &&
                        index === this.props.ReduxStore.switcher.linkIndex
                          ? 'var(--green)'
                          : ''
                      }`,
                    }}
                    to={category.name}
                    onClick={() => this.props.changeLinkIndex(index)}
                  >
                    {category.name}
                  </Link>
                </div>
              )
            )}
          </div>
          <div className={styles.logo}>
            <div>
              <img src='/images/cartsvg.svg' alt='s1' />
            </div>
            <img src='/images/curve.svg' alt='s2' className={styles.curve} />
            <img src='/images/arrow.svg' alt='s3' className={styles.arrow} />
          </div>
          <div className={styles.navRight}>
            <div className={styles.dropdown}>
              <div className={styles.select}>
                <span className={styles.selected} id='selected'>
                  {symbol}
                </span>
                <div className={styles.caret}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='13'
                    height='13'
                    fill='currentColor'
                    className='bi bi-chevron-down'
                    viewBox='0 0 16 16'
                    onClick={this.handleClick.bind(this)}
                    id='caret'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                    />
                  </svg>
                </div>
              </div>
              <ul className={styles.menu} id='menu'>
                {this.props.ReduxStore.products.Currencies.map(
                  (currency, index) => (
                    <li
                      onClick={() => this.props.changeCurrency(index)}
                      key={currency.symbol}
                    >
                      <span
                        className='option'
                        style={{ paddingLeft: 10, fontWeight: 'bold' }}
                      >
                        {currency.symbol}
                      </span>
                      <span
                        style={{ paddingLeft: 10, fonSize: '5px' }}
                        className='option'
                      >
                        {currency.label}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* cart */}
            <div className='headerRight-R'>
              <div className='cartCon' style={{ position: 'relative' }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-cart icon'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                </svg>
                {this.props.ReduxStore.cart.CartItems.length !== 0 && (
                  <span
                    id='badge'
                    onClick={this.handleMouseOver.bind(this)}
                    className={styles.badge}
                  >
                    {this.props.ReduxStore.cart.CartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}
                  </span>
                )}
              </div>
              {this.state.isHovering && (
                <div id='miniCart' className={styles.overlay}>
                  <div className={styles.cardBox}>
                    <div style={{ padding: '10px' }}>
                      <h5>
                        My Bag{' '}
                        <span>
                          {this.props.ReduxStore?.cart?.CartItems?.length} items
                        </span>{' '}
                      </h5>
                    </div>
                    <div className={styles.minicart}>
                      {this.props.ReduxStore.cart.CartItems.map(
                        (item, index) => (
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
                                  <h3
                                    style={{
                                      paddingBottom: '5px',
                                      fontSize: '14px',
                                    }}
                                  >
                                    {item.brand}
                                  </h3>
                                  <p
                                    style={{
                                      fontSize: '13px',
                                      paddingBottom: '5px',
                                    }}
                                  >
                                    {item.name}
                                  </p>
                                  <h3
                                    style={{
                                      paddingBottom: '10px',
                                      fontSize: '13px',
                                    }}
                                  >
                                    {item.price}
                                  </h3>
                                </div>
                              </div>

                              {item.attributes.length > 0 &&
                                item.attributes.map((attribute, i) => (
                                  <div key={i}>
                                    <h4
                                      style={{
                                        fontSize: '13px',
                                      }}
                                    >
                                      {attribute.name}
                                    </h4>
                                    <div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          marginRight: 5,
                                        }}
                                      >
                                        {attribute.name === 'Color' &&
                                          attribute.items.map((u, c) => (
                                            <div key={u.id}>
                                              <button
                                                style={{
                                                  border: `${
                                                    c === item.colorIndex
                                                      ? '3px solid var(--green)'
                                                      : '1px solid #1D1F22'
                                                  }`,
                                                  textAlign: 'center',
                                                  paddingTop: 3,
                                                  cursor: 'pointer',
                                                  marginRight: 7,
                                                  marginTop: 10,
                                                  marginBottom: 5,
                                                  background: `${u.value}`,
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
                                          ))}
                                        {attribute.name === 'Size' &&
                                          attribute.items.map((s, index) => (
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                marginBottom: 10,
                                              }}
                                              key={s.id}
                                            >
                                              <button
                                                style={{
                                                  textAlign: 'center',
                                                  padding: 3,
                                                  cursor: 'pointer',
                                                  marginRight: 7,
                                                  marginTop: 10,
                                                  background: `${
                                                    index === item.sizeIndex
                                                      ? ' var(--green)'
                                                      : ''
                                                  }`,
                                                  color: `${
                                                    index === item.sizeIndex
                                                      ? '#fff'
                                                      : ''
                                                  }`,
                                                  border: `${
                                                    index === item.sizeIndex
                                                      ? '3px solid var(--green)'
                                                      : '1px solid #1D1F22'
                                                  }`,
                                                  width: `${
                                                    attribute.name === 'Size' ||
                                                    attribute.name === 'Color'
                                                      ? '30px'
                                                      : ''
                                                  }`,
                                                  height: `${
                                                    attribute.name === 'Size' ||
                                                    attribute.name === 'Color'
                                                      ? '30px'
                                                      : ''
                                                  }`,
                                                }}
                                              >
                                                {s.value}
                                              </button>
                                            </div>
                                          ))}

                                        {attribute.name === 'Capacity' &&
                                          attribute.items.map((c, i) => (
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                marginBottom: 10,
                                              }}
                                              key={c.id}
                                            >
                                              <button
                                                style={{
                                                  textAlign: 'center',
                                                  padding: 3,
                                                  cursor: 'pointer',
                                                  marginRight: 7,
                                                  marginTop: 10,
                                                  background: `${
                                                    i === item.capacityIndex
                                                      ? ' var(--green)'
                                                      : ''
                                                  }`,
                                                  color: `${
                                                    i === item.capacityIndex
                                                      ? '#fff'
                                                      : ''
                                                  }`,
                                                  border: `${
                                                    i === item.capacityIndex
                                                      ? '3px solid var(--green)'
                                                      : '1px solid #1D1F22'
                                                  }`,
                                                }}
                                              >
                                                {c.value}
                                              </button>
                                            </div>
                                          ))}

                                        {attribute.name ===
                                          'With USB 3 ports' &&
                                          attribute.items.map((u, Uindex) => (
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                marginBottom: 10,
                                              }}
                                              key={u.id}
                                            >
                                              <button
                                                style={{
                                                  padding: 3,
                                                  textAlign: 'center',
                                                  cursor: 'pointer',
                                                  marginRight: 7,
                                                  marginTop: 10,
                                                  background: `${
                                                    Uindex === item.usbIndex
                                                      ? ' var(--green)'
                                                      : ''
                                                  }`,
                                                  color: `${
                                                    Uindex === item.usbIndex
                                                      ? '#fff'
                                                      : ''
                                                  }`,
                                                  border: `${
                                                    Uindex === item.usbIndex
                                                      ? '3px solid var(--green)'
                                                      : '1px solid #1D1F22'
                                                  }`,
                                                }}
                                              >
                                                {u.value}
                                              </button>
                                            </div>
                                          ))}

                                        {attribute.name ===
                                          'Touch ID in keyboard' &&
                                          attribute.items.map((t, Tindex) => (
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                marginBottom: 10,
                                              }}
                                              key={t.id}
                                            >
                                              <button
                                                style={{
                                                  textAlign: 'center',
                                                  padding: 3,
                                                  cursor: 'pointer',
                                                  marginRight: 7,
                                                  marginTop: 10,
                                                  background: `${
                                                    Tindex === item.touchIndex
                                                      ? ' var(--green)'
                                                      : ''
                                                  }`,
                                                  color: `${
                                                    Tindex === item.touchIndex
                                                      ? '#fff'
                                                      : ''
                                                  }`,
                                                  border: `${
                                                    Tindex === item.touchIndex
                                                      ? '3px solid var(--green)'
                                                      : '1px solid #1D1F22'
                                                  }`,
                                                }}
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
                              <div
                                style={{
                                  // marginRight: 2,
                                  textAlign: 'center',
                                  // width: '50%',
                                  display: 'flex',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'stretch',
                                    marginRight: 3,
                                  }}
                                >
                                  <div>
                                    <button
                                      onClick={() =>
                                        this.props.incrementQty({
                                          id: item.id,
                                          index,
                                        })
                                      }
                                      style={{
                                        fontSize: '10px',
                                        padding: '1px 5px',
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
                                      fontSize: '12px',
                                      padding: '5px',
                                    }}
                                  >
                                    {item.qty}
                                  </div>
                                  <div>
                                    {' '}
                                    <button
                                      onClick={() =>
                                        this.props.decrementQty({
                                          id: item.id,
                                          index,
                                        })
                                      }
                                      style={{
                                        fontSize: '10px',
                                        padding: '1px 5px',
                                        cursor: 'pointer',
                                        background: '#fff',
                                        border: '1px solid black',
                                      }}
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    position: 'relative',
                                  }}
                                >
                                  <img
                                    src={item.img}
                                    alt='pi'
                                    style={{
                                      width: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* minicart footer */}
                    <div style={{ padding: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 12,
                        }}
                      >
                        <h4>Total</h4>
                        <h4>
                          {
                            this.props.ReduxStore?.cart?.CartItems[0]?.price?.split(
                              ' '
                            )[0]
                          }{' '}
                          {this.props.ReduxStore?.cart?.CartItems.reduce(
                            (acc, item) =>
                              acc + item.price.split(' ')[1] * item.qty,
                            0
                          ).toFixed(2)}
                        </h4>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <Link
                            to='/cart'
                            onClick={this.handleMouseOver.bind(this)}
                          >
                            <button
                              style={{
                                padding: 10,
                                border: '1px solid black',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              VIEW BAG
                            </button>
                          </Link>
                        </div>
                        <div>
                          <button
                            style={{
                              padding: 10,
                              border: 'none',
                              background: '#5ece7b',
                              color: '#fff',
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            CHECK OUT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
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
    categories: () => dispatch(getAllCategories()),
    currencies: () => dispatch(getAllCurrencies()),
    changeCurrency: (i) => dispatch(CurrencyChange(i)),
    changeLinkIndex: (i) => dispatch(ChangeLinkIndex(i)),
    decrementQty: (i) => dispatch(decrementQty(i)),
    incrementQty: (i) => dispatch(incrementQty(i)),
  };
};

const navbar = withRouter(NavBar);

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
