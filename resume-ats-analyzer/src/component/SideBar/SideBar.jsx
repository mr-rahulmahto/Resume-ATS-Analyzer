import React from "react";
import "./SideBar.css";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestoreIcon from '@mui/icons-material/Restore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link , useLocation  , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const SideBar = () => {
    const location = useLocation()

    const navigate = useNavigate();

    const {setLogin , userInfo , setUserInfo} = useContext(AuthContext)

    const handleLogout = () =>{
      localStorage.clear();
      setLogin(false);
      setUserInfo(null);
      navigate('/')

    }

  return (
    <div className="sidebar">
      <div className="sideBarIcon">
        <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className="sideTopContent">Resume Screening</div>
      </div>

      <div className="sideBarOptionBlock">


<Link 
  to="/dashboard" 
  className={`sideBarOption ${location.pathname === '/dashboard'? 'active' : ''}`}
>
  <DashboardIcon sx={{ fontSize: 22 }} />
  <div>Dashboard</div>
</Link>


                <Link to = {'/history'} className={`sideBarOption ${location.pathname === '/history'? 'active' : ''}`}>
          <RestoreIcon sx={{ fontSize: 22 }} />
          <div>History</div>
        </Link>

        {
          userInfo?.role==='admin' &&<Link to = {'/admin'} className={`sideBarOption ${location.pathname === '/admin'? 'active' : ''}`}>
          <AdminPanelSettingsIcon sx={{ fontSize: 22 }} />
          <div>Admin</div>
        </Link>
        }


                <div onClick = {handleLogout}className={`sideBarOption ${location.pathname === '/'? 'active' : ''}`}>
          <LogoutIcon sx={{ fontSize: 22 }} />
          <div>LogOut</div>
        </div>





      </div>
    </div>
  );
};

export default SideBar;
