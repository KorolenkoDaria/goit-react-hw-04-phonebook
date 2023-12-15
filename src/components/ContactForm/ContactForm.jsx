import { useState } from 'react';
import { nanoid } from 'nanoid'

import {Label, Input, Form, Field, Button } from "./ContactForm.styled"

const ContactForm = ({handleAddContact}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = (evt) => {
    
    if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else if (evt.target.name === 'number') {
      setNumber(evt.target.value);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const contactData = {
        name,
        number,
        id: nanoid(),
    }
        setName('')
        setNumber('')
 
    handleAddContact(contactData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
          <Label htmlFor='user-name'> Name </Label>
            <Input onChange={handleInputChange} value={name} id='user-name' type="text" name="name" required />
        </Field>
        <Field>
          <Label htmlFor='user-phone'> Phone number </Label>
          <Input onChange={handleInputChange} value={number} id='user-phone' type="tel" name="number" required />
        </Field>
        <Button type='submit'>Add contact</Button>
  </Form>
)
}

export default ContactForm;