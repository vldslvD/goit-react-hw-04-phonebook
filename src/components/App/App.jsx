import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container } from 'components/App/App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    let flag = false;
    contacts.forEach(contact => {
      if (name.toLowerCase() === contact.name.toLowerCase()) {
        flag = true;
      }
    });
    if (flag) return alert(`${name} is already in contacts`);
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltered = () => {
    const standartizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(standartizedFilter)
    );
  };
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact}></Form>

      <Filter value={filter} onChange={changeFilter} />
      <h2>Contacts</h2>
      <ContactList
        onDeleteContact={deleteContact}
        filteredContacts={getFiltered()}
      />
    </Container>
  );
};
