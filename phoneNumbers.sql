CREATE TABLE user (
    user_id     INTEGER AUTO_INCREMENT PRIMARY KEY, 
    phone_num   VARCHAR(20) NOT NULL, 
    lastLocation   VARCHAR(30) NOT NULL, 
    hours_awake VARCHAR(10)
);