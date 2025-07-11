from sqlalchemy.orm import Session 
from ..models import Products, Uom
from .. import schemas, models

def get_all_products(db: Session):
	response = (
        db.query(
            Products.product_id,
            Products.name,
            Products.uom_id,
            Products.price_per_unit,
            Uom.uom_name
        )
        .join(Uom, Products.uom_id == Uom.uom_id)
        .all()
    )

	return response


def insert_new_product(request: schemas.ProductCreate, db: Session):
	new_product = models.Products(name=request.name, uom_id=request.uom_id, price_per_unit=request.price_per_unit)
	db.add(new_product)
	db.commit()
	db.refresh(new_product)
	return new_product

def get_some_product(pname: str, db: Session):
	response = (
	    db.query(
	        Products.product_id,
	        Products.name,
	        Products.uom_id,
	        Products.price_per_unit,
	        Uom.uom_name
	    )
	    .join(Uom, Products.uom_id == Uom.uom_id)
	    .filter(Products.name.like(f"%{pname}%"))
	    .all()
	)

	return response


def delete_product(request: schemas.ProductDeleteRequest, db: Session):
	product = db.query(models.Products).filter_by(product_id=request.product_id).first()
	if not product:
	    raise HTTPException(status_code=404, detail="Product not found")
	db.delete(product)
	db.commit()

	return "Deleted Successfully"
	