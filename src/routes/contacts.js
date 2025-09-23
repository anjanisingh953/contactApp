const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');

const Contact = require('../models/contacts');
const { getContacts, getContact, addContactPage, addContact, updateContactPage, deleteContact, updateContact } = require('../controllers/contact');

router.get('/', getContacts)
router.get('/show-contact/:id', getContact)

router.get('/add-contact',addContactPage)

let validationRegistration = [
  body('first_name').notEmpty().withMessage('First Name is required')
  .isLength({min:5}).withMessage('First Name must be at least 5 character'),
  body('last_name').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email id'),
  body('phone').isNumeric().withMessage('Only numberic value allowed'),
  body('address').isEmpty().withMessage('First Name is required')
];


router.post('/add-contact',validationRegistration,addContact)

router.get('/update-contact/:id', updateContactPage)
router.post('/update-contact/:id', updateContact)

router.get('/delete-contact/:id', deleteContact)

module.exports = router;