import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionsSlice';

const TransactionsPage = ({ transactions, isFetching, error, get }) => {
  useEffect(() => {
      get();
  }, []);
  const mapTransactions = (t) => (
    <tr key={t.id}>
      <td>{t.createdAt}</td>
      <td>{t.operationType}</td>
      <td>{t.summ}</td>
    </tr>
  );
  return (
    <>
      <Header />
      <main>
        <table>
          <caption>Your Transactions</caption>
          <thead>
            <tr key={1}>Date</tr>
            <tr key={2}>Operation Type</tr>
            <tr key={3}>Summ</tr>
          </thead>
          <tbody>{transactions.map(mapTransactions)}</tbody>
        </table>
      </main>
    </>
  );
};

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
