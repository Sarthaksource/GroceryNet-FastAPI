import React, {useState, useEffect} from 'react'
import api from '../api.jsx'

const DashboardContent = () => {
	const [orders, setOrders] = useState([]);

	const getOrderRequest = async () => {
		try{
			const response = await api.get("order/getAll");
			setOrders(response.data);
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	const deleteOrderRequest = async (order_id) => {
		try{
			const payload = {
				order_id: parseInt(order_id)
			}
			const response = await api.post("order/delete", payload);
			getOrderRequest();
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	useEffect(() => {
		getOrderRequest()
	}, []);

	return (
		<>
		{orders.length ? (
			<table className="table table-bordered">
				<thead>
					<tr>
						<th scope="col">Sno</th>
						<th scope="col">Name</th>
						<th scope="col">Quantity</th>
						<th scope="col">Total Price</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index)=>{
						return (
						<tr key={order.order_id}>
							<th>{ index+1 }</th>
							<td>{ order.customer_name }</td>
							<td>{ order.date }</td>
							<td>{ order.total_cost }</td>
							<td>
								<button className="btn btn-outline-danger btn-sm bi bi-trash" onClick={()=>{deleteOrderRequest(order.order_id)}}></button>
							</td>
						</tr>
						)
					})}
				</tbody>
			</table>	
		)
		:
		(
			<div className="alert alert-secondary" role="alert">
				No order found!
			</div>
		)}
		</>		
	);
}

export default DashboardContent;