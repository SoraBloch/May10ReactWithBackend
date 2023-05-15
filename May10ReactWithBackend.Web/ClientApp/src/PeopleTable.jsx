import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddPersonForm from './AddPersonForm';
import axios from 'axios';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        selectedPeople: []
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }

    componentDidMount = () => {
        this.getAllPeople();
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    generateTable = () => {
        const { people } = this.state;
        return people.map(p => <PersonRow key={p.id} person={p} />)
    }


    render() {
        const { id, firstName, lastName, age } = this.state.person;
        const { people, selectedPeople } = this.state;
        return <div className="container mt-5">
            <div >
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick} />
            </div>
            <div>
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTable()}
                    </tbody>
                </table>
            </div>
        </div>


    }
}

export default PeopleTable;