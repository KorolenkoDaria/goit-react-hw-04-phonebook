import { useState, useEffect } from "react";

import { Wrapper, H1, H2, } from "./App.styled";

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from "components/ContactList/ContactList";
import Filter from "components/Filter/Filter";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const stringifiedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    setContacts([...parsedContacts]);
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem("contacts", stringifiedContacts);
  }, [contacts])

  const handleAddContact = (contactData) => {
    const addedContacts = contacts.find(contact => contact.name === contactData.name);
    if (addedContacts) {
     return alert(`${contactData.name} is already in contacts!`);
    }
    setContacts(prevState => [...prevState, contactData]);
  } 
  
  const deleteContact = (id) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }

  const handleFilter = (evt) => {
    const value = evt.currentTarget.value;
    setFilter(value);
  }

  const filterContacts = () => {
    const filterNomal = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterNomal));
  }

    return (
      <Wrapper>
        <H1>Phonebook</H1>
        <ContactForm handleAddContact={handleAddContact} />
        <H2>Contacts</H2>
        <Filter handleFilter={handleFilter} value={filter}></Filter>
        <ContactList contacts={filterContacts()} deleteContact={deleteContact}></ContactList>
      </Wrapper>
    );

}
export default App;


