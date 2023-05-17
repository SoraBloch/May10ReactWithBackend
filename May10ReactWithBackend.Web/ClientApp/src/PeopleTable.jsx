import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddEditPersonForm from './AddEditPersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        selectedPeople: [],
        editForm: false,
        editId: 0
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
        console.log("delete");
        axios.post('/api/people/delete', { id }).then(response => {
            this.getAllPeople();
            console.log(response);
        })
    }

    onEditClick = (p) => {
        const { editForm } = this.state;
        this.setState({ editForm: true });
        this.setState({ editId: p.id });
        console.log(editForm);
        this.setState({
            person: {
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age
            }
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', { ...this.state.person, id: this.state.editId }).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
            this.setState({editForm: false })
        })
    }

    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        });
        this.setState({ editForm: false })
    }

    onCheckChange = (p) => {
        const { selectedPeople } = this.state;
        if (selectedPeople.includes(p)) {
            this.setState({ selectedPeople: selectedPeople.filter(person => person !== p) });

        }
        else {
            this.setState({ selectedPeople: [...selectedPeople, p] });
        }
    }

    onDeleteAllClick = () => {
        console.log(ids);
        axios.post('/api/people/deleteall', { ids: this.state.people.map(p => p.id) }).then(() => {
            this.getAllPeople();
        })
    }

    onCheckAllClick = () => {
        this.setState({ selectedPeople: [...this.state.people] })
    }

    onUncheckAllClick = () => {
        this.setState({ selectedPeople: [] })
    }

    render() {
        const { id, firstName, lastName, age } = this.state.person;
        const { people, selectedPeople, editForm } = this.state;
        return <div className="container mt-5">
            <div >
                <AddEditPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onCancelClick={this.onCancelClick}
                    onUpdateClick={this.onUpdateClick}
                    editForm={editForm}
                />
            </div>
            <div>
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button onClick={ this.onDeleteAllClick} className="btn btn-danger w-100">Delete All</button>
                                <button onClick={this.onCheckAllClick} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                <button onClick={this.onUncheckAllClick} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow
                            key={p.id}
                            person={p}
                            onDeleteClick={() => this.onDeleteClick(p.id)}
                            onEditClick={() => this.onEditClick(p)}
                            onCheckChange={() => this.onCheckChange(p)}
                            isChecked={selectedPeople.includes(p)}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>


    }
}

export default PeopleTable;