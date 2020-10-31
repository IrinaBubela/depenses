import React from 'react';


class AddNewDebt extends React.Component {
    render() {
        return (
            <form className="text-center" id="form" action="#!" onSubmit={this.props.onMakeDebt}>
                <div>
                    <select defaultValue={'default'} className="form-control" onChange={this.props.onSelectDebtUserChange}>
                        <option value="default" disabled hidden>Choose Person</option>
                        {this.props.roomMembersWithoutMe.map((member, i) => (
                            <option key={i} value={member}>{member.name}</option>
                        ))}
                    </select>
                </div>
                <input className="form-control" type="text" placeholder="Add description" />
                <input className="form-control" onChange={this.props.onInputExpanseChange} type="number" placeholder="Enter amount of spending..." />
                <button className="add-btn btn btn-dark my-2">Add</button>
            </form >
        );
    }
}



export default AddNewDebt;