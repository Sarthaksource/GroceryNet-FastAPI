import React, {useState} from 'react'
import ManageProductsHeader from '../components/ManageProductsHeader.jsx'
import ManageProductsModal from '../components/ManageProductsModal.jsx'
import ManageProductsContent from '../components/ManageProductsContent.jsx'

const ManageProducts = () => {
  	const [refreshProducts, setRefreshProducts] = useState(false);
	const [products, setProducts] = useState([]);

	return (
		<div className="container mt-5">
			<h2>Manage Products</h2>
			<hr />
			<ManageProductsHeader setProducts={setProducts} />
			<ManageProductsModal setRefreshProducts={setRefreshProducts} />
			<ManageProductsContent setRefreshProducts={setRefreshProducts} refreshProducts={refreshProducts} products={products} setProducts={setProducts} />
		</div>
		);
}

export default ManageProducts;