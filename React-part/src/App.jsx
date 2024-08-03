import { Navigate, Route, Routes } from "react-router-dom"
import { useContext } from "react"

import { AuthenticationContext, AuthenticationContextProvider } from "./user/AuthenticationContext"
import Header from "./header/Header"
import Home from "./home/Home"
import Login from "./user/Login"
import Register from "./user/Register"
import Logout from "./user/Logout"
import CoursesAll from "./course/CoursesAll"
import CourseCreate from "./course/CourseCreate"
import CourseDetails from "./course/CourseDetails"

function App() {

  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <>
      <AuthenticationContextProvider>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/courses' element={<CoursesAll />} />
            <Route path='/courses/create' element={isAuthenticated ? <CourseCreate /> : <Navigate to='/login' />} />
            <Route path='/courses/:courseId/details' element={<CourseDetails />} />
          </Routes>
        </main>
      </AuthenticationContextProvider>
    </>
  )
}

export default App
