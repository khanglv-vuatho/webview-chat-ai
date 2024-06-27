import { Route, Routes } from 'react-router-dom'

import InvalidPage from './pages/invalid'
import Home from './pages'
import { Test } from './pages/test'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/invalid', element: <InvalidPage /> },
  { path: '/test', element: <Test /> }
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
