# E-Commerce Backend API

A robust, enterprise-grade RESTful API built on **Node.js**, **Express.js**, and **MongoDB (Mongoose)**. This backend serves as the foundation for an E-Commerce platform, supporting secure user authentication (JWT-based), product catalog management, shopping cart operations, user addresses, wishlist/favorites, order processing, and payment status tracking.

---

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Distinct flows, controllers, and middlewares for **Customers** and **Admins**.
*   **Secure Authentication:** Password hashing using `bcrypt` and session authorization via JSON Web Tokens (JWT) carried in `Bearer` headers.
*   **Comprehensive Inventory Management:** Sub-categorization support, active/inactive toggles, stock quantity controls, and image storage integrations.
*   **Order Management & Lifecycle:** Real-time stock decrementing, customizable delivery statuses (`pending`, `processing`, `shipped`, `out for delivery`, `delivered`, `cancelled`), and order tracking.
*   **Media Storage:** Integrated image upload handlers using `Multer` (in-memory buffering) and Cloudinary API wrappers.
*   **Favorites & Cart State:** Persistent customer shopping carts and wishlist profiles stored directly within MongoDB.

---

## 🛠️ Tech Stack & Dependencies

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB via Mongoose ORM
*   **Authentication:** JSON Web Token (`jsonwebtoken`), `bcrypt` & `bcryptjs`
*   **Media Uploads:** `multer`, `cloudinary`, `streamifier`
*   **Payment APIs:** Razorpay SDK (pre-configured)
*   **Dev Utilities:** Nodemon (development server reloading), dotenv

---

## 📁 Directory Structure

```text
E-Commerce/
├── config/                  # Configuration files
│   ├── db.js                # MongoDB connection handler
│   └── cloudinary.js        # Cloudinary client setup
├── Middleware/              # Express custom middlewares
│   ├── authMiddleware.js    # JWT token verification (Bearer scheme)
│   ├── roleMiddleware.js    # RBAC handler checking customer/admin permissions
│   └── Multer.js            # Standard file upload config
├── models/                  # Mongoose data schemas
│   ├── Address.js           # User billing and shipping addresses
│   ├── Cart.js              # User-specific persistent carts
│   ├── Category.js          # Product categories (supports hierarchy)
│   ├── Favorite.js          # Customer wishlists/saved items
│   ├── Order.js             # Order invoices, shipping details, and items list
│   ├── Payment.js           # Transaction records & refund indicators
│   ├── Product.js           # Catalog items details, prices, and stock counts
│   └── User.js              # User profiles (Customer & Admin records)
├── controllers/             # Incoming request controllers
├── routes/                  # Express route definitions
├── services/                # Business logic implementation & database queries
├── package.json             # NPM dependencies & scripts list
├── server.js                # App entrypoint & middleware mounting
└── .gitignore               # System ignore files (e.g., .env)
```

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (v16+ recommended)
*   MongoDB Instance (Local or MongoDB Atlas)
*   Cloudinary Account (for image uploads)

### Installation Steps
1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd E-Commerce
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and specify the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
    JWT_SECRET=your_jwt_super_secret_key
    NODE_ENV=development
    
    # Cloudinary Config
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000` (or your configured `PORT`).

---

## 🔌 API Documentation

All API requests must pass headers with standard JSON formatting. For protected routes, supply the JWT token inside the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

### 🔑 Authentication & Users (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/customer/register` | Public | Register a new customer account. Expects `{ name, email, password }`. |
| **POST** | `/customer/login` | Public | Login for customer. Sets HTTP-only cookie + returns customer token. |
| **POST** | `/admin/register` | Public | Register an administrator profile. Expects `{ name, email, password }`. |
| **POST** | `/admin/login` | Public | Login for administrator. Sets cookie & returns token payload. |
| **POST** | `/logout` | Authenticated | Clears cookies and destroys active session for customers. |
| **POST** | `/logoutadmin` | Authenticated | Clears cookies and destroys active session for admins. |
| **GET** | `/auth/me` | Authenticated | Fetch details of the currently authenticated customer. |
| **GET** | `/admin/me` | Admin-Only | Fetch details of the currently logged-in administrator. |
| **GET** | `/customer/profile` | Customer-Only | View specific customer profile attributes. |
| **GET** | `/admin/profile` | Admin-Only | View admin profile workspace. |

