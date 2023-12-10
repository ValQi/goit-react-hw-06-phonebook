import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './FilterSearch/FilterSearch';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (contact) => {
    if (contacts.find((c) => c.name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`Контакт з таким ім'ям вже існує`);
      return;
    }

    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={getFilteredContacts()} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;