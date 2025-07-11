from fastapi import APIRouter, Depends
from .. import schemas, sql_connection
from sqlalchemy.orm import Session
from ..repository import product_dao
from typing import List

router = APIRouter(
	prefix='/product',
	tags=['product']
)

get_db = sql_connection.get_db

@router.get("/getAll", response_model=List[schemas.Products])
def getAll(db: Session = Depends(get_db)):
	return product_dao.get_all_products(db)

@router.get("/getSome", response_model=List[schemas.Products])
def getSome(pname: str, db: Session = Depends(get_db)):
	return product_dao.get_some_product(pname, db)

@router.post("/add")
def add(request: schemas.ProductCreate, db: Session = Depends(get_db)):
	return product_dao.insert_new_product(request, db)

@router.post("/delete")
def delete(request: schemas.ProductDeleteRequest, db: Session = Depends(get_db)):
	return product_dao.delete_product(request, db)