---

### 📁 Categories (`/api/categories`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/getCategories` | Public | Retrieve list of all available categories. |
| **GET** | `/category/:id` | Public | Retrieve a category by its unique ID. |
| **POST** | `/create` | Admin-Only | Add a new category. Expects `{ name, description, parent_id, images }`. |
| **PUT** | `/categoryupdate/:id` | Admin-Only | Modify existing category details. |
| **DELETE**| `/delCategory/:id` | Admin-Only | Delete category. |

---

### 📦 Products (`/api/products`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/getAllProducts` | Public | List all active product items. Supports filters. |
| **GET** | `/getProduct/:id` | Public | Retrieve details of a product by ID. |
| **GET** | `/category/:categoryId`| Public | Fetch all products assigned to a specific category. |
| **POST** | `/createProduct` | Authenticated | Instantiate a new product catalog item. |
| **POST** | `/upload-image` | Public | Upload files to storage (expects multipart/form-data under key `files`). |
| **PUT** | `/toggle-stock/:id` | Public | Toggles in-stock status of a product (Active/Inactive). |
| **PUT** | `/updateProduct/:id` | Admin-Only | Update product metadata. |
| **DELETE**| `/delProduct/:id` | Admin-Only | Deletes product from system database. |
| **POST** | `/:id/images` | Admin-Only | Add images to existing product. |
| **DELETE**| `/:id/images/:imageId`| Admin-Only | Delete specific image from product collection. |

---

### 📍 User Addresses (`/api/address`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/getAllAdress` | Customer-Only | Retrieve list of all saved shipping addresses for logged-in user. |
| **GET** | `/getAddress` | Authenticated | Retrieve specific address using query criteria. |
| **POST** | `/createAdr` | Authenticated | Store a new address. Expects `{ street, city, state, postal_code, country, phone }`. |
| **PUT** | `/updateAddress/:id` | Public | Update shipping address details. |
| **DELETE**| `/delAddress/:id` | Public | Delete saved address. |

---

### 🛒 Shopping Cart (`/api/cart`)

All routes require authentication.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/getcart` | Retrieve the active user's cart contents. |
| **GET** | `/count` | Return count of total items in the user's cart. |
| **POST** | `/add` | Add items to cart. Expects `{ product_id, quantity }`. |
| **PUT** | `/update` | Update quantity of a product in cart. Expects `{ product_id, quantity }`. |
| **DELETE**| `/remove/:productId` | Remove a product from the cart completely. |
| **DELETE**| `/clear` | Remove all items from the cart. |

---

### ❤️ Favorites / Wishlist (`/api/favorites`)

All routes require authentication.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/getfavorites` | View list of favorited products. |
| **POST** | `/addfavorites` | Add product to favorites list. Expects `{ product_id }`. |
| **DELETE**| `/deletefavorites/:productId`| Remove product from favorites. |

---

### 📋 Orders (`/api/orders`)

All routes require authentication.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/` | Create a new order. Expects `{ address_id, items, payment_method }`. Decrements product stock. |
| **GET** | `/user` | Get all orders belonging to the logged-in customer. |
| **GET** | `/getallorder` | Get all orders in system (Admin dashboard view). |
| **GET** | `/:id/track` | Fetch current delivery status of the order. |
| **PUT** | `/status/:id` | Update status (Admin-only capability). Expects `{ status }`. |

---

### 💳 Payments (`/api/payments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/process` | Admin-Only | Mark payment as processed. Expects `{ orderId, amount, paymentMethod, transactionId }`. |
| **GET** | `/:orderId` | Admin-Only | Get payment details by Order ID. |
| **POST** | `/refund/:id` | Authenticated | Refund processed payment by payment record ID. |

---

## 🛠️ Developer Notes

1.  **JWT Verification:** Token validation checks for a standard `Bearer <token>` in request headers. If verification fails, it responds with `401 Unauthorized`.
2.  **Database Seeding & Relations:** Ensure categories are created before posting products, as the `Product` schema requires a valid `Category` ObjectId.
3.  **Role Protections:** The `roleMiddleware` intercepts routes requiring either `["admin"]` or `["customer"]` clearances. Apply authorization middleware *before* applying role middleware.
