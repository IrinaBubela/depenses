import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import DebtsDataOnCard from './DebtsDataOnCard'

class CardWithExpenses extends React.Component {

    render() {
        return (
            <Card className="card-item">
                <Card.Body>
                    <Card.Title>{this.props.member.name}</Card.Title>
                    {Object.keys(this.props.debt).map((memberName, i) => {
                        return (
                            < DebtsDataOnCard name={memberName} amount={this.props.debt[memberName]} key={i} />
                        )
                    })}
                </Card.Body>
            </Card >
        )
    }

}



export default CardWithExpenses;