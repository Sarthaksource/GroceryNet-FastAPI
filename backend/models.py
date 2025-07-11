from sqlalchemy import Column, Integer, String, Double, ForeignKey, DateTime
from .sql_connection import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class Customers(Base):
	__tablename__ = "customers"
	customer_id = Column(Integer, primary_key=True, index=True, nullable=False)
	customer_name = Column(String(45), nullable=False)

class OrderDetails(Base):
	__tablename__ = "order_details"
	order_id = Column(Integer, nullable=False, primary_key=True)
	product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False, primary_key=True)
	quantity = Column(Double, nullable=False)
	total_price = Column(Double, nullable=False)

class Products(Base):
	__tablename__ = "products"
	product_id = Column(Integer, primary_key=True, nullable=False, index=True)
	name = Column(String(45), nullable=False)
	uom_id = Column(Integer, ForeignKey("uom.uom_id"), nullable=False)
	price_per_unit = Column(Double, nullable=False)

class Orders(Base):
	__tablename__ = "orders"
	order_id = Column(Integer, ForeignKey("customers.customer_id"), primary_key=True, index=True)
	customer_name = Column(String(45), nullable=False)
	date = Column(DateTime, default=datetime.utcnow, nullable=False)
	total_cost = Column(Double, nullable=False)

class Uom(Base):
	__tablename__ = "uom"
	uom_id = Column(Integer, primary_key=True, nullable=False, index=True)
	uom_name = Column(String(45), nullable=False)
