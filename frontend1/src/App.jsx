import { useState } from 'react'
import './App.css'
import SignupPage from './components/signuppage' // Import the component with PascalCase
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <SignupPage /> {/* Use the component with PascalCase */}
    </div>
  )
 
}

export default App
