import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage.tsx"
import { CryptoContextProvider } from "./context/crypto-context.tsx"
import './styles/App.scss'
import MenuNav from './components/MenuNav.tsx'
import ChartPage from './pages/ChartPage.tsx'
import ExchangesPage from './pages/ExchangesPage.tsx'

export default function App(): JSX.Element {
  return (
    <CryptoContextProvider>
      <Router>
      <MenuNav />
      <Routes>
        <Route path='/react-crypto' element={<HomePage />} />
        <Route path='/chart' element={<ChartPage/>} />
        <Route path='/exchanges' element={<ExchangesPage/>} />
      </Routes>
      </Router>
    </CryptoContextProvider>
  )
}
