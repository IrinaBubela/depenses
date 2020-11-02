import React from 'react';
import CardWithExpenses from './CardWithExpenses';


class Cards extends React.Component {
    render() {
        return (
            <div className="card-expenses">
                {
                    this.props.roomMembers.map((member, i) => {
                        return <CardWithExpenses
                            key={i}
                            member={member}
                            debt={this.props.roomState[member.name]}
                        />
                    })
                }
            </div>
        );
    }
}



export default Cards;