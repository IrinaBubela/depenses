import React from 'react';
import AddNewDebt from './AddNewDebt';
import AddNewExpense from './AddNewExpense';
import AddNewSettlement from './AddNewSettlement';

const options = [
    {
        label: "Expanses",
        value: "expanses",
    },
    {
        label: "Debt",
        value: "debt",
    },
    {
        label: "Settlement",
        value: "settlement",
    }
]


class AddNewExpanseOrDebt extends React.Component {
    render() {
        return (
            <div className="add-new-expense">
                <select className="form-control" onChange={this.props.onSelectChange}>
                    {options.map((option, i) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {(() => {
                    switch (this.props.value) {
                        case 'debt': return (
                            <AddNewDebt
                                onMakeDebt={this.props.onMakeDebt}
                                onInputExpanseChange={this.props.onInputExpanseChange}
                                roomMembersWithoutMe={this.props.roomMembersWithoutMe}
                                actualUserName={this.props.actualUserName}
                                onSelectDebtUserChange={this.props.onSelectDebtUserChange} />)
                        case 'expanses': return (
                            <AddNewExpense
                                onMakeExpense={this.props.onMakeExpense}
                                onInputExpanseChange={this.props.onInputExpanseChange} />)
                        case 'settlement': return (
                            <AddNewSettlement
                                onMakeSettlement={this.props.onMakeSettlement}
                                onSelectSettlementUserChange={this.props.onSelectSettlementUserChange}
                                roomMembersWithoutMe={this.props.roomMembersWithoutMe} />)
                    }
                })()}
            </div>
        );
    }
}



export default AddNewExpanseOrDebt;