import React from 'react'
import DashboardHeader from '../components/DashboardHeader.jsx'
import DashboardContent from '../components/DashboardContent.jsx'

const Dashboard = () => {
	return (
		<div className="container mt-5">
			<div className="heading d-flex justify-content-between">
				<h2>Dashboard</h2>
				<DashboardHeader />
			</div>
			<hr />		
			<DashboardContent />
		</div>
		);
}

export default Dashboard;