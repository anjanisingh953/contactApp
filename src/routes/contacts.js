const express = require('express');
const csrf = require('csurf');
const {body, validationResult, cookie } = require('express-validator');
const Contact = require('../models/contacts');
const router = express.Router();

const csrfProtection = csrf({cookie:true});

const { getContacts, getContact, addContactPage, addContact, updateContactPage, deleteContact, updateContact } = require('../controllers/contact');

router.get('/', getContacts)
router.get('/show-contact/:id', getContact)

router.get('/add-contact',csrfProtection,addContactPage)

let validationRegistration = [
  body('first_name').notEmpty().withMessage('First Name is required')
  .isLength({min:5}).withMessage('First Name must be at least 5 character'),
  body('last_name').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email id'),
  body('phone').isNumeric().withMessage('Only numberic value allowed'),
  body('address').notEmpty().withMessage('Address is required')
];


router.post('/add-contact',csrfProtection,validationRegistration,addContact)

router.get('/update-contact/:id', updateContactPage)
router.post('/update-contact/:id', updateContact)

router.get('/delete-contact/:id', deleteContact)

module.exports = router;