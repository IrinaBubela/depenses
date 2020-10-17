import React from 'react';
import { ListGroup } from 'react-bootstrap';

class HistoryItemExpense extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item className="history-item">
                    <span className="history-item-price">{this.props.price}</span>
                    <p className="history-item-buyer">{this.props.name}</p>
                    <span className="history-item-date">{this.props.dateDetails}</span></ListGroup.Item>

            </ListGroup>
        )
    }

}



export default HistoryItemExpense;
