# ChronoLux | Elite Luxury Watch E-Commerce Platform

Welcome to **ChronoLux**, a premium, state-of-the-art e-commerce platform dedicated to elite luxury watches. This repository contains a fully-fledged, production-ready Spring Boot backend with a beautifully integrated modern React single-page frontend.

---

## 🌟 Features Overview

### 🔐 Security & Identity Management
- **Stateless Authentication**: Fully implemented JWT (JSON Web Token) authentication using the latest `jjwt` library standards.
- **BCrypt Password Hashing**: Proactive cryptographic security on user passwords during both registration and profile updates.
- **Role-Based Access Control (RBAC)**: Distinguishes between **Admin** (`ROLE_ADMIN`) and **Customer** (`ROLE_USER`) domains to safeguard endpoints.
- **Profile Management**: Custom endpoints to view, update, and manage user profile credentials securely.

### 🛒 Cart & Checkout System
- **Auto-Initialization**: Every registered user is automatically allocated an empty shopping cart entity at registration, preventing null reference errors.
- **Cart Lifecycle Operations**: Add, update quantities, remove items, or clear entire carts.
- **Atomic Stock Reservation**: Orders atomically check and reserve product stock on checkout. If stock is insufficient, transaction rollbacks ensure database consistency.
- **Automated Inventory Restoration**: If an order is cancelled, stock amounts are instantly restored back to the product catalog.

### 💼 Elite Catalog & Brand Management
- **Hierarchical Layout**: Products are categorized cleanly by Premium Brands and Categories.
- **Pre-Seeded Catalog**: Automatically seeds premium brands (Rolex, Omega, Audemars Piguet, Patek Philippe) and watch types (Sports, Classic, Chronograph, Grand Complications) along with historical luxury references on application startup.

### 💳 Integrated Payments & Administrative Overlooks
- **Payment Profiles**: Users can securely save, fetch, and delete their credit card and transaction credentials.
- **Admin Dashboards**: Fully empowered controllers to manage products, categories, brands, user accounts, and track/update customer order statuses.

---

## 🛠️ Architecture & Tech Stack

The application employs a modern **3-Layer Architecture** (Controller ➔ Service ➔ Repository) ensuring strict separation of concerns, optimal modularity, and high testability.

### The Stack:
- **Language**: Java 17
- **Core Framework**: Spring Boot 4.x / Spring Data JPA
- **Security Engine**: Spring Security & JWT (`io.jsonwebtoken` v0.12.5)
- **Database Layer**: MySQL (Persistence) & Hibernate ORM
- **Embedded Frontend**: React 18, Babel (runtime in-browser compilation), and pure premium Dark Glassmorphism CSS.

---

## 💾 Database & Data Seeding

### Schema
The system maps all models cleanly to the following core tables:
- `users`: User profiles and authentication details (roles: `ADMIN`, `USER`).
- `products`: Luxury watch items with details, brand reference, category reference, and active inventory count.
- `categories` & `brands`: Catalog lookup tables.
- `carts` & `cart_items`: User shopping cart structure.
- `orders` & `order_items`: Placed customer transactions, item copies, total pricing, and current status.
- `payment_methods`: Saved user credit cards with secure access controls.

### Starter Seed Catalog
On initial boot, if the database catalog is blank, the `DataSeeder` automatically populates the shop with legendary timepieces:
- **Rolex**: Submariner Date 126610LN, Cosmograph Daytona "Eye of Tiger"
- **Omega**: Speedmaster Professional Moonwatch, Seamaster Diver 300M Co-Axial
- **Audemars Piguet**: Royal Oak 'Jumbo' Extra-Thin
- **Patek Philippe**: Nautilus 5711 Blue Dial

---

## 🧭 API Reference List

### 🔓 Public & Authentication APIs

| Endpoint | Method | Description | Request Body | Access |
|---|---|---|---|---|
| `/api/auth/register` | `POST` | Registers a new user and auto-creates their cart. | `UserRequest` | Anonymous |
| `/api/auth/login` | `POST` | Authenticates a user, returns a stateless JWT. | `AuthRequest` | Anonymous |
| `/api/products` | `GET` | Lists all products in the catalog. | *None* | Anonymous |
| `/api/products/{id}` | `GET` | Fetches details of a specific luxury timepiece. | *None* | Anonymous |
| `/api/products/category/{id}`| `GET` | Lists all products belonging to a category. | *None* | Anonymous |
| `/api/products/brand/{id}` | `GET` | Lists all products belonging to a brand. | *None* | Anonymous |
| `/api/products/categories` | `GET` | Lists all available watch categories. | *None* | Anonymous |
| `/api/products/brands` | `GET` | Lists all available luxury brands. | *None* | Anonymous |

### 🔒 Secure Customer APIs (Requires User Bearer JWT Token)

