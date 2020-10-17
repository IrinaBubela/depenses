import React from 'react';
import { ListGroup } from 'react-bootstrap';

class HistoryItemSettlement extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item className="history-item">
                    <span className="history-item-price">Settlement with member {this.props.settlement}</span>
                    <p className="history-item-buyer">{this.props.name}</p>
                    <span className="history-item-date">{this.props.dateDetails}</span></ListGroup.Item>
            </ListGroup>
        )
    }

}



export default HistoryItemSettlement;