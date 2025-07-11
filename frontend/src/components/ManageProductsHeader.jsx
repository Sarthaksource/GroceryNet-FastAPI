import React, {useState, useEffect} from 'react'
import api from '../api.jsx';

const ManageProductsHeader = ({ setProducts }) => {
	const [searchProduct, setSearchProduct] = useState('');

	const getSomeProductRequest = async () => {
		try {
			const response = await api.get("product/getSome", { params: { pname: searchProduct } });
			setProducts(response.data);
		} catch (error) {
			console.error("Error: ", error);
		}
	}

	useEffect(() => {
		getSomeProductRequest();
	}, [searchProduct])

	return (
		<div className="d-flex gap-2 justify-content-md-end align-items-center mb-3">
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProduct"><i className="bi bi-plus-lg"></i></button>
			<div className="d-flex">
				<input className="form-control me-2" placeholder="Search" name="searchTitle" value={searchProduct} onChange={(e)=>{setSearchProduct(e.target.value)}} aria-label="Search" />
				<button className="btn btn-outline-secondary" onClick={getSomeProductRequest}><i className="bi bi-search"></i></button>
			</div>
		</div>
	);
}

export default ManageProductsHeader;