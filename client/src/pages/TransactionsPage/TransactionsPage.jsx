import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionsSlice';
import Header from '../../components/Header/Header';
import Spinner from './../../components/Spinner/Spinner';
import TryAgain from './../../components/TryAgain/TryAgain';

const TransactionsPage = ({ transactions, isFetching, error, get }) => {
  useEffect(() => {
      get();
  }, []);
  const mapTransactions = (t) => (
    <tr key={t.id}>
      <td>{`${new Date(t.createdAt).getFullYear()}-${new Date(t.createdAt).getMonth() + 1}-${new Date(t.createdAt).getDate()}`}</td>
      <td>{t.operationType}</td>
      <td>{t.summ}</td>
    </tr>
  );
  return (
    <>
      <Header />
      <main>
        {error && <TryAgain getData={get} />}
        {isFetching && <Spinner />}
        {!isFetching && !error && <table>
          <caption>Your Transactions</caption>
          <thead>
            <tr key={1}>Date</tr>
            <tr key={2}>Operation Type</tr>
            <tr key={3}>Summ</tr>
          </thead>
          <tbody>{transactions.map(mapTransactions)}</tbody>
        </table>}
      </main>
    </>
  );
};

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
