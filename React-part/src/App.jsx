import { Route, Routes } from "react-router-dom"

import Header from "./components/header/Header"

function App() {

  return (
    <>
      <Header />
      <main id="main-content">
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          {/* <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<CourseList />} />
          <Route path='/courses/create' element={<CourseCreate />} />
          <Route path='/courses/:courseId/details' element={<CourseDetails />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
