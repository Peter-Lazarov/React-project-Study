import { Route, Routes } from "react-router-dom"

import { AuthenticationContextProvider } from "./components/user/AuthenticationContext"
import Header from "./components/header/Header"
import Register from "./components/user/Register"
import Login from "./components/user/Login"

function App() {

  return (
    <>
      <AuthenticationContextProvider>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            {/*<Route path='/' element={<Home />} /> */}
            {/*<Route path='/courses' element={<CourseList />} />
          <Route path='/courses/create' element={<CourseCreate />} />
          <Route path='/courses/:courseId/details' element={<CourseDetails />} /> */}
          </Routes>
        </main>
      </AuthenticationContextProvider>
    </>
  )
}

export default App
