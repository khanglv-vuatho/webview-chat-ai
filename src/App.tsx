import { Route, Routes } from 'react-router-dom'

import InvalidPage from './pages/invalid'
import Home from './pages'
import TestPage from './pages/test'
import './style.css'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/invalid', element: <InvalidPage /> },
  { path: '/test', element: <TestPage /> }
]

function App() {
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default App
