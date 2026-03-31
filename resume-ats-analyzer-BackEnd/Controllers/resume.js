const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const path = require("path");
const { CohereClient } = require("cohere-ai");
const { model } = require("mongoose");
require('dotenv').config();

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;
    // console.log(req.file);
    // console.log(job_desc , user);

    const pdfBuffer = req.file.buffer || null;
    const pdfPath = req.file.path;
    const fs = require("fs");
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    //console.log(pdfData, job_desc);

    const prompt = `
                You are an ATS Resume Analyzer.
                Compare the following resume text with the provided Job Description (JD) and give a match ats score (0-100) and feedback.
            

                Resume:
                ${pdfData.text}

                Job Description:
                ${job_desc}

                Return the Score and a Brief explanation in this format:
                Score: XX
                Reason: ....

        `;
    const response = await cohere.chat({
      model: "command-a-vision-07-2025",
      message: prompt, // ✅ variable not string
      max_tokens: 100, // ✅ correct key name
      temperature: 0.7,
    });

    let result = response.text;
    //console.log(result);

    const match = result.match(/Score:\s*(\d+)/);
    const score = match ? parseInt(match[1] , 10):null;

    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;

    // console.log(score)

    // console.log(reason)

     const newResume = new ResumeModel({
        user,
        resume_name: req.file.originalname,
        job_desc,
        score,
        feedback: reason
     });

     await newResume.save();

     fs.unlinkSync(pdfPath); //remove temp file

     res.status(200).json({message: "Your analysis are ready" , data: newResume});

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server-error", message: err.message });
  }
};



exports.getAllResumeForUser = async(req, res) =>{

    try{

        const { user } = req.params;
        let resume = await ResumeModel.find({user:user}).sort({createdAt: -1});
        return res.status(200).json({message: "Your Previous History" , resume: resume})


    }catch(err){
    console.log(err);
    res.status(500).json({ error: "Server-error", message: err.message });  
    }

}

exports.getAllResumeForAdmin = async(req ,res) => {


    try{
      let resume = await ResumeModel.find({}).sort({createdAt: -1}).populate('user');
      return res.status(200).json({message: "Fetched All User History" , resume: resume});

    }catch(err){
        
    console.log(err);
    res.status(500).json({ error: "Server-error", message: err.message });
    
    }
}