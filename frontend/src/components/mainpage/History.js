import React from 'react';
import HistoryItemExpense from './HistoryItemExpense';
import HistoryItemSettlement from './HistoryItemSettlement';
import HistoryItemDebt from './HistoryItemDebt';



class History extends React.Component {
    render() {
        return (
            <div className="history">
                {this.props.expenseData.map((el, i) => {

                    return (
                        <div className="history-container-item" key={i}>
                            {(() => {
                                switch (el.type) {
                                    case 'settlement':
                                        return (<HistoryItemSettlement name={el.member}
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
                                            <HistoryItemExpense name={el.member}
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