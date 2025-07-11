import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

const SetPageTitle = () => {
	const location = useLocation();

	useEffect(() => {
		switch(location.pathname)
		{
		case '/':
			document.title = "GroceryNet - Dashboard";
			break;
		case '/manage_products':
			document.title = "GroceryNet - Manage Products";
			break;
		default:
			document.title = "GroceryNet";
		}
	}, [location.pathname]);

	return null;
}

export default SetPageTitle;