import React from 'react';


const options = [
    {
        label: "Expanses",
        value: "expanses",
    },
    {
        label: "Debt",
        value: "debt",
    }
]

class AddNewDebt extends React.Component {
    render() {
        return (
            <form className="text-center" id="form" action="#!" onSubmit={this.props.onMakeDebt}>
                <select className="form-control" onChange={this.props.onSelectChange}>
                    {options.map((option, i) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <input className="form-control" type="text" placeholder="Add description" />
                <input className="form-control" onChange={this.props.onInputExpanseChange} type="number" placeholder="Enter amount of spending..." />
                <button className="add-btn btn btn-dark my-2">Add</button>
            </form>
        );
    }
}



export default AddNewDebt;