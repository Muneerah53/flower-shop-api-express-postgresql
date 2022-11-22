
# API Requirements


## API Endpoints

#### - Flowers (Products)

- Index

   - An Index route: '/flowers' [GET]

- Show

  - A Show route: '/flowers/:flowerID' [GET]

- Create [token required]

  - A Create route: '/flowers' [POST]

-  Flower by color (args: color)

   - Find Flower By Color route: '/flowers/color/:color' [GET]

  - Top 5 most popular flowers

   - Popular Flowers route: '/five-most-popular'

  **Additional Endpoints:**

- An Update route: '/flowers/:flowerID' [PUT]

- A Delete route: '/flowers/:flowerID' [DELETE]

 ^ *token required for both.*

#### - Users

- Index [token required]

  - An Index route: '/users' [GET]

- Show [token required]

  - A Show route: '/users/:userID' [GET]

- Create [token required]

  - A Create route: '/users' [POST]

  

   **Additional Endpoint:**

- Authenticate route: '/users/authenticate' [POST]

  

#### - Orders

- Current Order by user (args: user id)[token required]

   - Current Order route: '/users/:userID/orders/show/current-order' [GET]

  

- Completed Orders by user (args: user id)[token required]

  - Current Order route: '/users/:userID/orders/show/history' [GET]

  
  **Additional Endpoints:**

- An Index route: '/users/:userID/orders' [GET]

- A Show route: '/users/:userID/orders/:orderID' [GET]

- A Create route: '/users/:userID/orders' [POST]

- An Update Status route: '/users/:userID/orders/:orderID/complete' [PUT]

- Add Flowers to Flower route: '/users/:userID/orders/:orderID/flowers' [POST]

- View Flowers in an Order route: '/cart/:orderID'

  
  

## Data Shapes

#### Flower (Product)

- id

- name

- price

- color

  

#### User

- id

- firstName

- lastName

- password

  

#### Orders

- id

- id of each product in the order

- quantity of each product in the order

- user_id

- status of order (active or complete)

  
  
  

## Database Schema
![schema](https://user-images.githubusercontent.com/90178514/203132330-fc835c5f-031e-40df-b953-8fe113ced604.png)