| Endpoint | Method | Description | Request Body |
|---|---|---|---|
| `/api/users/profile` | `GET` | Retrieve logged-in user profile details. | *None* |
| `/api/users/profile` | `PUT` | Updates username, email, or hashes a new password. | `UserRequest` |
| `/api/cart` | `GET` | Fetches the user's active shopping cart. | *None* |
| `/api/cart/items` | `POST` | Adds a watch to the cart. | `CartRequest` |
| `/api/cart/items/{prodId}` | `PUT` | Updates item quantity inside the cart. | *Query: quantity* |
| `/api/cart/items/{prodId}` | `DELETE`| Removes a product from the cart. | *None* |
| `/api/cart` | `DELETE`| Clears all items from the cart. | *None* |
| `/api/orders` | `POST` | Checks out the cart and creates a new order (atomic stock reserved). | `OrderRequest`|
| `/api/orders` | `GET` | Lists all orders placed by the current user. | *None* |
| `/api/orders/{id}` | `GET` | Fetches details of a specific user order. | *None* |
| `/api/orders/{id}/cancel` | `POST` | Cancels an order (automatically restores stock counts). | *None* |
| `/api/payment-methods` | `GET` | List all saved payment profiles. | *None* |
| `/api/payment-methods` | `POST` | Adds a new credit card/payment method. | `PaymentMethodRequest`|
| `/api/payment-methods/{id}`| `DELETE`| Removes a payment profile securely. | *None* |

### 🛡️ Secure Administrator APIs (Requires Admin Bearer JWT Token)

| Endpoint | Method | Description | Request Body |
|---|---|---|---|
| `/api/admin/products` | `POST` | Creates a new luxury timepiece. | `ProductRequest` |
| `/api/admin/products/{id}`| `PUT` | Updates watch details, pricing, or stock counts. | `ProductRequest` |
| `/api/admin/products/{id}`| `DELETE`| Deletes a product from the catalog. | *None* |
| `/api/admin/categories` | `POST` | Creates a new watch category. | `Category` |
| `/api/admin/categories/{id}`| `PUT` | Renames an existing category. | `Category` |
| `/api/admin/categories/{id}`| `DELETE`| Deletes a category. | *None* |
| `/api/admin/brands` | `POST` | Registers a new brand. | `Brand` |
| `/api/admin/brands/{id}` | `PUT` | Renames an existing brand. | `Brand` |
| `/api/admin/brands/{id}` | `DELETE`| Deletes a brand. | *None* |
| `/api/admin/orders` | `GET` | Lists all orders in the entire system. | *None* |
| `/api/admin/orders/{id}/status` | `PUT`| Modifies order progress (e.g. PROCESSING, SHIPPED). | *Query: status*|
| `/api/admin/users` | `GET` | Lists all registered accounts in the database. | *None* |
| `/api/admin/users/{id}` | `GET` | Gets details for a specific user account. | *None* |
| `/api/admin/users/{id}` | `PUT` | Force updates user credentials, details, or system roles. | `UserRequest` |
| `/api/admin/users/{id}` | `DELETE`| Permantly removes a user from the platform. | *None* |

---

## ⚡ Getting Started & Running

### 1. Database Setup
1. Ensure you have **MySQL** installed and running on your local machine.
2. Create a fresh schema named `watchstoredb`:
   ```sql
   CREATE DATABASE watchstoredb;
   ```
3. Update database credentials in [application.properties](file:///d:/intelij/project/watch-ecommerce/src/main/resources/application.properties) if yours differ from the defaults:
   - URL: `jdbc:mysql://localhost:3306/watchstoredb`
   - Username: `root`
   - Password: `[your-password]`

### 2. Launch the Application
Start the Spring Boot backend server using the Maven wrapper:
```powershell
./mvnw spring-boot:run
```

### 3. Open the Premium Storefront
Once the backend boots successfully, open your web browser and navigate to:
👉 **[http://localhost:8080](http://localhost:8080)**

This will serve the stunning ChronoLux SPA built with glassmorphic elements, interactive product browsing, real-time cart counts, order logs, profile customizations, and payment management.

---

## 🎓 Key Engineering Decisions

- **Constructor Injection**: All services, configs, and controllers leverage modern constructor-based dependency injection for better testability and field immutability.
- **Card-Cart Mapping Alignment**: Resolved naming discrepancies between spec schemas and database targets by maintaining smooth mapping between `Cart` entities and corresponding `CardResponse`/`CardItemResponse` objects.
- **Stateless Isolation**: Security configuration utilizes `SessionCreationPolicy.STATELESS` and blocks invalid header access using a robust JWT filter wrapper.
- **Data Protection**: Hashing utilizes `BCryptPasswordEncoder` throughout all registration and update lifecycles to ensure absolute credential protection.
