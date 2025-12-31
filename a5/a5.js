// part 3

// 1
const create_db = "CREATE DATABASE a5;";

const q_products =
  " CREATE TABLE prouducts (P_id INT AUTO_INCREMENT PRIMARY KEY,p_name VARCHAR(200),price FLOAT,stock_q INT);";
const q_suppliers =
  "CREATE TABLE Suppliers (sub_id INT AUTO_INCREMENT PRIMARY KEY,sub_name VARCHAR(200),sub_number VARCHAR(200)";
const q_sales =
  "CREATE TABLE sales(sale_id INT PRIMARY KEY AUTO_INCREMENT, sold_q INT , sale_date DATE);";
const products_foreign_key =
  "ALTER TABLE prouducts ADD FOREIGN KEY (sub_id) REFERENCES suppliers(sub_id);";
const sales_foriegn_key =
  "ALTER TABLE sales ADD FOREIGN KEY (product_id) REFERENCES prouducts(P_id);";

// 2
const add_category = "ALTER TABLE PRODUCTS ADD category VARCHAR(50);";

// 3
const delete_category = "ALTER TABLE PRODUCTS DROP COLUMN category ";

// 4

const modify_column =
  "ALTER TABLE suppliers MODIFY COLUMN sub_number VARCHAR(15);";

// 5

const add_not_null =
  "ALTER TABLE Prouducts MODIFY COLUMN p_name VARCHAR(200) NOT NULL;";

// 6

// a
const add_supplier =
  'INSERT INTO suppliers(sub_name,sub_number) VALUES("FreshFoads","01001234567");';

// b

const add_products =
  'INSERT INTO prouducts (P_name,price,stock_q) VALUES ("MILK","15.00","50"),("BREAD","10.00","30"),("EGGS","20.00","40")';

// c ??

const add_sale =
  'INSERT INTO sales(sold_q,product_id,sale_date) VALUES("2",(SELECT P_id FROM prouducts WHERE p_name="MILK"),"2025-05-20");';

// 7

const update_price = 'UPDATE prouducts set price=25.00 where P_name="BREAD";';

// 8

const delete_eggs = 'DELETE FROM prouducts WHERE P_name="EGGS";';

// 9

const total_sold =
  "SELECT p_name , SUM(sold_q) FROM prouducts,sales WHERE P_ID IN ( SELECT product_id FROM sales);";

// 10

const high_stock =
  "SELECT p_name FROM prouducts WHERE stock_q=(SELECT MAX(stock_q) FROM prouducts);";

// 11

const F_suppliers = "SELECT sub_name FROM suppliers WHERE sub_name LIKE 'f%';";

// 12

const not_sold =
  "SELECT p_name FROM prouducts,sales WHERE NOT P_ID = ( SELECT product_id FROM sales);";

// 13

const all_sales_with_p_names =
  "SELECT P_name , sale_date FROM prouducts ,sales WHERE P_id = (SELECT product_id FROM sales);";

// 14

const add_manger =
  'CREATE USER "store_manger" IDENTIFIED BY "" GERANT SELECT,INSERT,UPDATE a5.* TO "store_manger";';

// 15

const revoke_update = 'REVOKE UPDATE ON a5.* FROM "store_manger";';

// 16

const grant_delete = 'GRANT DELETE ON a5.sales TO "store_manger";';
