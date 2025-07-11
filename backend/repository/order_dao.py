from datetime import datetime
from sqlalchemy.orm import Session
from .. import models, schemas
from ..models import OrderDetails, Products
from fastapi import HTTPException
from sqlalchemy import text, func

def get_order_details(order_id: int, db: Session):
	response = (
        db.query(
            OrderDetails.order_id,
            Products.product_id,
            Products.name,
            OrderDetails.quantity,
            OrderDetails.total_price
        )
        .join(Products, OrderDetails.product_id == Products.product_id)
        .filter(OrderDetails.order_id == order_id)
        .all()
    )

	return response

def get_orders(db: Session):
	response = db.query(models.Orders).all()
	return response

def insert_new_order(request: schemas.FullOrder, db: Session):
	customer = db.query(models.Customers).filter(models.Customers.customer_name == request.customer_name).first()
	product = db.query(models.Products).filter(models.Products.product_id == request.product_id).first()
	if not customer:
	    raise HTTPException(status_code=404, detail="Customer not found")
	if not product:
	    raise HTTPException(status_code=404, detail="Product not found")

	total_price = request.quantity * product.price_per_unit
	new_order_details = models.OrderDetails(order_id=customer.customer_id, product_id=request.product_id, quantity=request.quantity, total_price=total_price)
	db.add(new_order_details)
	db.commit()
	db.refresh(new_order_details)

	total_cost = (
		db.query(func.sum(models.OrderDetails.total_price))
		.filter(models.OrderDetails.order_id == customer.customer_id)
		.scalar() or 0.0
	)
	current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
	new_order = models.Orders(order_id=customer.customer_id, customer_name=request.customer_name, date=current_date, total_cost=total_cost)
	persistent_order = db.merge(new_order)
	db.commit()
	db.refresh(persistent_order)

	return "Data Inserted Successfully"

def delete_order_detail(request: schemas.OrderDetailDeleteRequest, db: Session):
    sql = text("""
        SELECT * FROM order_details
        WHERE order_id = :order_id
          AND product_id = :product_id
          AND quantity = :quantity
          AND total_price = :total_price
        LIMIT 1
    """)
    result = db.execute(sql, {
        "order_id": request.order_id,
        "product_id": request.product_id,
        "quantity": request.quantity,
        "total_price": request.total_price
    }).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="Order detail not found")

    delete_sql = text("""
        DELETE FROM order_details
        WHERE order_id = :order_id
          AND product_id = :product_id
          AND quantity = :quantity
          AND total_price = :total_price
        LIMIT 1
    """)
    db.execute(delete_sql, {
        "order_id": request.order_id,
        "product_id": request.product_id,
        "quantity": request.quantity,
        "total_price": request.total_price
    })
    db.commit()

    order = db.query(models.Orders).filter_by(order_id=request.order_id).first()
    if order:
        order.total_cost -= request.total_price
        order.date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        db.commit()

        if order.total_cost <= 0:
            db.delete(order)
            db.commit()

    return "Deleted Successfully"

def delete_order(request: schemas.OrderDeleteRequest, db: Session):
    order = db.query(models.Orders).filter_by(order_id=request.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()

    return "Deleted Successfully"