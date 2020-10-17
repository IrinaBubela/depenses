import React from 'react';
import CardWithExpenses from './components/mainpage/CardWithExpenses';
import axios from 'axios';
import History from './components/mainpage/History';
import NavBarComponent from './components/mainpage/NavBarComponent';
import AddNewExpanse from './components/mainpage/AddNewExpanse';
import Error from './Error';

import DepensesApi from './api';


class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            expenseData: [],
            inputExpanse: '',
            settlement: false,
            debt: 0,
            error: false,
            roomMembers: [],
            roomState: {}
        }
        this.onInputExpanseChange = this.onInputExpanseChange.bind(this);
        this.onInputDebtChange = this.onInputDebtChange.bind(this);
        this.getDate = this.getDate.bind(this);
        this.onMakeExpense = this.onMakeExpense.bind(this);
        this.onMakeSettlement = this.onMakeSettlement.bind(this);
        this.getToken = this.getToken.bind(this);
        this.onMakeDebt = this.onMakeDebt.bind(this);
        this.api = new DepensesApi();
    }

    onInputExpanseChange(e) {
        let newExpansesEl = parseInt(e.target.value);
        this.setState({ inputExpanse: newExpansesEl });
    }
    onInputDebtChange(e) {
        let newDebtEl = parseInt(e.target.value);
        this.setState({ debt: newDebtEl });
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

    async onMakeExpense(e) {
        e.preventDefault();

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

    async onMakeDebt(e) {
        e.preventDefault();

        const response = await this.api.makeApiPostRequest("depts", {
            title: 'test-title',
            amount: this.state.debt,
            room: 1,
            from_member: 1,
            to_member: 2
        })

        this.setState({
            expenseData: [{ member: 'Ala', amount: this.state.debt, date: new Date, type: 'dept', from_member_name: 1, to_member_name: 2 }, ...this.state.expenseData,
            ]
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
                    <div className="container" >
                        <div className="row">
                            <div className="col-12 content-row">
                                <h1>Budget in October 2020</h1>
                                <p>Room CZEBOTODREL</p>
                                <div className="card-expenses">
                                    {
                                        this.state.roomMembers.map((member, i) => {
                                            return <CardWithExpenses
                                                key={i}
                                                onMakeDebt={this.onMakeDebt}
                                                onInputDebtChange={this.onInputDebtChange}
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
                        <div className="container" >
                            <div className="row">
                                <div className="col-12 content-row">
                                    <h1>Your History Expanses</h1>
                                    <AddNewExpanse onMakeExpense={this.onMakeExpense} onInputExpanseChange={this.onInputExpanseChange} />
                                    {this.state.error ?
                                        <Error message={this.state.error} /> : null
                                    }
                                    <History expenseData={this.state.expenseData} getDate={this.getDate} />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div>

        );
    }
}



export default MainPage;
