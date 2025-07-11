from fastapi import APIRouter, Depends
from .. import schemas, sql_connection
from sqlalchemy.orm import Session
from ..repository import customer_dao
from typing import List

router = APIRouter(
	prefix='/customer',
	tags=['customer']
)

get_db = sql_connection.get_db

@router.post("/add")
def add(request: schemas.CustomerCreate, db: Session = Depends(get_db)):
	return customer_dao.insert_new_customer(request, db)

@router.get("/getAll", response_model=List[schemas.Customers])
def getAll(db: Session = Depends(get_db)):
	return customer_dao.get_all_customers(db)