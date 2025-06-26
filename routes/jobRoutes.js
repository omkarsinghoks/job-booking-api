const router=require('express').Router();
const {
    jobRegisterHandler,
    getAllJobsHandler,
    getJobByIdHandler,
    updateJobHandler,
    deleteJobHandler
} = require('../controllers/jobController');


router.post('/register', jobRegisterHandler );
router.get('/all', getAllJobsHandler);  
router.get('/:id', getJobByIdHandler);
router.put('/:id', updateJobHandler);
router.delete('/:id', deleteJobHandler);

module.exports = router;