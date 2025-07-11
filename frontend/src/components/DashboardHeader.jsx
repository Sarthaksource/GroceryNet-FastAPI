import React, {useState} from 'react'
import api from '../api.jsx'
import {useNavigate} from 'react-router-dom'

const DashboardHeader = () => {
	const [customers, setCustomers] = useState([]);
	const [fetched, setFetched] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState('');
	const [selectedCustomerId, setSelectedCustomerId] = useState(null);
	const navigate = useNavigate();

	const getCustomerRequest = async () => {
		if(fetched) return;
		try{
			const response = await api.get("customer/getAll");
			console.log(response.data);
			setCustomers(response.data);
			setFetched(true);
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	const addCustomerRequest = async (value) => {
		try {
			const payload = {customer_name: value};
			const response = await api.post("customer/add", payload);
			const customerId = response.data.customer_id;
			navigate("/new_order", { state: { customerId, customerName: trimmedName } });
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	const submitHandler = (e) => {
		e.preventDefault();
		const trimmedName = selectedCustomer.trim();
		setSelectedCustomer(trimmedName);

		if (!trimmedName) {
			setSelectedCustomer('');
			alert("Please select a customer");
			return;
		}

		const existingCustomer = customers.find(c => c.customer_name === trimmedName);

		if (!existingCustomer) {
			addCustomerRequest(trimmedName);
		} else {
			const customerId = existingCustomer.customer_id;
			navigate("/new_order", { state: { customerId, customerName: trimmedName } });
		}
	};


	return (
		<>
		<form action="" method="POST" className="userSelect d-flex gap-2" onSubmit={submitHandler}>
			<input list="customers" name="customer" placeholder="Select customer" className="form-control" value={selectedCustomer} required onFocus={getCustomerRequest} onChange={(e)=>{setSelectedCustomer(e.target.value)}}/>
			<datalist id="customers">
				{customers.map((customer, index)=>{
					return <option value={customer.customer_name} key={customer.customer_id} />
				})}
			</datalist>
			<button type="submit" className="btn btn-primary text-nowrap">New Order</button>
		</form>
		</>
	);
}

export default DashboardHeader;