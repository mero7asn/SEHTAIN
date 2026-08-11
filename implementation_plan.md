# Implementation Plan & Architectural Blueprint — Sahtain Water E-Commerce Web Application

This document provides a full, comprehensive technical reference and execution plan for building the **Sahtain Water E-Commerce Web Application**, an Arabic RTL bottled-water e-commerce platform built as an independent full-stack web app.

---

## 1. Project Overview & Architectural Vision

- **Target Experience**: Clean, modern Arabic RTL storefront for a water company with 3 primary customer segments:
  1. **Individuals & Families** (`الأفراد والعائلات`)
  2. **Business & Hospitality** (`الأعمال والضيافة - B2B`)
  3. **Mosque & Charity Water** (`سقيا المساجد والخير`)
- **Key Characteristics**:
  - Pure Arabic interface (`dir="rtl"`).
  - Fully independent (No third-party e-commerce platform dependencies like Salla or Shopify).
  - Real-time client-side search, persistent cart drawer, multi-step checkout, user account dashboard, B2B/Charity inquiry processing, customer feedback system, and full Admin Management dashboard.
- **Visual Identity**:
  - Water-inspired palette: Cyan/Sky Blue accents (`#0284c7`, `#0ea5e9`), Slate darks (`#0f172a`, `#334155`), Soft Ice Blue backgrounds (`#f0f9ff`), Pure White cards (`#ffffff`).
  - Google Font: `Tajawal` or `Cairo` for elegant Arabic typography.
  - Micro-interactions: Card hover subtle lifts (`translateY(-4px)`), smooth drawer transitions, skeleton loaders, toast notifications.

---

## 2. Technology Stack & Project Structure

### Frontend Stack (`/client`)
- **Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS (with `@tailwindcss/forms` & custom RTL utilities) + `dir="rtl"` attribute on root document
- **Routing**: `react-router-dom` v6
- **Icons**: `lucide-react`
- **State Management**: React Context API (`AuthContext`, `CartContext`) + `localStorage` persistence
- **HTTP Client**: `axios` with global interceptors for JWT injection and unified error handling

### Backend Stack (`/server`)
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens) + `bcryptjs` for password hashing
- **Middleware**: `cors`, `helmet`, `express-rate-limit`, `morgan`, authorization guard middlewares

### Directory Layout

```
Sahtain/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── fonts/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   └── AdminLayout.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartDrawer.jsx
│   │   │   │   └── CartItem.jsx
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   └── ProductSkeleton.jsx
│   │   │   ├── ui/
│   │   │   │   ├── SearchModal.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── RatingStars.jsx
│   │   │   │   ├── Accordion.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Pagination.jsx
│   │   │   └── common/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       └── Badge.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── Individuals.jsx
│   │   │   ├── B2B.jsx
│   │   │   ├── Charity.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Satisfaction.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── UserGuide.jsx
│   │   │   ├── Delivery.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Account.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       ├── AdminCustomers.jsx
│   │   │       ├── AdminB2B.jsx
│   │   │       ├── AdminCharity.jsx
│   │   │       └── AdminReviews.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── B2BRequest.js
│   │   ├── CharityRequest.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── b2bController.js
│   │   ├── charityController.js
│   │   ├── reviewController.js
│   │   └── statsController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── b2bRoutes.js
│   │   ├── charityRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── statsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   ├── seed/
│   │   └── seeder.js
│   ├── server.js
│   └── package.json
│
├── .env
├── .gitignore
└── README.md
```

---

## 3. Database Schemas (MongoDB / Mongoose)

### 3.1 `User` Schema (`/server/models/User.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    city: String,
    district: String,
    street: String,
    building: String,
    apartment: String,
    isDefault: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
}
```

### 3.2 `Product` Schema (`/server/models/Product.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, default: 0 },
  sku: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['individuals', 'business', 'charity', 'general'],
    default: 'general'
  },
  volume: { type: String, required: true }, // e.g., "330 مل", "500 مل", "1.5 لتر"
  packageQuantity: { type: Number, required: true }, // e.g., 24, 6, 4
  weight: { type: String }, // e.g., "8 كجم"
  stock: { type: Number, required: true, default: 100, min: 0 },
  images: [{ type: String }],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 3.3 `Order` Schema (`/server/models/Order.js`)
