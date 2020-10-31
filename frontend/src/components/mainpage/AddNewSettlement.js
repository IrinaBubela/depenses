import React from 'react';

class AddNewSettlement extends React.Component {
    render() {
        return (
            <form className="text-center" id="form" action="#!" onSubmit={this.props.onMakeSettlement}>
                <select defaultValue={'default'} className="form-control" onChange={this.props.onSelectSettlementUserChange}>
                    <option value="default" disabled hidden>Choose Person</option>
                    {
                        this.props.roomMembersWithoutMe.map((member, i) => (
                            <option key={i} value={member.id}>{member.name}</option>
                        ))}
                </select>
                <button className="add-btn btn btn-dark my-2">Add</button>
            </form >
        );
    }
}



export default AddNewSettlement;
