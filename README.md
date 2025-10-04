# Booking Platform (Airbnb-style Clone)

A full-stack real estate booking platform that lets users **browse, list, and book** short-term rentals. It delivers a seamless experience for both **hosts** and **guests**, with modern UI, secure authentication, and end-to-end booking flows.

> 🔗 **Related Repositories**  
> **Frontend:**  [BOOKING_FRONTEND_REPO](https://github.com/ramirachdi/BookingFrontend) 
> **Backend:**  [BOOKING_BACKEND_REPO](https://github.com/ramirachdi/BookingBackend)

---

## ✨ Features

- 🔎 Property discovery: search, filter (price, dates, guests, amenities), map view  
- 🏡 Hosting: create, edit, publish listings with photos & pricing  
- 📆 Real-time availability & bookings with conflict prevention  
- 👤 Auth & profiles: sign up/in, saved favorites  
- 📨 Messaging & notifications
- ⚙️ Admin/Host tools: reservation management, earnings overview  
- 📱 Responsive, accessible UI

---
## 🛠️ Tech Stack (suggested)

- **Frontend:** React, Tailwind CSS, Map (Leaflet)  
- **Backend:** Node.js (NestJS)
- **DB:** MySQL
- **Auth:** JWT/Session
- **Infra:** Docker, Docker Compose; CI via GitHub Actions  

---
## 🚀 Getting Started

### 1) Clone repository

```bash
git clone https://github.com/ahmedrezgui/booking-platform
cd booking-platform
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d
```
### 2) Access App:
You can access the app on localhost:3001