```javascript
{
  orderNumber: { type: String, required: true, unique: true }, // e.g. SH-100245
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: Number,
    volume: String,
    packageQuantity: Number,
    image: String
  }],
  subtotal: { type: Number, required: true },
  vat: { type: Number, required: true }, // 15% VAT included/added
  deliveryFee: { type: Number, required: true, default: 10 },
  total: { type: Number, required: true },
  shippingAddress: {
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    building: String,
    apartment: String,
    notes: String
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['cod', 'card', 'applepay'],
    default: 'cod' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'],
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['جديد', 'قيد المعالجة', 'قيد التجهيز', 'خرج للتوصيل', 'تم التوصيل', 'ملغي'],
    default: 'جديد'
  },
  createdAt: { type: Date, default: Date.now }
}
```

### 3.4 `B2BRequest` Schema (`/server/models/B2BRequest.js`)
```javascript
{
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  businessType: { type: String, required: true }, // مكاتب, مطاعم, فنادق, فعاليات, أخرى
  city: { type: String, required: true },
  quantity: { type: String, required: true },
  deliveryDate: { type: Date },
  notes: { type: String },
  status: { type: String, enum: ['جديد', 'قيد التواصل', 'تم الاتفاق', 'مغلق'], default: 'جديد' },
  createdAt: { type: Date, default: Date.now }
}
```

### 3.5 `CharityRequest` Schema (`/server/models/CharityRequest.js`)
```javascript
{
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true }, // مسجد, جمعية خيرية, مدرسة, دار رعاية, أفراد
  location: { type: String, required: true },
  beneficiaries: { type: Number, required: true },
  quantity: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['جديد', 'قيد التقييم', 'تم التوفير', 'مرفوض'], default: 'جديد' },
  createdAt: { type: Date, default: Date.now }
}
```

### 3.6 `Review` Schema (`/server/models/Review.js`)
```javascript
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  orderNumber: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 4. Backend REST API Endpoint Specifications

### 4.1 Authentication API (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new customer | No |
| `POST` | `/api/auth/login` | Login user & return JWT + user info | No |
| `GET` | `/api/auth/me` | Fetch active logged in user profile | Yes (JWT) |

### 4.2 Products API (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get list of products (support `category`, `search`, `active` query parameters) | No |
| `GET` | `/api/products/:id` | Get single product details by ID or slug | No |
| `POST` | `/api/products` | Create product | Yes (Admin) |
| `PUT` | `/api/products/:id` | Update product details / stock / price | Yes (Admin) |
| `DELETE` | `/api/products/:id` | Delete product | Yes (Admin) |

### 4.3 Orders API (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Create new order (guest or authenticated) | Optional |
| `GET` | `/api/orders` | Fetch user's orders (or all orders if Admin) | Yes |
| `GET` | `/api/orders/:id` | Get order details by ID or order number | Yes |
| `PUT` | `/api/orders/:id/status` | Update order status (`جديد` -> `تم التوصيل` etc.) | Yes (Admin) |

### 4.4 Business B2B API (`/api/b2b`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/b2b` | Submit business water request | No |
| `GET` | `/api/b2b` | Fetch all B2B requests | Yes (Admin) |
| `PUT` | `/api/b2b/:id` | Update B2B request status | Yes (Admin) |

### 4.5 Mosque & Charity API (`/api/charity`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/charity` | Submit charity water request | No |
| `GET` | `/api/charity` | Fetch all charity requests | Yes (Admin) |
| `PUT` | `/api/charity/:id` | Update charity request status | Yes (Admin) |

### 4.6 Reviews & Feedback API (`/api/reviews`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reviews` | Submit customer feedback/rating | No |
| `GET` | `/api/reviews` | Get list of approved reviews | No |

---

## 5. Front-End Interface & Page Architecture

### 5.1 Global Layout Elements

