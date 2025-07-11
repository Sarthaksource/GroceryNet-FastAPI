import React, { useState, useEffect } from 'react';
import api from '../api.jsx';

const NewOrderModal = ({customerName, setRefreshOrders}) => {
	const [products, setProducts] = useState([]);
	const [fetched, setFetched] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState('');
	const [quantity, setQuantity] = useState('');

	const getProductRequest = async () => {
		if (fetched) return;
		try {
			const response = await api.get("product/getAll");
			setProducts(response.data);
			setFetched(true);
		} catch (error) {
			console.error("Error fetching products: ", error);
		}
	};

	useEffect(() => {
		getProductRequest();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!selectedProduct || !quantity) {
			alert("Please fill out all fields.");
			return;
		}
		try {
			const payload = {
				product_id: parseInt(selectedProduct),
				quantity: parseFloat(quantity),
				customer_name: customerName
			};
			const response = await api.post('order/add', payload);
			setSelectedProduct('');
			setQuantity('');
			setRefreshOrders(prev => !prev);
		} catch (error) {
			console.error("Error saving order:", error);
		}
	};

	return (
		<div className="modal fade" id="addOrder" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">Add New Order</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="product" className="col-form-label">Product Name</label>
								<select className="form-select" name="product" id="product" required value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
									<option value="" disabled>Select product</option>
									{products.map((product) => (
										<option value={product.product_id} key={product.product_id}>
											{product.name}
										</option>
										))}
								</select>

								<label htmlFor="quantity" className="col-form-label mt-2">Quantity</label>
								<input
									type="number"
									className="form-control"
									id="quantity"
									name="quantity"
									placeholder="Quantity"
									required
									min="1"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
									Close
								</button>
								<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		);
};

export default NewOrderModal;
