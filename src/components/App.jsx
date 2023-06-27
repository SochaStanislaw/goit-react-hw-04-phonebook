import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { NewContact } from './NewContact';
import { ListContact } from './ListContact';
import { FilterContact } from './FilterContact';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  addNewContact = ({ name, number }) => {
    this.setState(({ contacts }) => {
      const contactExists = contacts.find(contact => contact.name === name);

      if (contactExists) {
        alert(`homie "${name}" is already existing on your phone list!`);
        return contacts;
      } else {
        const makeNewContact = {
        id: nanoid(),
        name,
        number,
      };
        return {
          contacts: [makeNewContact, ...contacts],
        };
      }
    });
  };

  removeExistingContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = change => {
    this.setState({ filter: change.currentTarget.value });
  };

  showFilterContacts = () => {
    const makeLowerCase = this.state.filter.toLowerCase();

    return this.state.contacts
      .map(
        contact =>
          contact.name.toLowerCase().includes(makeLowerCase) && contact
      )
      .filter(contact => contact !== false);
  };

  // LOCAL STORAGE:
  // Wywoływana jest zaraz po zamontowaniu komponentu w DOM
  componentDidMount() {
    const savedContacts = localStorage.getItem('saved contacts');
    const toParse = JSON.parse(savedContacts);

    if (toParse) {
      this.setState({ contacts: toParse });
    }
  };

  // Wywołuje się zaraz po aktualizacji komponentu w DOM.
  // Nie wywołuje się podczas montowania komponentu.
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('saved contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    return (
      <div>
        <p>your best contact's list:</p>
        <p>type data and click button to add new contact to your list</p>
        <NewContact
          onSubmit={this.addNewContact}
        />
        <p>can't find your contact? type name below:</p>
        <FilterContact
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <p>contact' list of yours homies:</p>
        <ListContact
          contacts={this.showFilterContacts()}
          removeContact={this.removeExistingContact}
        />
      </div>
    );
  }
}
