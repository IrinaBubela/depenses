import React from 'react';
import History from './components/mainpage/History';
import NavBarComponent from './components/mainpage/NavBarComponent';
import AddNewExpanseOrDebt from './components/mainpage/AddNewExpanseOrDebt';
import Cards from './components/mainpage/Cards';
import Error from './Error';
import DepensesApi from './api';


class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            expenseData: [],
            inputExpanse: '',
            inputDescriptionExpanse: '',
            inputDescriptionDebt: '',
            settlement: false,
            selectValue: 'expanses',
            error: false,
            actualUser: '',
            roomMembers: [],
            roomMembersWithoutMe: [],
            roomState: {},
            selectedDebtMemberId: {},
            selectedDebtMemberName: {},
            selectedSettlementMember: {}

        }
        this.onInputExpanseChange = this.onInputExpanseChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getToken = this.getToken.bind(this);
        this.onMakeExpense = this.onMakeExpense.bind(this);
        this.onMakeDebt = this.onMakeDebt.bind(this);
        this.onMakeSettlement = this.onMakeSettlement.bind(this);
        this.updateResponseState = this.updateResponseState.bind(this);
        this.onSelectDebtUserChange = this.onSelectDebtUserChange.bind(this);
        this.onSelectSettlementUserChange = this.onSelectSettlementUserChange.bind(this);
        this.getMemberNameById = this.getMemberNameById.bind(this);
        this.onInputDescriptionExpanseChange = this.onInputDescriptionExpanseChange.bind(this);
        this.onInputDescriptionDebtChange = this.onInputDescriptionDebtChange.bind(this);
        this.api = new DepensesApi();
    }

    onInputExpanseChange(e) {
        let newExpansesEl = parseInt(e.target.value);
        this.setState({ inputExpanse: newExpansesEl });
    }

    onInputDescriptionExpanseChange(e) {
        let newExpansesEl = e.target.value;
        this.setState({ inputDescriptionExpanse: newExpansesEl });
    }

    onInputDescriptionDebtChange(e) {
        let newExpansesEl = e.target.value;
        this.setState({ inputDescriptionDebt: newExpansesEl });
    }

    onSelectChange(e) {
        let newSelectValue = e.target.value;
        this.setState({ selectValue: newSelectValue });
    }

    onSelectDebtUserChange(e) {
        let newSelectValue = e.target.value;
        this.setState({
            selectedDebtMemberId: newSelectValue.id,
            selectedDebtMemberName: newSelectValue.name
        });
    }

    getMemberNameById(memberId) {
        return this.state.roomMembers.filter(member => member.id === memberId)[0];
    }

    onSelectSettlementUserChange(e) {
        const selectedMemberId = parseInt(e.target.value);
        const selectedMember = this.getMemberNameById(selectedMemberId);

        this.setState({
            selectedSettlementMember: selectedMember,
        });
    }

    getToken() {
        return window.localStorage.getItem('x-auth-token')
    }

    async onMakeSettlement(e) {
        e.preventDefault();

        const response = await this.api.makeApiPostRequest("settlements", {
            member: this.state.actualUser.id,
            member_name: this.state.selectedSettlementMember.name,
            settlement_with_member: this.state.selectedSettlementMember.id,
            settlement_with_member_name: this.state.selectedSettlementMember.name,
            room: 1
        }).then(data => console.log(data));

        this.setState({
            expenseData: [{
                member: this.state.actualUser.id,
                member_name: this.state.actualUser.name,
                settlement_with_member: this.state.selectedSettlementMember.name,
                settlement_with_member_name: this.state.selectedSettlementMember.name,
                settlement: true, date: new Date, type: 'settlement'
            }, ...this.state.expenseData]
        })

        this.updateResponseState()
    }

    async onMakeDebt(e) {
        e.preventDefault();
        const response = await this.api.makeApiPostRequest("depts", {
            title: this.state.inputDescriptionDebt,
            member: parseInt(this.state.actualUser.id),
            amount: this.state.inputExpanse,
            from_member: parseInt(this.state.actualUser.id),
            to_member: this.state.selectedDebtMember.id,
            room: 1
        })

        this.setState({
            expenseData: [{
                member: this.state.actualUser.id,
                amount: this.state.inputExpanse,
                from_member_name: this.state.actualUser.name,
                to_member_name: this.state.selectedDebtMember.name,
                title: this.state.inputDescriptionDebt,
                date: new Date,
                type: 'dept'
            },
            ...this.state.expenseData
            ]
        })
        this.updateResponseState()
    }

    async onMakeExpense(e) {
        const response = await this.api.makeApiPostRequest("spendings", {
            amount: this.state.inputExpanse,
            title: this.state.inputDescriptionExpanse,
            member: this.state.actualUser.id,
            room: 1,
        }).then(data => console.log(data));

        this.setState({
            expenseData: [{
                amount: this.state.inputExpanse,
                title: this.state.inputDescriptionExpanse,
                member_name: this.state.actualUser.name,
                date: new Date,
                type: 'spending'
            }, ...this.state.expenseData]
        })
        this.updateResponseState()
    }

    async componentDidMount() {
        this.updateResponseState();
        try {
            const getHistoryDataResponse = await this.api.getHistoryData(1);
            this.setState({
                expenseData: [...this.state.expenseData, ...getHistoryDataResponse.data]
            })
            const getActualUserNameResponse = await this.api.getActualUserName(1);
            this.setState({
                actualUser: getActualUserNameResponse.data
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

        const roomMembersWithoutMe = this.state.roomMembers.filter((member) => {
            return member.name !== this.state.actualUser.name;
        })



        this.setState({
            roomMembersWithoutMe: roomMembersWithoutMe,
            selectedDebtMember: roomMembersWithoutMe[0]
        })
    }

    async updateResponseState() {
        const responseMembers = await this.api.getResponseMembers(1);
        const responseState = await this.api.getResponseState(1);
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
                                <Cards roomMembers={this.state.roomMembers} roomState={this.state.roomState} />
                            </div>
                        </div>
                    </div>
                    <div className="row-mainpage">
                        <div className="content-row container">
                            <AddNewExpanseOrDebt value={this.state.selectValue}
                                onSelectChange={this.onSelectChange}
                                onMakeExpense={this.onMakeExpense}
                                onMakeDebt={this.onMakeDebt}
                                onMakeSettlement={this.onMakeSettlement}
                                onInputExpanseChange={this.onInputExpanseChange}
                                onInputDescriptionExpanseChange={this.onInputDescriptionExpanseChange}
                                onInputDescriptionDebtChange={this.onInputDescriptionDebtChange}
                                roomMembersWithoutMe={this.state.roomMembersWithoutMe}
                                actualUserName={this.state.actualUser.name}
                                onSelectDebtUserChange={this.onSelectDebtUserChange}
                                onSelectSettlementUserChange={this.onSelectSettlementUserChange} />
                            {this.state.error ?
                                <Error message={this.state.error} /> : null
                            }
                        </div>
                    </div>
                    <div className="row-mainpage">
                        <div className="content-row container">
                            <h1 className="text-center">Your History Expanses</h1>
                            <History className="text-center" expenseData={this.state.expenseData} getDate={this.getDate} description={this.state.inputDescriptionExpanse} />
                        </div>
                    </div>
                </div >
            </div >

        );
    }
}



export default MainPage;
