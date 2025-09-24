const mongoose = require('mongoose')
const Contact = require('../models/contacts');
const {body, validationResult } = require('express-validator');


exports.getContacts = async(req,res)=>{
     try {
        // const contacts = await Contact.find({});
        
        const { page = 1,  limit = 3 } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        const result = await Contact.paginate({},options);
        
        // res.send(result);        
        // res.render('home',{contacts});        
        res.render('home',{
            totalDocs:result.totalDocs,
            limit:result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts: result.docs  
        });        

     } catch (error) {
        res.render('500',{message: error});        
     }

}

exports.getContact = async(req,res)=>{
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) return res.render('404',{message: 'Invalid Id'}); 
    try {
        const contact = await Contact.findOne({_id: req.params.id})
        if(!contact) return res.render('404',{message: 'Contact not found.'});
        res.render('show-contact',{contact})        
    } catch (error) {
        res.render('500',{message: error});
    }

}

exports.addContactPage = (req,res)=>{
     res.render('add-contact',{csrfToken:req.csrfToken()})
}

exports.addContact = async(req,res)=>{
console.log('req.body >>>>>',req.body)

    try {
      const error = validationResult(req);
        console.log('errorororor',error);
        
       if(!error.isEmpty()) return res.render('add-contact',{errMessage:error,csrfToken:req.csrfToken()});
    //    if(!error.isEmpty()) return res.send({errMessage:error});

        const { first_name,last_name,email,phone,address} = req.body;
         await Contact.create({
            first_name,last_name,email,phone,address
        })
        res.redirect('/');
    } catch (error) {
            res.render('500',{message: error});
    } 
 }

 exports.updateContactPage = async(req,res)=>{
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) return res.render('404',{message: 'Invalid Id'}); 
    
    try {
        const contact = await Contact.findById(req.params.id)
        if(!contact) return res.render('404',{message: 'Contact not found.'});
        res.render('update-contact',{contact})         
    } catch (error) {
            res.render('500',{message: error});
    }

}

exports.updateContact = async(req,res)=>{ 
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) return res.render('404',{message: 'Invalid Id'}); 
    
    try {
     const contact = await Contact.findByIdAndUpdate(req.params.id,req.body);
     if(!contact) return res.render('404',{message: 'Contact not found.'});
     res.redirect('/')        
    } catch (error) {
       res.render('500',{message: error});
    }

}

exports.deleteContact = async(req,res)=>{ 
   const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId) return res.render('404',{message: 'Invalid Id'}); 
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if(!contact) return res.render('404',{message: 'Contact not found.'});
        res.redirect('/');       
    } catch (error) {
          res.render('500',{message: error});
    }
 
}