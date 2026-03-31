import React from "react";
import "./dashboard.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState } from "react";
import axios from "../../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const DashBoard = () => {

 
  const [uploadFileText, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false)
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("")
  const [result, setResult] = useState(null);
  const { userInfo } = useContext(AuthContext)

  const onhandleChangeFile = (e) => {
    //console.log(e.target.file[0]);
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name)
  }

  const onhandleUpload = async () => {
    setResult(null)
    if (!jobDesc || !resumeFile) {
      alert("Please fill Job Description & upload Resume")
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);
    setLoading(true)

    try {
      const result = await axios.post('/api/resume/addResume', formData);
      //console.log(result)
      setResult(result.data.data)
    

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="Dashboard">
      <div className="DashboardLeft">
        <div className="DashboardHeader">
          <div className="DashboardHeaderTitle">Smart Resume Screening</div>
          <div className="DashboardHeaderLargeTitle">Resume Match Score</div>
        </div>

        <div className="alertInfo">
          <div>🔔 Important Instructions :-</div>
          <div className="dashboardInstruction">
            <div>
              📃 Please Paste the complete job description in the "Job
              Description" field before submitting.
            </div>
            <div>📜 Only PDF format (.pdf) resume are accepted.</div>
          </div>
        </div>

        <div className="DashboardUploadResume">
          <div className="DashboardResumeBlock">{uploadFileText}</div>
          <div className="DashboardInputField">
            <label htmlFor="inputField" className="analyzerAIBtn">
              Upload Resume
            </label>
            <input type="file" accept=".pdf" id="inputField" onChange={onhandleChangeFile} />
          </div>
        </div>
        <div className="jobDesc">
          <textarea
            value={jobDesc}
            onChange={(e) => { setJobDesc(e.target.value) }}
            className="textArea"
            placeholder="Paste Your Job Description"
            rows={10}
            cols={50}
          ></textarea>
          <div className="AnalyzerBtn" onClick={onhandleUpload}>Analyze</div>
        </div>
      </div>
      

      <div className="DashBoardRight">
        <div className="DashboardRightTopCard">
          <div>Analyzer With AI </div>
          <img
            className="profileImg"
            src={userInfo?.photoUrl || '../src/assets/user.png'}  // fallback image
            alt="UserImage"
            onError={(e) => {
              e.target.src = '../src/assets/user.png';  // if URL breaks
            }}
          />
          


          <h2>{userInfo?.name}</h2>
         

        </div>

        {
          result &&
          <div className="DashboardRightTopCard">
            <div> Results </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h1>{result?.score}%</h1>
              <CreditScoreIcon sx={{ fontSize: 22 }} />
            </div>
            <div className="feedback">
              <h3>Feedback</h3>
              <p>
                {result?.feedback}

              </p>
            </div>
          </div>

        }


        {
          loading && <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} ></Skeleton>
        }
      </div>

    </div>
  );
};


const DashboardWithAuth = WithAuthHOC(DashBoard);
export default DashboardWithAuth;
