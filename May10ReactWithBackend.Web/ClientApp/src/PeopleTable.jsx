import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddPersonForm from './AddPersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';
import TitleRow from './TitleRow';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
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

    onDeleteClick = (id) => {
        axios.post('/api/people/delete',  id ).then(() => {
            this.getAllPeople();
        })
    }

    onEditClick = (p) => {
        axios.post('/api/people/edit',  p ).then(() => {
            this.getAllPeople();
        })
    }

    generateTable = () => {
        const { people } = this.state;
        return people.map(p => <PersonRow
            key={p.id}
            person={p}
            onDeleteClick={() => this.onDeleteClick(p.id)}
            onEditClick={() => this.onEditClick(p)}
        />)
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
                        <TitleRow />
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