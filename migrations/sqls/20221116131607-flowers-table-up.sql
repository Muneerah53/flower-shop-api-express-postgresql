CREATE TABLE flowers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    color VARCHAR(64) NOT NULL
);