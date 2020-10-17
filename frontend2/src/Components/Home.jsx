// import Button from '@material-ui/core/Button';
import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/auth/actions';
import {Button, Modal} from  'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio,Form} from 'react-bootstrap';

const Home = (props) => {
    window.document.title = 'Welcome!';
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const fullName = useSelector((state) => state.auth.fullName);
    const dispatch = useDispatch();


    return (
        <div>
            <div>{isAuth ? 'Hello ' + fullName : 'Hello stranger'}</div>
            <div>
                {isAuth ? (
                    <Button variant="contained" type="submit" color="primary" onClick={() => dispatch(logoutUser())}>
                        Logout
                    </Button>
                ) : null}
            </div>
            <div>
            <Button variant="primary" onClick={handleShow}>
                Add Transaction 
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="amount">
                <Form.Label>Amount <i class="fa fa-rupee"></i></Form.Label>
                <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>

            <Form.Label>Type</Form.Label>
            <Form.Check
                type="radio"
                label="Cash"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
            />
            <Form.Check
                type="radio"
                label="Card"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
            />
      {/* </Col> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                     Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
             </Modal>
            </div>
        </div>
    );
};

export default Home;
