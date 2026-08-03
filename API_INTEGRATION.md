# API Integration

Base URL:
```
https://b7a4-fixitnow.vercel.app/api/v1
```

This file maps each backend endpoint to the frontend component/page that should use it.

---

## Auth (`/auth`)

| Method | Endpoint | Role | Frontend Component | Notes |
|--------|----------|------|---------------------|-------|
| POST | `/auth/refreshtoken` | Public | Auth Provider / Axios Interceptor | Gets new access token using refresh token. Call automatically when access token expires. |

> Note: Other `/auth` routes (login, register, logout, etc.) were not shared. Add them here when available.

---

## User (`/user`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| GET | `/user/alluser` | ADMIN | Admin → User List Page |
| PUT | `/user/updateProfile` | ADMIN, CUSTOMER, TECHNICIAN | Profile → Edit Profile Form |
| GET | `/user/technicians` | Public | Technicians List Page |
| GET | `/user/technicians/:id` | Public | Technician Details Page |
| POST | `/user/technicians-availablity` | TECHNICIAN | Technician Dashboard → Add Availability |
| DELETE | `/user/technicians-availablity/:id` | TECHNICIAN | Technician Dashboard → Delete Availability |

---

## Categories (`/categories`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| POST | `/categories` | ADMIN | Admin → Add Category Form |
| DELETE | `/categories/:id` | ADMIN | Admin → Category List (Delete Button) |
| GET | `/categories` | Public | Category List / Home Page Dropdown |

---

## Services (`/service`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| POST | `/service` | ADMIN, TECHNICIAN | Add Service Form |
| DELETE | `/service/:id` | ADMIN, TECHNICIAN | Service List (Delete Button) |
| GET | `/service` | Public | Services Page (supports query by service name & category name) |
| GET | `/service/:id` | Public | Service Details Page |

---

## Booking (`/booking`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| POST | `/booking` | CUSTOMER | Booking Form |
| GET | `/booking` | CUSTOMER, TECHNICIAN, ADMIN | Booking List Page |
| GET | `/booking/:id` | CUSTOMER, TECHNICIAN, ADMIN | Booking Details Page |
| PATCH | `/booking/:bookingId/accept` | TECHNICIAN | Technician Dashboard → Accept Booking Button |
| PATCH | `/booking/:bookingId/complete` | TECHNICIAN | Technician Dashboard → Complete Service Button |

---

## Payment (`/payment`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| POST | `/payment/checkout` | ADMIN, CUSTOMER, TECHNICIAN | Booking → Checkout / Pay Now Button |
| GET | `/payment/history` | CUSTOMER, ADMIN | Payment History Page |
| GET | `/payment/:id` | CUSTOMER, TECHNICIAN, ADMIN | Payment Details Page |
| POST | `/payment/webhook` | Public (Stripe only) | Backend only, not used from frontend |

---

## Review (`/review`)

| Method | Endpoint | Role | Frontend Component |
|--------|----------|------|---------------------|
| POST | `/review` | CUSTOMER | Booking → Add Review Form |
| GET | `/review` | ADMIN, CUSTOMER, TECHNICIAN | Reviews List (Service/Technician Page) |

---

## Quick Notes

- Send JWT access token in `Authorization: Bearer <token>` header for all protected routes.
- If a request fails with `401`, call `/auth/refreshtoken` first, then retry the request.
- Roles: `ADMIN`, `CUSTOMER`, `TECHNICIAN`.
