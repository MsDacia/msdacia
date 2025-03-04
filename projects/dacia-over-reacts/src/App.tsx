import content from './json/static.en-us.json'
import 'semantic-ui-css/semantic.min.css'
import './styles/scss/main.scss'

import Footer from './pages/Footer'
import Header, { MenuItem } from './pages/Header'

const menuItems: MenuItem[] = content.common.navigation

function App() {
	return (
		<div className="wrapper">
			<div className="container">
				<div className="overlay"></div>
				<Header items={menuItems} />

				<main>
					<div className="main-content" />
				</main>

				<Footer />
			</div>
		</div>
	)
}

export default App
