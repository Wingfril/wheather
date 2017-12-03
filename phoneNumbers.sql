DROP TABLE IF EXISTS user;
CREATE TABLE user (
    user_id     INTEGER AUTO_INCREMENT PRIMARY KEY, 
    phone_num   VARCHAR(20) NOT NULL, 
    lastLocation   VARCHAR(6) NOT NULL, 
    hours_awake VARCHAR(10)
);

select * from user;