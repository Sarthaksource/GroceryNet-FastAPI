import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import NewOrderModal from '../components/NewOrderModal.jsx'
import NewOrderContent from '../components/NewOrderContent.jsx'


const NewOrder = () => {
	const location = useLocation();
  	const customerName = location.state?.customerName;
  	const customerId = location.state?.customerId;
  	const [refreshOrders, setRefreshOrders] = useState(false);

	return (
		<div className="container mt-5">
			<div className="heading d-flex justify-content-between">
				<h2>New Order</h2>
			</div>
			<hr />
			<div className="d-flex justify-content-between">
				<h4>{ customerName }'s Orders</h4>
				<button className="btn btn-primary mb-3" type="button" data-bs-toggle="modal" data-bs-target="#addOrder">Add New Order</button>
			</div>
			<NewOrderModal customerName={customerName} setRefreshOrders={setRefreshOrders} />
			<NewOrderContent customerId={customerId} refreshOrders={refreshOrders} setRefreshOrders={setRefreshOrders} />
			
		</div>
	);
}

export default NewOrder;