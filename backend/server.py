from flask import Flask, render_template, request, url_for, redirect
import products_dao
import order_dao
import customer_dao
from sql_connection import get_sql_connection

app = Flask(__name__)

@app.route("/manage_products", methods=["POST", "GET"])
def manage_products():
	cnx = get_sql_connection()
	if request.method == "POST":
		action = request.form.get('action')
		if action=='save':
			products_dao.insert_new_product(cnx, {'product_name': (request.form.get('pname')).lower(), 'uom_id': int(request.form.get('units')), 'price_per_unit': float(request.form.get('ppu'))})
	
	title = request.args.get('searchTitle')
	if title:
		products = products_dao.get_some_product(cnx, title.lower())
	else:
		products = products_dao.get_all_products(cnx)

	return render_template("manage_products.html", products=products)

@app.route("/manage_products/delete/<int:product_id>", methods=["POST", "GET"])
def delete_product(product_id):
	cnx = get_sql_connection()
	products_dao.delete_product(cnx, product_id)
	products = products_dao.get_all_products(cnx)

	return redirect(url_for("manage_products"))

@app.route("/new_order/<customer_name>", methods=["POST", "GET"])
def new_order(customer_name):
	cnx = get_sql_connection()
	customer_name = customer_name.lower()
	customers = customer_dao.get_all_customers(cnx)
	customer_id = customers[customer_name]
	products = products_dao.get_all_products(cnx)
	orders = order_dao.get_order_details(cnx, customer_id)
	try:
		final_total_price=find_total(orders)
	except Exception:
		final_total_price=0
	if request.method=="POST":
		product_id = int(request.form.get('product'))
		quantity = float(request.form.get('quantity'))
		price = next((p['price_per_unit'] for p in products if p['product_id'] == product_id), 0)
		total_price = quantity*price
		final_total_price += total_price
		order_dao.insert_new_order(cnx, {'order_id': customer_id, 'product_id': product_id, 'quantity': quantity, 'total_price': total_price, 'customer_name': customer_name, 'total_cost': final_total_price})
		
	orders = order_dao.get_order_details(cnx, customer_id)
	return render_template("new_order.html", orders=orders, customers=customers, products=products, final_total_price=final_total_price, customer_name=customer_name)

@app.route("/new_order/delete/<customer_name>/<int:order_id>/<int:product_id>/<float:quantity>/<float:total_price>")
def remove_order(customer_name, order_id, product_id, quantity, total_price):
	cnx = get_sql_connection()
	order_dao.delete_order(cnx, (order_id, product_id, quantity, total_price))
	return redirect(url_for("new_order", customer_name=customer_name))

@app.route("/", methods=["POST", "GET"])
def dashboard():
	cnx = get_sql_connection()
	customers = customer_dao.get_all_customers(cnx)
	orders = order_dao.get_orders(cnx)
	if request.method=="POST":
		customer_name = (request.form['customer']).lower()
		if customer_name not in customers.keys():
			customer_dao.insert_new_customer(cnx, customer_name)
		return redirect("/new_order/"+customer_name)
	
	return render_template("dashboard.html", customers=customers, orders=orders)

@app.route("/dashboard/delete/<int:order_id>", methods=["POST", "GET"])
def delete_order(order_id):
	print("Hello")
	cnx = get_sql_connection()
	query = ("delete from orders where order_id ="+str(order_id))
	cur = cnx.cursor()
	cur.execute(query)
	cnx.commit()
	return redirect(url_for("dashboard"))

def find_total(orders):
	price = 0.0
	for order in orders:
		price += order.get('total_price')
	return price

if __name__ == "__main__":
	app.run(debug=True)