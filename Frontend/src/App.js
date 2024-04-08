  import React from 'react'
  import {BrowserRouter,Routes,Route} from 'react-router-dom'
  import Login from './Pages/Login'
  import Sidebar from './Pages/Sidebar'
  import Signupteacher from './Pages/Signupteacher'
  import Header from './Pages/Header'
  import Addcts from './Pages/Addcts'
  import Newsandannc from './Pages/Newsandannc'
  import Allcourses from './Pages/Allcourses'
  import Upcomeing from './Pages/Upcomeing'
  import Viewcourses from './Pages/Viewcourses'
  import Signupstudent from './Pages/Signupstudent'
  import Setting from './Pages/Setting'
  import Students from './Pages/Students'
  import Recorder from "./screens/ScreenShare.jsx"
  import Canvas from "./screens/whiteboard.jsx"
  import LobbyScreen from './Pages/LobbyScreen.jsx'
  import RoomPage from './Pages/room.jsx'
  import { SocketProvider } from './context/SocketContext.js'

  function App() {
    return ( 
      <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Signupteacher' element={<Signupteacher/>}></Route>
          <Route path='/Signupstudent' element={<Signupstudent/>}></Route>
          <Route path='/Sidebar' element={<Sidebar/>}></Route>
          <Route path='/Header' element={<Header/>}></Route>
          <Route path='/Addcts' element={<Addcts/>}></Route>
          <Route path='/Newsandannc' element={<Newsandannc/>}></Route>
          <Route path='/Allcourses' element={<Allcourses/>}></Route>
          <Route path='/Upcomeing' element={<Upcomeing/>}></Route>
          <Route path='/Viewcourses' element={<Viewcourses/>}></Route>
          <Route path='/Setting' element={<Setting/>}></Route>
          <Route path='/Students' element={<Students/>}></Route>
          <Route path='/LobbyScreen' element={<LobbyScreen/>}></Route>
          {/* <Route path='/Recorder' element={<Recorder/>}></Route> */}
          {/* <Route path='/Canvas' element={<Canvas/>}></Route> */}
          <Route path='/room/:roomId' element={<RoomPage/>} /> 
        </Routes>
      </BrowserRouter>
      </SocketProvider>
    )
  }



  export default App