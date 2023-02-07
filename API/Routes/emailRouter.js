const { Router } = require('express');
const {footerEmail}= require('../Controllers/emails.js');
const usersRouter = Router();


// Post crear nuevo usuario
usersRouter.post('/emails', async (req, res) => {
    const { email } = req.body;
    // console.log('hola2', email);
    try{
        const newEmails= await footerEmail(email)
        res.status(201).json(newEmails)
    }catch (err) {
        res.status(404).json(err.message);
    }
})



const router = Router();
router.use("/", usersRouter);

module.exports = router;