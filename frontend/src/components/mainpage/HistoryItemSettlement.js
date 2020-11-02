import React from 'react';
import { ListGroup } from 'react-bootstrap';

class HistoryItemSettlement extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item className="history-item history-item-settlement">
                    <div>
                        <span>0.00</span>
                    </div>
                    <div>
                        <span className="history-item-price">Settlement with {this.props.settlement}</span>
                    </div>
                    <div>
                        <p className="history-item-buyer">{this.props.name}</p>
                    </div>
                    <div>
                        <span className="history-item-date">{this.props.dateDetails}</span>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        )
    }

}



export default HistoryItemSettlement;