#### Modern Responsive Header (Desktop & Mobile)
- **Top Notification Bar**: "الأسعار شاملة ضريبة القيمة المضافة 15% | توصيل سريع لجميع المناطق".
- **Main Nav Navigation**:
  - Logo (`صحتين - مياه نقية`)
  - Nav Links:
    - الرئيسية (`/`)
    - للأفراد والعائلات (`/individuals`)
    - للأعمال والضيافة (`/b2b`)
    - سقيا المساجد والخير (`/charity`)
    - عن صحتين (`/about`)
- **Action Icons**:
  - Search Icon (Triggers dynamic full-screen or dropdown search modal matching Name, Desc, SKU, Category)
  - User/Account Icon (Navigates to `/account` or opens Login Modal if unauthenticated)
  - Cart Drawer Toggle Button with badge showing total item count
  - Mobile Menu Trigger (Hamburger menu for screens < 1024px)

#### Cart Drawer Component
- Slide-over panel from left (or right for RTL context).
- Items list with image, title, pack details, quantity controls (`[-] N [+]`), price, delete button.
- Financial Breakdown: Subtotal, Shipping (10 SAR), VAT (15%), Grand Total.
- Direct navigation buttons: `متابعة التسوق` (Close drawer), `إتمام الطلب` (`/checkout`).

#### Footer Component
- Columns:
  - **عن صحتين**: Brand blurb, freshness commitment, tax registration info.
  - **روابط تهمك**: عن صحتين, الأسئلة الشائعة, رضاك أولويتنا, خصوصيتك محفوظة, شروط الاستخدام, دليلك مع صحتين, يوصلك بكل عناية.
  - **خدمة العملاء**: Phone number (`920000000`), Email (`care@sahtain-water.demo`), Working hours.
  - **تواصل معنا**: Social media icons (Instagram, X, Facebook, TikTok).
- Footer Bottom: Copyright note, Tax Registration fictional number ` الرقم الضريبي: 300123456700003`.

---

### 5.2 Storefront Pages Details

1. **Home Page (`/`)**:
   - **Hero Banner**: "من مصدرها الطبيعي... نقاء يرافق يومك" with high-res bottle imagery and CTA "تسوق الآن".
   - **3 Category Cards**:
     - للأفراد والعائلات (Daily home hydration)
     - للأعمال والضيافة (B2B solutions)
     - سقيا المساجد والخير (Charity distribution)
   - **Featured Products Carousel / Grid**: Top products with quick "إضافة إلى السلة" button.
   - **Value Proposition Banner**: High purity, strict quality standards, eco-friendly bottles, fast delivery.
   - **Customer Feedback Highlights**: Ratings & testimonials from happy clients.

2. **Products Page (`/products`)**:
   - Category filtering tabs: الكل, الأفراد والعائلات, الأعمال, سقيا الخير.
   - Sorting options: السعر من الأقل للأعلى, السعر من الأعلى للأقل, الأكثر مبيعاً.
   - Product Grid: Responsive layout (1-2 mobile, 2 tablet, 3-4 desktop).

3. **Product Details Page (`/products/:id`)**:
   - Image gallery (main view + thumbnails).
   - Rating stars, title, volume, pack count, price, VAT note.
   - Detailed specifications accordion (الحجم, عدد العبوات, الوزن, التعبئة).
   - Quantity selector (`[-] 1 [+]`).
   - Action buttons: "إضافة إلى السلة" and "شراء الآن".

4. **Cart Page (`/cart`)**:
   - Comprehensive cart view table + mobile stacked view.
   - Detailed summary with shipping cost calculator.

5. **Checkout Page (`/checkout`)**:
   - Step 1: Customer Info (Name, Mobile, Email).
   - Step 2: Shipping Details (City, District, Street, Building, Notes).
   - Step 3: Payment Method selection (الدفع عند الاستلام, بطاقة ائتمانية, Apple Pay).
   - Order Summary Panel (Items list, subtotal, VAT, shipping fee, Total).
   - CTA: "تأكيد الطلب".

6. **Order Confirmation Page (`/order-success/:id`)**:
   - Order success icon (✓ تم استلام طلبك بنجاح).
   - Order reference number (`#SH-100245`).
   - Summary of ordered items and delivery address.
   - Action links: "متابعة الطلب" -> `/orders`, "العودة للرئيسية" -> `/`.

