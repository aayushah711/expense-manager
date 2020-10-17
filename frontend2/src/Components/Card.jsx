import React from 'react';
import Card from 'react-bootstrap/Card';

const CustomCard = ({ variant, type, amount }) => {
    return (
        <Card
            bg={variant.toLowerCase()}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '100%' }}
            className="m-2"
        >
            <Card.Header>{type}</Card.Header>
            <Card.Body>
                <Card.Text>₹{amount}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CustomCard;
