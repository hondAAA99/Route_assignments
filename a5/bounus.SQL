SELECT customer_id ,
COUNT(customer_id) AS count_no_trans
FROM Visits 
WHERE NOT Visit_id 
IN (SELECT Visit_id FROM Transactions) 
GROUP BY customer_id