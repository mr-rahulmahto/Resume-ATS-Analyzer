const express = require('express')
const router = express.Router();
const ResumeContoller = require('../Controllers/resume')
const  {upload} = require('../utils/multer')

router.post('/addResume'   , upload.single("resume") , ResumeContoller.addResume)
router.get('/get/:user' , ResumeContoller.getAllResumeForUser)
router.get('/get' , ResumeContoller.getAllResumeForAdmin)


module.exports =router;