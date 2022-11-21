CREATE TABLE order_flowers(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    flower_id BIGINT REFERENCES flowers(id)
);