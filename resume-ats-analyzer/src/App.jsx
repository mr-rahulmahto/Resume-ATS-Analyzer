import './App.css'
import Admin from './component/Admin/Admin'
import DashBoard from './component/Dashboard/DashBoard'
import History from './component/History/History'
import Login from './component/Login/Login'
import SideBar from './component/SideBar/SideBar'
import { Routes , Route } from 'react-router-dom'

function App() {
  

  return (
    <div className='outerbox'>
      <SideBar/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<DashBoard/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </div>
  )
}

export default App
