// import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/auth/actions';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { changeSpinner, openSnackbar } from '../Redux/app/actions';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import styles from './Ledger.module.css';
import { Link, useHistory } from 'react-router-dom';
import Card from './Card';

const Home = (props) => {
    window.document.title = 'Welcome!';
    const [ show, setShow ] = useState(false);
    const [ transactions, setTransactions ] = useState([]);
    const [ newTransaction, setNewTransaction ] = useState({
        user_id: '',
        title: '',
        type: '',
        amount: ''
    });
    const [ balances, setBalances ] = useState({
        debit: '',
        credit: '',
        balance: ''
    });
    const isAuth = useSelector((state) => state.auth.isAuth);
    const user_id = useSelector((state) => state.auth.user_id);
    const fullName = useSelector((state) => state.auth.fullName);
    const spinner = useSelector((state) => state.auth.spinner);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(
        () => {
            dispatch(changeSpinner(true));
            getTransactions();
        },
        [ spinner, dispatch, user_id ]
    );

    const getTransactions = () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/transactions/${user_id}`
        })
            .then((res) => {
                const { debit, credit, balance } = res.data;
                setTransactions(res.data.transactions);
                setBalances({ debit, credit, balance });
                dispatch(changeSpinner(false));
            })
            .catch((err) => {
                dispatch(changeSpinner(false));
            });
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = () => {
        if (isAuth) {
            handleShow();
        } else {
            history.push('/login');
        }
    };
    const handleChange = (e) => {
        setNewTransaction({
            ...newTransaction,
            [e.target.name]: e.target.value
        });
    };

    const saveChanges = () => {
        const { title, amount, type } = newTransaction;
        dispatch(changeSpinner(true));
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/transactions/add',
            data: {
                user_id: user_id,
                title,
                type,
                amount
            }
        })
            .then((res) => {
                dispatch(changeSpinner(false));
                dispatch(
                    openSnackbar({
                        message: res.data.message,
                        severity: 'success'
                    })
                );
                getTransactions();
            })
            .catch((err) => {
                dispatch(changeSpinner(false));
                dispatch(
                    openSnackbar({
                        message: err.response.data.message,
                        severity: 'error'
                    })
                );
            });
        handleClose();
    };

    return (
        <div>
            <div>{isAuth ? 'Hello ' + fullName : 'Hello stranger'}</div>

            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card variant="success" type="Credit" amount={balances.credit} />
                <Card variant="danger" type="Debit" amount={balances.debit} />
                <Card variant="info" type="Balance" amount={balances.balance} />
            </Container>

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
                        {transactions &&
                            transactions.map((transaction, index) => {
                                return (
                                    <tr key={transaction._id}>
                                        <td>{index + 1}.</td>
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
            </Container>
            <div>
                <Button variant="primary" onClick={openModal}>
                    Add Transaction
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={newTransaction.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label>
                                Amount <i className="fa fa-rupee" />
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                name="amount"
                                value={newTransaction.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Credit"
                                onChange={() => setNewTransaction({ ...newTransaction, type: 'credit' })}
                                checked={newTransaction.type === 'credit' ? true : false}
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="Debit"
                                onChange={() => setNewTransaction({ ...newTransaction, type: 'debit' })}
                                checked={newTransaction.type === 'debit' ? true : false}
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                            {/* </Col> */}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={saveChanges}>
                            Add Transactions
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Home;
