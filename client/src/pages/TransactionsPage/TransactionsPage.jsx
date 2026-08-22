import React from 'react';
import Header from '../../components/Header/Header';

const TransactionsPage = () => {

    const transactions = [
        { id: 1, userId: 1, createdAt: "2024-01-01", operationType: "INCOME", summ: 10 },
        { id: 2, userId: 1, createdAt: "2024-01-02", operationType: "EXPENSE", summ: 5 }
    ]
    const mapTransactions = t => (
        <tr key={t.id}>
                            <td>{t.createdAt}</td>
                            <td>{t.operationType}</td>
                            <td>{t.summ}</td>
        </tr>
    )
    return (<>
    <Header />
        <main>
            <table>
                <caption>Your Transactions</caption>
                <thead>
                    <tr key={1}>Date</tr>
                    <tr key={2}>Operation Type</tr>
                    <tr key={3}>Summ</tr>
                </thead>
                <tbody>
                    {transactions.map(mapTransactions)}
                </tbody>
            </table>
        </main>
    </>
    );
}

export default TransactionsPage;
