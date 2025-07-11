import React, { useState, useEffect } from 'react';
import api from '../api.jsx';

const ManageProductsContent = ({ refreshProducts, products, setProducts }) => {
	const getProductsRequest = async () => {
		try {
			const response = await api.get("product/getAll");
			setProducts(response.data);
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const deleteProductRequest = async (pid) => {
		try{
			const payload = {
			    product_id: parseInt(pid)
			}
			const response = await api.post("product/delete", payload);
			getProductsRequest();
		}
		catch(error){
			console.error("Error: ", error);
		}
	}

	useEffect(() => {
		getProductsRequest();
	}, [refreshProducts]);

	return (
		<>
			{products.length ? (
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Sno</th>
							<th scope="col">Name</th>
							<th scope="col">Unit</th>
							<th scope="col">Price Per Unit</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr key={product.product_id}>
								<th>{index + 1}</th>
								<td>{product.name}</td>
								<td>{product.uom_name}</td>
								<td>{product.price_per_unit}</td>
								<td>
									<button className="btn btn-outline-danger btn-sm bi bi-trash" onClick={()=>{deleteProductRequest(product.product_id)}}></button> 
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="alert alert-secondary" role="alert">
					No products found!
				</div>
			)}
		</>
	);
};

export default ManageProductsContent;
