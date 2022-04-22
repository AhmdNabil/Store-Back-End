# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

Index - [GET] /api/products
Show  - [GET] /api/products/:id
Create - [POST] /api/products
Create - [POST] /api/products/type - Used for creating new product type
Products by type - [GET] /api/dashboard/products-by-type/:id

#### Users
Index - [GET] /api/users
Show - [GET] /api/users/:id (customer gets his own user object, admin they can get any user object)
Create - [POST] /api/users
Update - [PUT] /api/users/:id (Customer can update his own object and cannot change their role, admin they can update any user object)
Login - [POST] /api/login - JWT included

#### Orders
Index - [GET] /api/orders
Show - [GET] /api/orders/:id (customer can get his order object, admin can get any order object)
Create - [POST] /api/orders
Update - [PUT] /api/orders/:id (customer can only update his order object,admin can update any order object)
Add Product - [POST] /api/orders/:id
Current user Order - [GET] /api/dashboard/cart
done user Orders - [GET] /api/dashboard/orders/:id - User can list his done orders admins can list users done orders

## Data Shapes
#### Product
-  id
- name
- price
- type

id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
type_id bigint REFERENCES tybe_categories(id))

#### User
- id
- firstName
- lastName
- password

id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
firstname VARCHAR(50),
lastname VARCHAR(50),
password_digest VARCHAR,
role VARCHAR(10)

#### Orders
- id
- id of each product in the order
- amount of each product in the order
- user_id
- status of order (active or complete)

id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint REFERENCES users(id),

####Product type
- id
- name

Product Types Table
id SERIAL PRIMARY KEY,
name VARCHAR(20)

#### Order Product Table
id SERIAL PRIMARY KEY,
amount integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)