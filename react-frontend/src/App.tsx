import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import PropertiesPage from "./pages/PropertiesPage"
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
      </Route>
    </Routes>
  )
}

export default App