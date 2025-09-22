const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')

router.get('/', async(req,res)=>{
    const contacts = await Contact.find({});
    res.render('home',{contacts});
})

router.get('/show-contact/:id', async(req,res)=>{

const contact = await Contact.findOne({_id: req.params.id})
    // res.send({contact})
    res.render('show-contact',{contact})

})
router.get('/add-contact',(req,res)=>{ res.render('add-contact') })

router.get('/update-contact/:id', async(req,res)=>{

    const contact = await Contact.findById(req.params.id)
    res.render('update-contact',{contact}) 
 
})

router.post('/add-contact', async(req,res)=>{

    try {
        const { first_name,last_name,email,phone,address } = req.body;
         await Contact.create({
            first_name,last_name,email,phone,address
        })
        res.redirect('/');
    } catch (error) {
        console.log('err >>>',err);
                
    } 
 })
router.post('/update-contact/:id', async(req,res)=>{ 
    await Contact.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/')
})
router.get('/delete-contact/:id',async(req,res)=>{ 
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;