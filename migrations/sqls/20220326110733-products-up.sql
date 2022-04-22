CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price numeric NOT NULL,
    details VARCHAR(255),
    url VARCHAR(255),
    type_id bigint REFERENCES product_types(id)
);