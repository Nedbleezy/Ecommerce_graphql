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
import Svg from '../card/Svg';
import Arrow from '../header/Arrow';
import { Option, SelectBtn, OptionMenu, List } from './navStyles';
import Logo from '../logo/Logo';
import styles from './navStyles.module.css';
import Modal from '../modal/Modal';

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

  OpenModal = () => {
    if (this.state.isHovering) {
      this.setState({ isHovering: false });
    } else {
      this.setState({ isHovering: true });
    }
  };

  outsideClick = (e) => {
    const modal = document.getElementById('modal');
    const hire = document.getElementById('hire');
    const vue = document.getElementById('vue');

    if (e.target === modal || e.target === vue || e.target === hire) {
      modal.style.display = 'none';
    }
  };
  outsideClick2 = (e) => {
    const optionMenu = document.querySelector('#menuU');

    if (e.target.className === 'allproductsStyle_container__m8HSE') {
      optionMenu.classList.remove('active');
    } else if (
      e.target.className === 'tech_container__Wsooi' ||
      e.target.className === 'navStyles_Linky__YGJw8 navStyles_Link__Pe9fo'
    ) {
      optionMenu.classList.remove('active');
    } else if (e.target.className === 'clothe_container__BVeJj') {
      optionMenu.classList.remove('active');
    } else if (e.target.id === 'root') {
      optionMenu.classList.remove('active');
    } else if (
      e.target.className === 'productDetails_flexRight__q3Jc9' ||
      e.target.className === 'productDetails_brand__0OxQj'
    ) {
      optionMenu.classList.remove('active');
    } else if (
      e.target.className === 'productDetails_touchCover__1JbrL' ||
      e.target.className === 'productDetails_name1__q4RsJ'
    ) {
      optionMenu.classList.remove('active');
    }
  };

  DropdownD = () => {
    const caret = document.querySelector('#caaret');
    const optionMenu = document.querySelector('#menuU');

    const options = document.querySelectorAll('.option');
    const sBtnText = document.querySelector('.sBtn-text');

    optionMenu.classList.toggle('active');
    caret.classList.toggle('caret-rotate');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const selected = option.querySelector('#optionText').innerText;
        sBtnText.innerText = selected;
      });
    });
  };

  render() {
    const symbol =
      this.props.ReduxStore?.products?.Currencies[
        this.props.ReduxStore?.switcher?.currencyIndex
      ]?.symbol;

    return (
      <div className={styles.header}>
        <header>
          <nav className={styles.nav}>
            <div className={styles.navLeft}>
              {this.props.ReduxStore.products.Categories.map(
                (category, index) => (
                  <Link
                    key={category.name}
                    className={`${styles.Linky} ${
                      index === this.props.ReduxStore.switcher.linkIndex
                        ? styles.Link
                        : ''
                    }`}
                    to={category.name}
                    onClick={() => this.props.changeLinkIndex(index)}
                  >
                    {category.name}
                  </Link>
                )
              )}
            </div>
            <Logo />
            <div className={styles.navRight}>
              <OptionMenu className='Menu' id='navRighty'>
                <SelectBtn className='selectBBtn' onClick={this.DropdownD}>
                  <span className='sBtn-text' style={{ fontWeight: 'bold' }}>
                    {' '}
                    {symbol}
                  </span>
                  <span className={styles.chevron} id='caaret'>
                    <Arrow />
                  </span>
                </SelectBtn>

                <List id='menuU'>
                  {this.props.ReduxStore.products.Currencies.map(
                    (currency, index) => (
                      <Option
                        className='option'
                        key={currency.symbol}
                        onClick={() => {
                          this.DropdownD();
                          this.props.changeCurrency(index);
                        }}
                      >
                        <span className={styles.icon} id='optionText'>
                          {currency.symbol}
                        </span>
                        <span className='optionText'>{currency.label}</span>
                      </Option>
                    )
                  )}
                </List>
              </OptionMenu>
              <div
                onClick={this.OpenModal.bind(this)}
                className={styles.cartBadgeWrapper}
              >
                {this.props.ReduxStore.cart.CartItems.length !== 0 && (
                  <span id='badge' className={styles.badge}>
                    {this.props.ReduxStore.cart.CartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}
                  </span>
                )}
                <Svg />
              </div>
            </div>
          </nav>
          {this.state.isHovering && <Modal />}
        </header>
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
