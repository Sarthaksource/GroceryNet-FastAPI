import React, { useState, useEffect } from 'react';
import api from '../api.jsx';

const NewOrderContent = ({customerId, refreshOrders, setRefreshOrders}) => {
	const [orderDetails, setOrderDetails] = useState([]);
	const [finalTotalPrice, setFinalTotalPrice] = useState(0);

	const getOrderDetailRequest = async () => {
		try{
			const response = await api.get("order/getDetails", {params: {order_id: parseInt(customerId)}});
			setOrderDetails(response.data);
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	const deleteOrderDetailRequest = async (od) => {
		try{
			const payload = {
				order_id: parseInt(od.order_id),
			    product_id: parseInt(od.product_id),
			    quantity: parseFloat(od.quantity),
			    total_price: parseFloat(od.total_price)
			}
			const response = await api.post("order/deleteDetails", payload);
			getOrderDetailRequest();
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	useEffect(() => {
		getOrderDetailRequest()
	}, [refreshOrders]);

	useEffect(() => {
		if (orderDetails.length > 0) {
			const total = orderDetails.reduce((acc, od) => acc + od.total_price, 0);
			setFinalTotalPrice(total);
		}
	}, [orderDetails]);


	return (	
	  <>		
	    {orderDetails.length ? (
	    <>
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
	          {orderDetails.map((od, index)=>{
	            return (<tr>
	              <th>{ index+1 }</th>
	              <td>{ od.name }</td>
	              <td>{ od.quantity }</td>
	              <td>{ od.total_price }</td>
	              <td>
	                <button className="btn btn-outline-danger btn-sm bi bi-trash" onClick={() => {deleteOrderDetailRequest(od)}}></button>
	              </td>
	            </tr>);
	          })}
	        </tbody>
	      </table>	
	      <table className="table table-bordered mt-5">
	        <tbody>
		        <tr>
		          <th>
		            <div className="d-flex justify-content-between">
		              <h5>Total</h5>	
		              <h5>{finalTotalPrice}</h5>	
		            </div>
		          </th>
		        </tr>
		    </tbody>
	      </table>
	    </>
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

export default NewOrderContent;