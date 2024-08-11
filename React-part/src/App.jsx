import { Route, Routes } from "react-router-dom"

import { AuthenticationContextProvider } from "./user/AuthenticationContext"
import Header from "./core/Header"
import Home from "./home/Home"
import Login from "./user/Login"
import Register from "./user/Register"
import Logout from "./user/Logout"
import CoursesAll from "./course/CoursesAll"
import CourseCreate from "./course/CourseCreate"
import CourseDetails from "./course/CourseDetails"
import CourseEdit from "./course/CourseEdit"
import CourseSearch from "./course/CourseSearch"
import Footer from "./core/Foorter"
import PublicRoute from "./user/PublicRoute"
import ProtectedRoute from "./user/ProtectedRoute"

function App() {

  return (
    <>
      <AuthenticationContextProvider>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<PublicRoute />} >
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/logout' element={<Logout />} />
            <Route path='/courses' element={<CoursesAll />} />
            <Route path='/courses/:courseId/details' element={<CourseDetails />} />
            <Route element={<ProtectedRoute />} >
              <Route path='/courses/create' element={<CourseCreate />} />
              <Route path='/courses/:courseId/edit' element={<CourseEdit />} />
            </Route>
            <Route path='/courses/search' element={<CourseSearch />} />
          </Routes>
        </main>
        <Footer />
      </AuthenticationContextProvider>
    </>
  )
}

export default App
