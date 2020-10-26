import React from 'react';
import CardWithExpenses from './components/mainpage/CardWithExpenses';
import axios from 'axios';
import History from './components/mainpage/History';
import NavBarComponent from './components/mainpage/NavBarComponent';
import AddNewExpanseOrDebt from './components/mainpage/AddNewExpanseOrDebt';
import Error from './Error';

import DepensesApi from './api';


class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            expenseData: [],
            inputExpanse: '',
            settlement: false,
            selectValue: 'expanses',
            error: false,
            roomMembers: [],
            roomState: {}
        }
        this.onInputExpanseChange = this.onInputExpanseChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getToken = this.getToken.bind(this);
        this.onMakeExpense = this.onMakeExpense.bind(this);
        this.onMakeDebt = this.onMakeDebt.bind(this);
        this.onMakeExpense = this.onMakeExpense.bind(this);
        this.api = new DepensesApi();
    }

    onInputExpanseChange(e) {
        let newExpansesEl = parseInt(e.target.value);
        this.setState({ inputExpanse: newExpansesEl });
    }

    onSelectChange(e) {
        let newSelectValue = e.target.value;
        if (newSelectValue === 'debt') {
            this.setState({ selectValue: newSelectValue });
        };
    }

    getToken() {
        return window.localStorage.getItem('x-auth-token')
    }

    async onMakeSettlement(e) {
        e.preventDefault();

        const response = await this.api.makeApiPostRequest("settlements", {
            member: 1,
            settlement_with_member: 1,
            room: 1
        }).then(data => console.log(data));

        this.setState({
            expenseData: [{ member: 'Ala', settlement: true, date: new Date, type: 'settlement' }, ...this.state.expenseData]
        })
    }

    async onMakeDebt(e) {
        e.preventDefault();
        const response = await this.api.makeApiPostRequest("depts", {
            title: 'test-title',
            amount: this.state.inputExpanse,
            room: 1,
            from_member: 1,
            to_member: 2
        })

        this.setState({
            expenseData: [{ member: 'Ala', amount: this.state.inputExpanse, date: new Date, type: 'dept', from_member_name: 1, to_member_name: 2 }, ...this.state.expenseData
            ]
        })
    }

    async onMakeExpense(e) {
        const response = await this.api.makeApiPostRequest("spendings", {
            amount: this.state.inputExpanse,
            title: 'test-title',
            room: 1,
            member: 1
        }).then(data => console.log(data));

        this.setState({
            expenseData: [{ member: 'Ala', amount: this.state.inputExpanse, date: new Date, type: 'spending' }, ...this.state.expenseData]
        })
    }

    async componentDidMount() {
        try {
            const getData = await this.api.getDataHistory(1);
            this.setState({
                expenseData: [...this.state.expenseData, ...getData.data]
            })
        }
        catch (err) {
            if (!err.response) {
                this.setState({ error: 'Unknown error' });
                console.log('Unknown error');
            } else if (err.response.status === 500) {
                this.setState({ error: 'Server error' })
                console.log('Server error');
            } else {
                this.setState({ error: 'Bad Request' })
                console.log('Bad Request');
            }
        }

        const responseMembers = await axios.get('http://127.0.0.1:8000/api/v1/room/1/members/',
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            }
        )

        const responseState = await axios.get('http://127.0.0.1:8000/api/v1/room/1/state/',
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            }
        )
        this.setState({ roomMembers: responseMembers.data, roomState: responseState.data });

    }


    getDate(date) {
        var newDate = new Date(date);

        var day = newDate.getDate().toString();
        var month = newDate.getMonth().toString();
        var year = newDate.getFullYear().toString();

        return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year.padStart(2, '0')}`;
    }




    render() {
        return (
            <div>
                <NavBarComponent />
                <div className="container-fluid mainpage" >
                    <div className="row-mainpage">
                        <div className="content-row container">
                            <div className="row">
                                <h1 className="text-center">Budget in October 2020</h1>
                                <div className="card-expenses">
                                    {
                                        this.state.roomMembers.map((member, i) => {
                                            return <CardWithExpenses
                                                key={i}
                                                member={member}
                                                debt={this.state.roomState[member.name]}
                                            />
                                        })
                                    }
                                </div>
                                <div className="settlements">
                                    <button className="btn btn-outline-dark" id="settlement" onClick={this.onMakeSettlement}>Pay off</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row-mainpage">
                        <div className="content-row container">
                            <AddNewExpanseOrDebt value={this.state.selectValue}
                                onSelectChange={this.onSelectChange}
                                onMakeExpense={this.onMakeExpense}
                                onMakeDebt={this.onMakeDebt}
                                onInputExpanseChange={this.onInputExpanseChange} />
                            {this.state.error ?
                                <Error message={this.state.error} /> : null
                            }
                        </div>
                    </div>
                    <div className="row-mainpage">
                        <div className="content-row container">
                            <h1 className="text-center">Your History Expanses</h1>
                            <History className="text-center" expenseData={this.state.expenseData} getDate={this.getDate} />
                        </div>
                    </div>
                </div >
            </div >

        );
    }
}



export default MainPage;
