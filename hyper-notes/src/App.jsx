import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Login from './firebase/Login'
import Register from './firebase/Register'
import Notes from './components/Notes'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <main>
            <Header />
            <Home />
          </main>} />
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='notes' element={<Notes/>}/>
      </Routes>
    </>
  )
}

export default App
