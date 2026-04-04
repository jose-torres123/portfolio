import { Routes, Route } from 'react-router-dom'
import { Layout } from './app/Layout'
import Home from './features/home/Home'
import PortfolioPage from './features/portfolio/pages/PortfolioPage'
import { LoginPage, SignupPage, PrivateRoute } from './features/auth'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        element={
          <Layout>
            <Routes />
          </Layout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<div>Portfolio Detail - TODO</div>} />
        <Route path="/blog" element={<div>Blog - TODO</div>} />
      </Route>
    </Routes>
  )
}
