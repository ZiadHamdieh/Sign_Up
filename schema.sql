CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);