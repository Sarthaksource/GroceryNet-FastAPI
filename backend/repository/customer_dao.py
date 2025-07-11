from sqlalchemy.orm import Session
from .. import models, schemas

def get_all_customers(db: Session):
	response = db.query(models.Customers).all()
	return response

def insert_new_customer(request: schemas.CustomerCreate, db: Session):
	new_customer = models.Customers(customer_name=request.customer_name)
	db.add(new_customer)
	db.commit()
	db.refresh(new_customer)
	return new_customer