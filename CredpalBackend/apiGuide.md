
# API Guide for Testing Endpoints with Postman

This guide provides instructions for testing the API endpoints of the Credpal Fintech Dashboard using Postman. The base URL for the API is `http://localhost:4000`.


## technologies used


---

## 1. Authentication Endpoints

### Base URL: `http://localhost:4000`

#### 1.1 Register
- **Method**: POST  
- **Endpoint**: `/auth/register`  
- **Description**: Registers a new user.  
- **Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

#### 1.2 Login
- **Method**: POST  
- **Endpoint**: `/auth/login`  
- **Description**: Logs in a user and returns a token.  
- **Body** (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### 1.3 Logout
- **Method**: POST  
- **Endpoint**: `/auth/logout`  
- **Description**: Logs out the currently authenticated user.  
- **Headers**:
  - `Authorization`: Bearer `<token>`

---

## 2. User Management Endpoints

### Base URL: `http://localhost:4000/user`

#### 2.1 Fetch All Users
- **Method**: GET  
- **Endpoint**: `/`  
- **Description**: Retrieves a list of all users.  

#### 2.2 Fetch Single User
- **Method**: GET  
- **Endpoint**: `/:id`  
- **Description**: Retrieves details of a single user by ID.  

#### 2.3 Update User
- **Method**: PUT  
- **Endpoint**: `/:id`  
- **Description**: Updates details of a single user by ID.  
- **Body** (JSON):
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```

#### 2.4 Delete User
- **Method**: DELETE  
- **Endpoint**: `/:id`  
- **Description**: Deletes a user by ID.  

---

## 3. Wallet Management Endpoints

### Base URL: `http://localhost:4000/wallet`

#### 3.1 Add Funds
- **Method**: POST  
- **Endpoint**: `/addfunds`  
- **Description**: Adds funds to a wallet.  
- **Body** (JSON):
  ```json
  {
    "userId": "user-id", // this would auto fill by the route
    "amount": 1000
  }
  ```

#### 3.2 Withdraw Funds
- **Method**: POST  
- **Endpoint**: `/withdraw`  
- **Description**: Withdraws funds from a wallet.  
- **Body** (JSON):
  ```json
  {
    "userId": "user-id",  // this would auto fill by the route
    "amount": 500
  }
  ```

#### 3.3 Transfer Funds
- **Method**: POST  
- **Endpoint**: `/transfer/`  
- **Description**: Transfers funds between wallets.  
- **Body** (JSON):
  ```json
  {
    "senderAccount" : "3700332451",
    "receiverAccount" : "9936186981",
    "amount" : 350000
  }
  ```

---

## 4. Transaction Management Endpoints

### Base URL: `http://localhost:4000/transaction`

#### 4.1 Fetch All Transactions
- **Method**: GET  
- **Endpoint**: `/`  
- **Description**: Retrieves all transactions linked to all users.  

#### 4.2 Fetch Single Transaction
- **Method**: GET  
- **Endpoint**: `/:userId/:transactionId`  
- **Description**: Retrieves a single transaction linked to a specific user and wallet.  

NOTE: the transactions would always come with the user requests endpoints you see the wallet and transactions associated with each user

---

## Notes
- Ensure to include the `Authorization` header with a valid Bearer token for protected endpoints.
- Use Postman collections to organize and test these endpoints efficiently.
- Replace placeholder values (e.g., `user-id`, `transactionId`) with actual data from your database.

