import React from 'react';
import AddNewDebt from './AddNewDebt';
import AddNewExpense from './AddNewExpense';

class AddNewExpanseOrDebt extends React.Component {
    render() {
        return (
            <div className="add-new-expense">
                {this.props.value === 'debt' ?
                    <AddNewDebt
                        onMakeDebt={this.props.onMakeDebt}
                        onSelectChange={this.props.onSelectChange}
                        onInputExpanseChange={this.props.onInputExpanseChange} /> :
                    <AddNewExpense
                        onMakeExpense={this.props.onMakeExpense}
                        onSelectChange={this.props.onSelectChange}
                        onInputExpanseChange={this.props.onInputExpanseChange} />
                }
            </div>
        );
    }
}



export default AddNewExpanseOrDebt;