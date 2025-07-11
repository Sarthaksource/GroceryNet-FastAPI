import React, { useState } from 'react';
import api from '../api.jsx';

const ManageProductsModal = ({ setRefreshProducts }) => {
	const [pname, setPname] = useState('');
	const [ppu, setPpu] = useState(0);
	const [unit, setUnit] = useState(2);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!pname || ppu === 0) {
			alert("Please fill out all fields.");
			return;
		}
		try {
			const payload = {
				name: pname,
				uom_id: parseInt(unit),
				price_per_unit: parseFloat(ppu)
			};
			const response = await api.post('product/add', payload);
			setPname('');
			setPpu(0);
			setUnit(2);
			setRefreshProducts(prev => !prev); // <-- fixed typo from `setRefreshOrders`
		} catch (error) {
			console.error("Error saving product:", error);
		}
	};

	return (
		<div className="modal fade" id="addProduct" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Add New Product</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="pname" className="col-form-label">Product Name</label>
								<input
									type="text"
									className="form-control"
									id="pname"
									name="pname"
									placeholder="Product Name"
									value={pname}
									onChange={(e) => setPname(e.target.value)}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="units" className="col-form-label">Unit</label>
								<select
									id="units"
									name="units"
									className="form-control"
									value={unit}
									onChange={(e) => setUnit(e.target.value)}
								>
									<option value="1">Each</option>
									<option value="2">Kg</option>
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="ppu" className="col-form-label">Price Per Unit</label>
								<input
									type="text"
									className="form-control"
									id="ppu"
									name="ppu"
									placeholder="Price Per Unit"
									value={ppu}
									onChange={(e) => setPpu(e.target.value)}
									required
								/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageProductsModal;
