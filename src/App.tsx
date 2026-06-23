/**
 * @copyright LOFIBets 2026
 * @license Apache-2.0
 */


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import useLenis from './hooks/useLenis'

const Home = () => (
  <div>
    <Hero heroImage="/heroimg.png" logoImage="/logoimg.png" />
  </div>
)

const App = () => {

  useLenis()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App