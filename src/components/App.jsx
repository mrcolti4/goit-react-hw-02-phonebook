import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

function isOnList(list, value) {
  const arr = list.map(item => item.name);
  return arr.some(element => {
    return element === value;
  });
}

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onAddContact = contact => {
    if (isOnList(this.state.contacts, contact.name)) {
      alert(`${contact.name} is already on contact list`);
      return;
    }

    const finalContact = { ...contact, id: nanoid() };
    this.setState({ contacts: [finalContact, ...this.state.contacts] });
  };

  onDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase().trim())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.onFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}
