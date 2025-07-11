import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import SetPageTitle from './components/SetPageTitle.jsx'
import {Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import ManageProducts from './pages/ManageProducts.jsx'
import NewOrder from './pages/NewOrder.jsx'

const App = () => {
  return (
    <>
      <SetPageTitle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage_products" element={<ManageProducts />} />
        <Route path="/new_order" element={<NewOrder />} />
      </Routes>
    </>
  );
}

export default App;