7. **B2B / Business Page (`/b2b`)**:
   - Explanation of business offerings (Offices, Hotels, Restaurants, Catering, Corporate Events).
   - Quote request form (اسم المنشأة, اسم المسؤول, رقم الجوال, البريد, نوع النشاط, المدينة, الكمية, تاريخ التوريد, ملاحظات).
   - API submission with success toast notification.

8. **Charity & Mosque Water Page (`/charity`)**:
   - Guidance on water distribution for mosques and charities.
   - Water request form (اسم الجهة, نوع الجهة, الموقع, عدد المستفيدين, الكمية, رقم التواصل, ملاحظات).

9. **Customer Satisfaction Page (`/satisfaction`)**:
   - Header "رضاك أولويتنا".
   - Service review submission form (الاسم, رقم الطلب, التقييم 1-5, التعليق).
   - List of recent customer reviews.

10. **Informational Pages**:
    - **About Page (`/about`)**: Story, vision, mission, purity values.
    - **FAQ Page (`/faq`)**: Accordion questions regarding delivery, prices, VAT, minimum orders.
    - **User Guide Page (`/user-guide`)**: Step-by-step order guide.
    - **Delivery Page (`/delivery`)**: Delivery zones, timing, shipping costs.
    - **Privacy Policy (`/privacy`)**: Privacy policy & data protection terms in Arabic.
    - **Terms of Use (`/terms`)**: Platform terms and condition agreements.

11. **User Auth & Account**:
    - **Login (`/login`)** / **Register (`/register`)**.
    - **Account Dashboard (`/account`)**: Profile info, delivery address book.
    - **Orders Page (`/orders`)**: History of past orders with status badges (`جديد`, `قيد التجهيز`, `خرج للتوصيل`, `تم التوصيل`).

12. **Admin Dashboard (`/admin`)**:
    - Protected route accessible only by `admin` role.
    - Sidebar navigation:
      - لوحة التحكم (Overview metrics: total sales, order count, total products, total customer count).
      - إدارة المنتجات (Add, edit, toggle active, update stock & price).
      - إدارة الطلبات (View all customer orders, filter by status, update status dropdown).
      - إدارة العملاء (View customer list & total purchases).
      - طلبات B2B (View and manage commercial inquiries).
      - طلبات السقيا (View and manage charity inquiries).
      - التقييمات (Approve/manage customer reviews).

---

## 6. Seed Data Specifications

The project will automatically include a seeder script (`/server/seed/seeder.js`) with:

### Demo Users (3 users)
1. **Admin User**:
   - Email: `admin@test.com`
   - Password: `Admin1234`
   - Role: `admin`
2. **Customer User 1**:
   - Email: `customer@test.com`
   - Password: `Test1234`
   - Role: `customer`
3. **Customer User 2**:
   - Email: `ahmed@test.com`
   - Password: `Test1234`
   - Role: `customer`

### Demo Products (5 products)
1. **مياه صحتين 330 مل**: Price: 25.00 SAR, Volume: 330 مل, Package: 24 عبوة, SKU: `SH-330-24`, Category: `individuals`.
2. **مياه صحتين 500 مل**: Price: 35.00 SAR, Volume: 500 مل, Package: 24 عبوة, SKU: `SH-500-24`, Category: `individuals`.
3. **مياه صحتين 600 مل**: Price: 30.00 SAR, Volume: 600 مل, Package: 24 عبوة, SKU: `SH-600-24`, Category: `individuals`.
4. **مياه صحتين 1.5 لتر**: Price: 18.00 SAR, Volume: 1.5 لتر, Package: 6 عبوات, SKU: `SH-150-06`, Category: `business`.
5. **مياه صحتين 5 لتر**: Price: 20.00 SAR, Volume: 5 لتر, Package: 4 عبوات, SKU: `SH-500-04`, Category: `charity`.

### Additional Seed Data
- 5 Demo Orders (`#SH-100241` to `#SH-100245`) with varying statuses (`جديد`, `قيد المعالجة`, `قيد التجهيز`, `خرج للتوصيل`, `تم التوصيل`).
- 3 Customer Reviews.
- 2 B2B Requests.
- 2 Charity Requests.

