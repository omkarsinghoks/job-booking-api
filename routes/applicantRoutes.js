const router=require('express').Router();
const {
    createApplicant,getApplicantById
} = require('../controllers/applicantController');

router.post('/register', createApplicant);
router.get('/:id', getApplicantById)
module.exports= router;