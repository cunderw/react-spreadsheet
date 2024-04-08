import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Spreadsheet from './pages/Spreadsheet/Spreadsheet'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header title="React Spreadsheet" />
      <Routes>
        <Route path="/" element={<Spreadsheet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
