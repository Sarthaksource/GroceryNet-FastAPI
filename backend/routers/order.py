from fastapi import APIRouter, Depends
from .. import schemas, sql_connection
from sqlalchemy.orm import Session
from ..repository import order_dao
from typing import List

router = APIRouter(
	prefix='/order',
	tags=['order']
)

get_db = sql_connection.get_db

@router.get("/getAll", response_model=List[schemas.Orders])
def getAll(db: Session = Depends(get_db)):
	return order_dao.get_orders(db)

@router.get("/getDetails", response_model=List[schemas.OrderDetails])
def getDetails(order_id: int, db: Session = Depends(get_db)):
	return order_dao.get_order_details(order_id, db)

@router.post("/add")
def add(request: schemas.FullOrder, db: Session = Depends(get_db)):
	return order_dao.insert_new_order(request, db)

@router.post("/deleteDetails")
def deleteDetails(request: schemas.OrderDetailDeleteRequest, db: Session = Depends(get_db)):
	return order_dao.delete_order_detail(request, db)

@router.post("/delete")
def delete(request: schemas.OrderDeleteRequest, db: Session = Depends(get_db)):
	return order_dao.delete_order(request, db)