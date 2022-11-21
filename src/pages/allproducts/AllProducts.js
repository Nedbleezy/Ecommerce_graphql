import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getALLproducts } from '../../features/products/productsAPI';
import WithRouter from '../../utils/WithRouter';
import Card from '../../components/card/Card';
import styles from './allproductsStyle.module.css';

class AllProducts extends Component {
  async componentDidMount() {
    await this.props.allproducts();
  }
  render() {
    const data = this.props.ReduxStore.products.AllProductsCategory;
    const { loading, error } = this.props?.ReduxStore.products;
    loading && <h5>Loading...</h5>;
    error && <h5> {error}</h5>;

    return (
      <div>
        <div className={styles.container}>
          {data.map((product) => (
            <Card
              name={product.name}
              key={product.id}
              brand={product.brand}
              gallery={product.gallery}
              inStock={product.inStock}
              prices={product.prices}
              id={product.id}
              attributes={product.attributes}
            />
          ))}
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
    allproducts: () => dispatch(getALLproducts()),
  };
};

const products = WithRouter(AllProducts);

export default connect(mapStateToProps, mapDispatchToProps)(products);
