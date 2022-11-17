import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getproductClothes } from '../../features/products/productsAPI';
import Card from '../../components/card/Card';
import WithRouter from '../../utils/WithRouter';
import styles from './clothe.module.css';

class ClotheProducts extends Component {
  async componentDidMount() {
    await this.props.getclothes(
      this.props.router.location.pathname.split('/')[1]
    );
  }

  render() {
    const data = this.props?.ReduxStore.products.ClothesCategory;
    const { loading, error } = this.props?.ReduxStore.products;
    loading && <h5>Loading...</h5>;
    error && <h5> {error}</h5>;

    return (
      <div className={styles.container}>
        {data?.map((item) => (
          <Card
            name={item.name}
            key={item.id}
            brand={item.brand}
            gallery={item.gallery}
            inStock={item.inStock}
            prices={item.prices}
            category={item.category}
            id={item.id}
            attributes={item.attributes}
          />
        ))}
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
    getclothes: (data) => dispatch(getproductClothes(data)),
  };
};

const clothes = WithRouter(ClotheProducts);

export default connect(mapStateToProps, mapDispatchToProps)(clothes);
