import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <section className="wallet-header-wrap">
          <Header />
          <WalletForm />
        </section>
        <Table />
      </div>
    );
  }
}

export default Wallet;
