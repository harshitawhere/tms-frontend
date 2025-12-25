# Transportation Management System (TMS) – Frontend

This repository contains the **frontend application** for a **Transportation Management System (TMS)** Proof of Concept (PoC).

---

## 🚀 Project Overview

### Goal

The purpose of this project is to demonstrate:

- Secure frontend–backend integration using **GraphQL**
- Clear **role-based behavior** (Admin vs Employee)
- **Scalable UI composition** suitable for enterprise systems
- Thoughtful **separation of concerns**

---

## 🧩 System Context

React Frontend
|
| HTTP Basic Auth (Base64)
|
Spring Boot GraphQL Backend



- Authentication and authorization are **enforced server-side**  
- Frontend remains **stateless** and **role-aware**  
- Backend is the **single source of truth**

**Backend Repository:**  
👉 [https://github.com/harshitawhere/tms-backend](https://github.com/harshitawhere/tms-backend)

---

## 🔐 Authentication & Access Control

### Supported Roles

| Role      | Username | Password |
|------------|-----------|-----------|
| Admin      | admin     | admin     |
| Employee   | emp       | emp       |

### Authentication Mechanism

- **HTTP Basic Authentication**
- Credentials encoded using **Base64**
- Sent via `Authorization` header on every GraphQL request

**Example:**

Authorization: Basic base64(username:password)


Invalid credentials are rejected by the backend and prevent access to all application data.

---

## 👥 Role-Based Behavior

### Admin
- Create shipments (**GraphQL mutation**)
- Read shipment data
- Update shipments
- Delete shipments

### Employee
- Read shipment list
- View shipment details

> Authorization is handled entirely by backend security rules.  
> The frontend adapts UI behavior but does not enforce security.

---

## 🔁 Application Flow

### Admin Login
1. Admin authenticates  
2. Adds, updates, or deletes shipment records  

### Employee Login
1. Employee authenticates  
2. Views shipment data created by admin  

### Unauthorized Users
- Cannot access shipment data  

---

## 🖥️ UI Capabilities

### Navigation
- Hamburger menu with single-level submenus  
- Horizontal navigation for top-level actions  

### Data Views

#### Grid View
- Tabular representation  
- Optimized for scanning and comparison  

#### Tile View
- Card-based layout showing essential shipment attributes  
- Includes action menu (edit/delete/flag)

#### Detail View
- Click a shipment to view full details  
- Shown as expanded view or overlay  
- Supports navigation back to list  

---

## 🔗 Data Integration

- All data fetched via **GraphQL**
- Pagination, filtering, and sorting supported by backend
- Frontend remains **thin and declarative**

---

## ⚙️ Technology Stack

| Layer | Technology |
|--------|-------------|
| **UI** | React |
| **Data** | Apollo Client (GraphQL) |
| **Styling** | CSS / Tailwind CSS |
| **Auth** | HTTP Basic Auth |
| **Backend** | Spring Boot GraphQL |

---

## 🧰 Local Setup

### Prerequisites
- Node.js (v16+)
- npm
- Running backend service

### Steps

```
git clone https://github.com/harshitawhere/tms-frontend.git
cd tms-frontend
npm install --legacy-peer-deps
npm start

```


> Application runs at:  
> [**http://localhost:3000**](http://localhost:3000)

---

## 🎨 Design Rationale

- **Backend-first security:** Prevents trust leakage to client  
- **Stateless frontend:** Easier to scale and reason about  
- **POC-appropriate auth:** Basic Auth chosen for clarity over complexity  
- **Composable UI:** Grid/tile views designed for reuse  
- **Future-ready:** Architecture supports JWT, OAuth, and richer UI controls  

---

## 📈 Current State

- Authentication integrated  
- Admin CRUD workflows functional  
- Employee read-only access enforced  
- Multiple presentation views implemented  
- Clean separation between UI and domain logic  

---

## 🔮 Future Improvements

- Token-based authentication (JWT)  
- UI-level pagination controls  
- Enhanced error and loading states  
- Fine-grained role awareness in UI  
- Production-grade auth flows  


