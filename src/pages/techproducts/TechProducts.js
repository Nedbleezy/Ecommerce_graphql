import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/card/Card';
import { getproductTech } from '../../features/products/productsAPI';
import WithRouter from '../../utils/WithRouter';
import styles from './tech.module.css';

class TechProducts extends Component {
  async componentDidMount() {
    await this.props.getTech(this.props.router.location.pathname.split('/')[1]);
  }

  render() {
    const data = this.props?.ReduxStore.products.TechCategory;
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
    addToCart: (data) => dispatch(),
    getTech: (data) => dispatch(getproductTech(data)),
  };
};

const tech = WithRouter(TechProducts);

export default connect(mapStateToProps, mapDispatchToProps)(tech);
