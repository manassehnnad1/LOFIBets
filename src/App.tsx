/**
 * @copyright LOFIBets 2026
 * @license Apache-2.0
 */


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import useLenis from './hooks/useLenis'
import HowItWorks from './components/HowItWorks'
import Markets from './components/Markets'
import MyBets from './components/MyBets'

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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/my-bets" element={<MyBets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App