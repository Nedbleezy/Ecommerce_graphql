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
import WithRouter from '../../utils/WithRouter';

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
    const capcityIndex = this.props.ReduxStore.switcher.capacityIndex;
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

    const selectedAttr = this.state.attributes?.map((item) => {
      return {
        name: item.name,
        value:
          item.name === 'Color'
            ? [
                ...item?.items.filter(
                  (item) => item.value !== item?.items[colorIndex].value
                ),
                item?.items[colorIndex].value,
              ]
            : item.name === 'Size'
            ? item?.items[sizeIndex].value
            : item.name === 'Capacity'
            ? item?.items[capcityIndex].value
            : item.name === 'With USB 3 ports'
            ? item?.items[usbIndex].value
            : item.name === 'Touch ID in keyboard'
            ? item?.items[touchIndex].value
            : '',
      };
    });

    return (
      <>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {details && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: 5,
              gap: 8,
              width: '90%',
              marginTop: '2rem',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            <div style={{ flex: 1, padding: 3 }}>
              {this.state.gallery?.length > 1
                ? this.state.gallery?.map((img, i) => (
                    <div className='thumbnail' key={i}>
                      <img
                        onClick={this.ChangeImg.bind(this, i)}
                        src={img}
                        alt='pi'
                        style={{
                          width: '100%',
                          height: '50px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  ))
                : ''}
            </div>

            <div style={{ flex: 4, padding: 3 }}>
              <img
                src={this.state.gallery[this.state.Imgindex]}
                alt='img'
                style={{ width: '80%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 3, paddingLeft: 4 }}>
              <div className='brand'>{this.state.brand}</div>
              <div style={{ marginBottom: 10 }}>{this.state.name}</div>
              {this.state.attributes?.length !== 0 &&
                this.state.attributes.map((attribute, i) => (
                  <div key={i}>
                    <h4>{attribute.name}</h4>
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
                              onClick={() => {
                                this.props.changeColor(c);
                              }}
                              style={{
                                border: `${
                                  c === colorIndex
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
                              onClick={() => {
                                this.props.changeSize(index);
                              }}
                              style={{
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                background: `${
                                  index === sizeIndex ? ' var(--green)' : ''
                                }`,
                                color: `${index === sizeIndex ? '#fff' : ''}`,

                                border: `${
                                  index === sizeIndex
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
                              onClick={() => {
                                this.props.changeCapcity(i);
                              }}
                              style={{
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                background: `${
                                  i === capcityIndex ? ' var(--green)' : ''
                                }`,
                                color: `${i === capcityIndex ? '#fff' : ''}`,
                                border: `${
                                  i === capcityIndex
                                    ? '3px solid var(--green)'
                                    : '1px solid #1D1F22'
                                }`,
                              }}
                            >
                              {c.value}
                            </button>
                          </div>
                        ))}

                      {attribute.name === 'With USB 3 ports' &&
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
                              onClick={() => {
                                this.props.changeUsb(Uindex);
                              }}
                              style={{
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                background: `${
                                  Uindex === usbIndex ? ' var(--green)' : ''
                                }`,
                                color: `${Uindex === usbIndex ? '#fff' : ''}`,
                                border: `${
                                  Uindex === usbIndex
                                    ? '3px solid var(--green)'
                                    : '1px solid #1D1F22'
                                }`,
                              }}
                            >
                              {u.value}
                            </button>
                          </div>
                        ))}

                      {attribute.name === 'Touch ID in keyboard' &&
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
                              onClick={() => {
                                this.props.changeTouch(Tindex);
                              }}
                              style={{
                                padding: 3,
                                cursor: 'pointer',
                                marginRight: 7,
                                marginTop: 10,
                                background: `${
                                  Tindex === touchIndex ? ' var(--green)' : ''
                                }`,
                                color: `${Tindex === touchIndex ? '#fff' : ''}`,
                                border: `${
                                  Tindex === touchIndex
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
                ))}

              <div style={{ marginBottom: 5 }}>PRICE:</div>
              <div style={{ marginBottom: 5 }}>
                <h5 style={{ color: 'var(--dark)', fontSize: '.7rem' }}>
                  <span>
                    {this.state.prices[CurrencyIndex]?.currency?.symbol}
                  </span>{' '}
                  {this.state.prices[CurrencyIndex]?.amount}
                </h5>
              </div>
              <div style={{ fontWeight: 600 }}></div>
              <div>
                <button
                  style={{
                    border: 'none',
                    padding: '.7rem',
                    color: '#fff',
                    background: 'var(--green)',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onClick={() =>
                    console.log({
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
                  ADD TO CART
                </button>
              </div>
              <div
                style={{ marginTop: 10 }}
                dangerouslySetInnerHTML={{
                  __html: `${this.props?.ReduxStore?.productDetails?.productDetails?.description}`,
                }}
              />
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
