# pufETH Monorepo

This is a monorepo project that contains a frontend (React application) and a backend (NestJS microservice) for working with pufETH conversion data.

---

## 📦 Technologies

- [Nx](https://nx.dev) workspace
- [NestJS](https://nestjs.com) for the backend microservice
- [React](https://reactjs.org) for the frontend application
- [ethers.js](https://docs.ethers.org) for interacting with the Ethereum blockchain

---

## Requirements

- [node.js](https://nodejs.org/en) >= 20.17.0

---

## 🚀 Run Local Environment

### 1. Clone the repository

```bash
git clone git@github.com:kule85/pufETH.git
cd pufETH
```

### 2. Install all dependencies

```
yarn install
```

### 3. Setup .env

```
cd apps/backend && cp .env.example .env && cd -
```

Then, make sure to update all required properties in the .env file with valid values based on your local setup.

### 4. Run backend

```
nx serve backend
```

### 5. Run web app

```
nx serve web-app
```
