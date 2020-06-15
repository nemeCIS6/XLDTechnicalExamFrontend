import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './bootstrap.min.css';
import contactStore from './stores/contactStore';
import { observer } from 'mobx-react';

class App extends Component {

  constructor() {
    super();
    this.columns = [
      {
        Header: "Name",
        accessor: "name",
        minWidth: 1
      },
      {
        Header: "Email",
        accessor: "email",
        minWidth: 1
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        minWidth: 1
      }
    ];

    this.state = {
      editing: false
    }
  }

  componentDidMount() {
    this.listContacts();
  }

  async listContacts() {
    await contactStore.listAsync();
  }

  editContact = (id) => {
    this.setState({ editing: id })
  }

  editSet(name, email, mobile) {
    contactStore.editName = name;
    contactStore.editEmail = email;
    contactStore.editMobile = mobile;
  }

  render() {
    return (
      <>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {contactStore.list.map(contact => {
              return (
                <tr>
                  <th>
                    {
                      this.state.editing === contact.id ?
                        <Input type="text" name="name" defaultValue={contact.name} onChange={e => { contactStore.editName = e.target.value }} />
                        :
                        contact.name
                    }
                  </th>
                  <td>
                    {
                      this.state.editing === contact.id ?
                        <Input type="text" name="email" defaultValue={contact.email} onChange={e => { contactStore.editEmail = e.target.value }} />
                        :
                        contact.email
                    }
                  </td>
                  <td>
                    {
                      this.state.editing === contact.id ?
                        <Input type="text" name="mobile" defaultValue={contact.mobile} onChange={e => { contactStore.editMobile = e.target.value }} />
                        :
                        contact.mobile
                    }
                  </td>
                  <td>
                    {
                      this.state.editing === contact.id ?
                        <Button onClick={e => { e.preventDefault(); contactStore.patchAsync(contact.id); this.setState({ editing: false }) }} color="primary">Submit</Button>
                        :
                        <Button onClick={e => { e.preventDefault(); this.setState({ editing: contact.id }); this.editSet(contact.name, contact.email, contact.mobile) }} disabled={this.state.editing} color="primary">Edit</Button>
                    }
                    <Button onClick={e => { e.preventDefault(); contactStore.deleteAsync(contact.id) }} color="danger" disabled={this.state.editing}>Delete</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {
          contactStore.working ?
            null
            :
            <Form inline onSubmit={e => { e.preventDefault(); contactStore.createAsync() }}>
              <FormGroup>
                <Input type="text" name="name" placeholder="Name" defaultValue={contactStore.addName} onChange={e => { contactStore.addName = e.target.value }} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="email" placeholder="Email" defaultValue={contactStore.addEmail} onChange={e => { contactStore.addEmail = e.target.value }} />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="mobile" placeholder="Mobile" defaultValue={contactStore.addMobile} onChange={e => { contactStore.addMobile = e.target.value }} />
              </FormGroup>
              <Button type="submit" color="primary">Add Contact</Button>
            </Form>
        }

        <ToastContainer />
      </>
    );
  }

}

export default observer(App);
