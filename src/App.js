import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import Coins from './components/Coins'
import CoinInfo from './components/CoinInfo'

const App = () => {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/exchanges' element={<Exchanges />}/>
        <Route path='/coins' element={<Coins />}/>
        <Route path='/coin/:id' element={<CoinInfo />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App