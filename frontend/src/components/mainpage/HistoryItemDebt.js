import React from 'react';
import { ListGroup } from 'react-bootstrap';

class HistoryItemDebt extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item className="history-item history-item-debt">
                    <div>
                        <span className="history-item-price">{this.props.amount}</span>
                    </div>
                    <div>
                        <p className="history-item-buyer" style={{ textTransform: 'capitalize' }}>{this.props.description}</p>
                    </div>
                    <div>
                        <p className="history-item-owe">{this.props.fromMemberName} borrowed {this.props.toMemberName}</p>
                    </div>
                    <div>
                        <span className="history-item-date">{this.props.dateDetails}</span>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        )
    }

}



export default HistoryItemDebt;