---

## User Review Required

> [!IMPORTANT]
> **Independent Application Architecture**:
> The application will run as a client-server architecture inside the `c:\Users\Admin\Downloads\Sahtain` directory (`/client` on port `5173` or Vite default, `/server` on port `5000`).
> Database connects to MongoDB (local `mongodb://localhost:27017/sahtain_db` or via `.env`).

> [!NOTE]
> All UI styling, text content, labels, forms, toasts, and navigation are built specifically in **Arabic (`dir="rtl"`)** for a realistic storefront experience.

---

## Open Questions

*None at this stage. All requirements from the project specification have been integrated into this architecture.*

---

## Proposed Changes

We will build the codebase systematically inside `Sahtain/`:

### Phase 1: Environment & Foundational Setup
- Initialize `/client` (Vite + React + Tailwind CSS + Lucide Icons + React Router DOM).
- Configure Tailwind CSS for RTL support, Google Fonts (`Tajawal`), custom water color themes.
- Initialize `/server` (Node + Express + Mongoose + JWT + bcryptjs + cors).
- Setup root `.env` and database configuration (`/server/config/db.js`).

### Phase 2: Database Models & API Routes
- Create Mongoose models (`User`, `Product`, `Order`, `B2BRequest`, `CharityRequest`, `Review`).
- Implement Auth, Product, Order, B2B, Charity, and Review controllers & routes.
- Implement database seed script (`seeder.js`) for demo products, test credentials (`admin@test.com`, `customer@test.com`), orders, and requests.

### Phase 3: Core Frontend Layout & State Management
- Setup `AuthContext`, `CartContext` (persistent in `localStorage`), and `ToastContext`.
- Build Header (Logo, Nav links, Dynamic search modal, User icon, Cart drawer trigger with count badge, Mobile menu).
- Build CartDrawer component (Item list, quantity adjusters, financial subtotal, VAT 15%, delivery fee, direct checkout).
- Build Footer component with tax registration information and customer care links.

### Phase 4: Customer Storefront Pages
- **Home Page**: Hero banner, 3 Customer category cards, Featured products, Values, Testimonials.
- **Product Catalog & Details**: Grid view with filters & dynamic search, detailed product page with gallery and quantity controls.
- **Shopping Cart & Checkout**: Multi-step checkout form, payment method simulation (COD, Card, Apple Pay), order summary.
- **Order Success Page**: Order details & reference code `#SH-XXXXXX`.

### Phase 5: Category & Inquiry Pages
- **Individuals Page**: Consumer pack listings.
- **B2B Business Page**: Commercial inquiry form & info.
- **Mosque & Charity Water Page**: Charity distribution form & info.
- **Satisfaction Page**: Rating & feedback submission.
- **Informational Pages**: About, FAQ (Accordions), User Guide, Delivery Information, Privacy Policy, Terms of Use.

### Phase 6: Authentication, User Account & Admin Dashboard
- **Login / Register Pages**: JWT token management & form validations.
- **User Account & History**: Customer profile & past order tracking.
- **Admin Dashboard (`/admin`)**:
  - Statistics overview (Sales, Orders, Customers, Products).
  - Products management (Create, edit, toggle active, stock).
  - Orders management (Status update dropdown: جديد, قيد المعالجة, خرج للتوصيل, etc.).
  - B2B & Charity request management.
  - Customer review moderation.

---

## Verification Plan

### Automated & API Verification
- Execute seed script (`node server/seed/seeder.js`) to verify DB population.
- Run Express backend server and test REST API endpoints using test scripts or curl/HTTP requests.

### Manual UI Verification
- Verify Arabic RTL layout and responsiveness across Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (375px).
- Test dynamic header search bar with keyword queries (e.g. "500", "عبوة", SKU).
- Test Cart Drawer persistence, item addition/deletion, quantity updates, VAT (15%) and Shipping calculation.
- Complete end-to-end checkout flow from Cart -> Checkout -> Order Success.
- Log in as `admin@test.com` / `Admin1234` and test Admin Dashboard functionalities (Product creation, status updates).
- Verify B2B and Charity form submissions and check that submissions appear in Admin dashboard.
