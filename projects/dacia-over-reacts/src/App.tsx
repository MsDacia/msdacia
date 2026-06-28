import '@davidanddacia/react-ui-components/styles.css'
import './media/styles/main.scss'

import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom'

import content from './media/json/static.en-us.json'
import About from './pages/About'
import Footer from './pages/Footer'
import Header, { MenuItem } from './pages/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Resume from './pages/Resume'

const menuItems: MenuItem[] = content.common.navigation ?? []

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	)
}

const AppContent = () => {
	const location = useLocation()
	const routeClass = location.pathname === '/' ? 'home' : location.pathname.replace('/', '')

	return (
		<div className="wrapper">
			<div className="container">
				<div className="overlay" />
				<Header items={menuItems} />

				<main>
					<div className={`main-content ${routeClass}`}>
						<Routes>
							<Route
								element={<About />} path="/about"
							/>
							<Route
								element={<Portfolio />} path="/portfolio"
							/>
							<Route
								element={<Resume />} path="/resume"
							/>
							<Route
								element={<Home />} path="/"
							/>
						</Routes>
					</div>
				</main>

				<Footer />
			</div>
		</div>
	)
}

export default App
