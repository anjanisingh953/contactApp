const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const { getContacts, getContact, addContactPage, addContact, updateContactPage, deleteContact, updateContact } = require('../controllers/contact');

router.get('/', getContacts)
router.get('/show-contact/:id', getContact)

router.get('/add-contact',addContactPage)
router.post('/add-contact', addContact)

router.get('/update-contact/:id', updateContactPage)
router.post('/update-contact/:id', updateContact)

router.get('/delete-contact/:id', deleteContact)

module.exports = router;