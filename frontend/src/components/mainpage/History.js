import React from 'react';
import HistoryItemExpense from './HistoryItemExpense';
import HistoryItemSettlement from './HistoryItemSettlement';
import HistoryItemDebt from './HistoryItemDebt';



class History extends React.Component {
    render() {
        console.log(this.props.expenseData);
        return (
            <div className="history">
                {this.props.expenseData.map((el, i) => {
                    return (
                        <div className="history-container-item" key={i}>
                            {(() => {
                                switch (el.type) {
                                    case 'settlement':
                                        return (<HistoryItemSettlement name={el.member_name}
                                            settlement={el.settlement_with_member}
                                            dateDetails={this.props.getDate(el.date)}
                                        />)
                                        break;

                                    case 'dept':
                                        return (

                                            <HistoryItemDebt name={el.member}
                                                from_member_name={el.from_member_name}
                                                to_member_name={el.to_member_name}
                                                amount={el.amount}
                                                dateDetails={this.props.getDate(el.date)}
                                            />
                                        )
                                        break;

                                    case 'spending':

                                        return (
                                            <HistoryItemExpense name={el.member_name}
                                                price={el.amount}
                                                dateDetails={this.props.getDate(el.date)}
                                            />
                                        )
                                }
                            })()}
                        </div>
                    )
                })}
            </div>
        );
    }
}



export default History;