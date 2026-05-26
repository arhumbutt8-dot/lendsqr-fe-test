# Lendsqr Admin Dashboard

A production-grade admin dashboard for Lendsqr, built with React 18, Vite, TypeScript (strict), SCSS Modules, React Router v6, and Axios.

---

## Features

- **Login page** — two-column layout with form validation, show/hide password, and localStorage auth
- **Users list** — stat cards, filterable/sortable table, pagination, skeleton loading, action menus
- **User detail** — profile header with tier stars, tabbed sections, status management
- **Protected routes** — redirect to login if unauthenticated
- **Responsive** — full layout ≥900px, 2-col cards at tablet, drawer sidebar on mobile
- **Context + useReducer** — global users state with optimistic status updates cached to localStorage

---

## Setup

### 1. Install dependencies

```bash
cd lendsqr
npm install
```

### 2. Configure environment variable

Open `.env` and replace `YOUR_MOCK_ID` with your actual Mocky.io UUID:

```env
VITE_API_URL=https://run.mocky.io/v3/YOUR_MOCK_ID
```

> **How to get a Mocky.io URL:**
> 1. Go to [https://designer.mocky.io](https://designer.mocky.io)
> 2. Set Content-Type to `application/json`
> 3. Paste your generated JSON (500 user records matching the `User` interface in `src/types/index.ts`)
> 4. Click **Generate my HTTP Resource**
> 5. Copy the UUID from the resulting URL and paste it into `.env`

### 3. Generate mock data

Use the JSON Generator template below at [https://json-generator.com](https://json-generator.com):

```json
[
  '{{repeat(500)}}',
  {
    "id": "LSQ{{index(1, true)}}",
    "organization": "{{random('Lendsqr','Irorun','Lendstar')}}",
    "username": "{{firstName()}} {{surname()}}",
    "email": "{{email()}}",
    "phone": "0{{phone().replace(/\\D/g,'').slice(0,10)}}",
    "dateJoined": "{{date(new Date(2019,0,1), new Date(2023,11,31), 'MMM D, YYYY h:mm A')}}",
    "status": "{{random('Active','Inactive','Pending','Blacklisted')}}",
    "tier": "{{random(1,2,3)}}",
    "accountBalance": "{{integer(10000, 900000)}}",
    "accountNumber": "{{phone().replace(/\\D/g,'').slice(0,10)}}",
    "bankName": "{{random('Providus Bank','GTBank','First Bank','Access Bank','Zenith Bank')}}",
    "bvn": "{{phone().replace(/\\D/g,'').slice(0,11)}}",
    "gender": "{{random('Male','Female')}}",
    "maritalStatus": "{{random('Single','Married')}}",
    "children": "{{random('None','1','2','3+')}}",
    "typeOfResidence": "{{random(\"Parent's Apartment\",'Owned','Rented')}}",
    "levelOfEducation": "{{random('B.Sc','M.Sc','OND','HND')}}",
    "employmentStatus": "{{random('Employed','Self-employed','Unemployed')}}",
    "sectorOfEmployment": "{{random('FinTech','Education','Healthcare','Banking')}}",
    "durationOfEmployment": "{{random('1 year','2 years','3+ years')}}",
    "officeEmail": "{{email()}}",
    "monthlyIncome": "₦{{integer(50,400)}},000.00 – ₦{{integer(401,900)}},000.00",
    "loanRepayment": "₦{{integer(10,80)}},000",
    "twitter": "@{{username()}}",
    "facebook": "{{firstName()}} {{surname()}}",
    "instagram": "@{{username()}}",
    "guarantor1": {
      "name": "{{firstName()}} {{surname()}}",
      "phone": "0{{phone().replace(/\\D/g,'').slice(0,10)}}",
      "email": "{{email()}}",
      "relationship": "{{random('Sister','Brother','Friend','Spouse')}}"
    },
    "guarantor2": {
      "name": "{{firstName()}} {{surname()}}",
      "phone": "0{{phone().replace(/\\D/g,'').slice(0,10)}}",
      "email": "{{email()}}",
      "relationship": "{{random('Sister','Brother','Friend','Spouse')}}"
    }
  }
]
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 5. Build for production

```bash
npm run build
```

---

## Project Structure

```
lendsqr/
├── public/
├── src/
│   ├── assets/          # SVG logo
│   ├── components/
│   │   ├── Layout/      # Topbar, Sidebar
│   │   └── shared/      # StatusBadge, Pagination, FilterPanel
│   ├── context/         # UsersContext (global state)
│   ├── hooks/           # useUsers, useLocalStorage
│   ├── pages/
│   │   ├── Login/
│   │   ├── Users/
│   │   └── UserDetail/
│   ├── services/        # Axios API client
│   ├── styles/          # Global SCSS, variables, mixins
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # formatCurrency, formatDate, getInitials
│   ├── App.tsx          # Routes + ProtectedRoute
│   └── main.tsx         # Entry point
├── .env
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Environment Variables

| Variable        | Description                              |
|-----------------|------------------------------------------|
| `VITE_API_URL`  | Full Mocky.io URL for the users JSON API |

> Paste your Mocky.io URL directly as the value — no trailing slash needed.

---

## Notes

- Authentication is simulated via `localStorage.setItem('lsq_auth', 'true')` on login.
- User status changes (Blacklist / Activate) are persisted to both React context and `localStorage` under the key `user_<id>`.
- Navigating directly to `/users/LSQ000001` will resolve the user from context (already fetched on app mount) and cache them to localStorage automatically.
- The `Documents`, `Bank Details`, `Loans`, `Savings`, and `App and System` tabs show a "Coming Soon" placeholder — only `General Details` is fully implemented.
