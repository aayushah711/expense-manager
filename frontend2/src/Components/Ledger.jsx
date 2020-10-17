import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeSpinner } from '../Redux/app/actions';
import Pagination from './Pagination';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import styles from './Ledger.module.css';

const Ledger = () => {
    let [ type, setType ] = useState('');
    const [ page, setPage ] = React.useState(1);
    const [ limit, setLimit ] = useState(20);
    const [ transactions, setTransactions ] = useState([]);
    const user_id = useSelector((state) => state.auth.user_id);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(changeSpinner(false));
            axios({
                method: 'get',
                url: 'http://localhost:5000/api/transactions/pagination',
                params: {
                    page: page,
                    limit: limit,
                    type: type,
                    user_id: user_id
                }
            })
                .then((res) => {
                    setTransactions(res.data.transactions);
                    dispatch(changeSpinner(false));
                })
                .catch((err) => {
                    dispatch(changeSpinner(false));
                });
        },
        [ type, page, limit, dispatch, user_id ]
    );

    return (
        <div>
            <Nav className={styles.nav} variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={() => setType('')} eventKey="link-1">
                        All
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType('credit')} eventKey="link-2">
                        Credit
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType('debit')} eventKey="link-3">
                        Debit
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Container className={styles.container}>
                <Table hover>
                    <thead>
                        <tr>
                            <th width="100">#</th>
                            <th>Title</th>
                            <th width="150">Date</th>
                            <th width="100">Type</th>
                            <th width="120" className="text-right pr-5">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.current &&
                            transactions.current.map((transaction) => {
                                return (
                                    <tr key={transaction._id}>
                                        <td> </td>
                                        <td>{transaction.title}</td>
                                        <td>{moment(transaction.timestamp).format('DD/MM/YYYY HH:mm')}</td>
                                        <td>{transaction.type}</td>
                                        <td
                                            className={`text-right pr-5 text-${transaction.type === 'credit'
                                                ? 'success'
                                                : 'danger'}`}
                                        >
                                            ₹ {transaction.amount}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={transactions.total_pages}
                    limit={limit}
                    setLimit={setLimit}
                />
            </Container>
        </div>
    );
};

export default Ledger;
