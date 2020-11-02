import React from 'react';


class AddNewExpanse extends React.Component {
    render() {
        return (
            <form className="text-center" id="form" action="#!" onSubmit={this.props.onMakeExpense}>
                <input className="form-control" onChange={this.props.onInputDescriptionExpanseChange} type="text" placeholder="Add description" />
                <input className="form-control" onChange={this.props.onInputExpanseChange} type="number" placeholder="Enter amount of spending..." />
                <button className="add-btn btn btn-dark my-2">Add</button>
            </form>
        );
    }
}



export default AddNewExpanse;