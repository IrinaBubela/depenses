import React from 'react';
import { ListGroup } from 'react-bootstrap';

class HistoryItemDebt extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item className="history-item">
                    <p className="history-item-owe">{this.props.from_member_name} borrowed {this.props.to_member_name} - {this.props.amount}</p>
                    <p className="history-item-buyer">{this.props.name}</p>
                    <span className="history-item-date">{this.props.dateDetails}</span>
                </ListGroup.Item>
            </ListGroup>
        )
    }

}



export default HistoryItemDebt;