import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Resume from './pages/Resume'

const AppRoutes = () => (
	<Router>
		<Routes>
			<Route path="/about" element={<About />} />
			<Route path="/resume" element={<Resume />} />
			<Route path="/portfolio" element={<Portfolio />} />
			<Route path="/" element={<Home />} />
		</Routes>
	</Router>
)

export default AppRoutes
