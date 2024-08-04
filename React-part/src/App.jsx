import { Navigate, Route, Routes } from "react-router-dom"
import { useContext } from "react"

import { AuthenticationContextProvider } from "./user/AuthenticationContext"
import Header from "./header/Header"
import Home from "./home/Home"
import Login from "./user/Login"
import Register from "./user/Register"
import Logout from "./user/Logout"
import CoursesAll from "./course/CoursesAll"
import CourseCreate from "./course/CourseCreate"
import CourseDetails from "./course/CourseDetails"
import ProtectedRoute from "./user/ProtectedRoute"
import CourseEdit from "./course/CourseEdit"

function App() {

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
            <Route path='/courses/:courseId/details' element={<CourseDetails />} />
            <Route element={<ProtectedRoute />} >
              <Route path='/courses/create' element={<CourseCreate />} />
              <Route path='/courses/:courseId/edit' element={<CourseEdit />} />
            </Route>
          </Routes>
        </main>
      </AuthenticationContextProvider>
    </>
  )
}

export default App

