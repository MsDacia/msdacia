import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import content from './media/json/static.en-us.json'
import 'semantic-ui-css/semantic.min.css'
import './media/styles/main.scss'
import './media/styles/mui-override.scss'

import Footer from './pages/Footer'
import Header, { MenuItem } from './pages/Header'

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
				<div className="overlay"></div>
				<Header items={menuItems} />

				<main>
					<div className={`main-content ${routeClass}`}>
						<Routes>
							<Route path="/about" element={<About />} />
							<Route path="/portfolio" element={<Portfolio />} />
							<Route path="/" element={<Home />} />
						</Routes>
					</div>
				</main>

				<Footer />
			</div>
		</div>
	)
}

export default App
