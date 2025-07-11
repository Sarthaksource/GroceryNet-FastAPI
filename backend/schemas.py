from pydantic import BaseModel
from datetime import datetime

class Customers(BaseModel):
	customer_id: int
	customer_name: str

class Orders(BaseModel):
	order_id: int
	customer_name: str
	date: datetime
	total_cost: float

class OrderDetails(BaseModel):
	order_id: int
	product_id: int
	name: str
	quantity: float
	total_price: float

class Products(BaseModel):
	product_id: int
	name: str
	uom_id: int
	price_per_unit: float
	uom_name: str

class Uom(BaseModel):
	uom_id: int
	uom_name: str

class FullOrder(BaseModel):
    product_id: int
    quantity: float
    customer_name: str

class ProductDeleteRequest(BaseModel):
	product_id: int

class OrderDetailDeleteRequest(BaseModel):
    order_id: int
    product_id: int
    quantity: float
    total_price: float

class CustomerCreate(BaseModel):
	customer_name: str

class OrderDeleteRequest(BaseModel):
	order_id: int

class ProductCreate(BaseModel):
	name: str
	uom_id: int
	price_per_unit: float