import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Landingpage from "./LandingPage/Landingpage"
import Assessment from "./Assessment/Assessment"
import Result from "./Result/Result"
import Chatbot from "./ChatBot/Charbot"

function App() {
  return (
    <Router>
      <Routes>
        <Route>
            <Route path="/" element={<Landingpage />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/chat/:assessmentId" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
