# Ledn Token Interview Challenge

## Challenge description 
[Ledn Token Interview Challenge
](README-BACKEND.md)

## Prequisites
Before running the API, make sure you have the following prequisites installed and configured:
- Docker Compose: To run MongoDB locally using Docker Compose.
- Node.js and npm: To install dependencies and run the API.

## Installation And Run API
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `docker-compose up` to start MongoDB using Docker Compose.
4. Copy the `.env.example` file and rename it to `.env`.
5. Run `npm install` to install the project dependencies.
6. Run `npm run seed-initial-data` to seed initial accounts and transactions in the database.
7. Run `npm run start` to start http API 

The API will be running at `http://localhost:3000` by default.

## Environment Variables
You can customize the API behavior by modifying the environment variables in the `.env` file. 

## Request Examples

### Get Account Details
#### Request
```bash
curl --location 'localhost:3000/accounts/662ec909892fe9ca17e71316'
```

#### Response
```json
{
  "id": "662ec909892fe9ca17e71316",
  "email": "Belle42@hotmail.com",
  "balance": 7215,
  "updatedAt": "2024-04-29T00:09:44.978Z"
}
```

### Create Transaction
#### Request
```bash
curl --location 'localhost:3000/transactions' \
--header 'Content-Type: application/json' \
--data '{
    "accountId": "662ec909892fe9ca17e71316",
    "type": "send",
    "amount": "27627"
}'
```

#### Response
```json
{
  "id": "662ee548ef3c522639c46f3a",
  "type": "send",
  "amount": 27627,
  "createdAt": "2024-04-29T00:09:44.981Z"
}
```