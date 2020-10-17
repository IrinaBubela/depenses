import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import DebtsDataOnCard from './DebtsDataOnCard'

class CardWithExpenses extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Card className="card-item">
                <Card.Body>
                    <Card.Title>{this.props.member.name}</Card.Title>
                    {Object.keys(this.props.debt).map((memberName, i) => {
                        return (
                            < DebtsDataOnCard name={memberName} amount={this.props.debt[memberName]} key={i} />
                        )
                    })}
                    < Form action="#!" onSubmit={this.props.onMakeDebt} id="borrow" >
                        <Form.Group>
                            <Form.Control placeholder="Enter amount of owed money" onChange={this.props.onInputDebtChange} />
                            <Button variant="primary" type="submit">Add a debt</Button>
                        </Form.Group>
                    </ Form>
                </Card.Body>
            </Card >
        )
    }

}



export default CardWithExpenses;
