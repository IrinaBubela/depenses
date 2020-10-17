import React from 'react';
import { Card } from 'react-bootstrap';


class DebtsDataOnCard extends React.Component {

    render() {
        console.log();
        return (
            <Card.Text className="price">
                You owned
                {' ' + this.props.name}
               :
                {' ' + this.props.amount} $
            </Card.Text>
        )
    }
}

export default DebtsDataOnCard;