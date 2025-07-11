import React from 'react'
import {useLocation, Link} from 'react-router-dom'

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="">GroceryNet</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname=='/' ? 'active' : ''}`} to="/">Dashboard</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname=='/manage_products' ? 'active' : ''}`} to="/manage_products">Products</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar