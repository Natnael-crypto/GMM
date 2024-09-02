# Guardian Muslim Marriage (GMM)

A modern Muslim marriage platform built with Next.js and NestJS, designed to help Muslims find compatible life partners while adhering to Islamic values.

## 🏗️ Architecture

```
GMM/
├── client/
│   └── gmm-fe/          # Next.js Frontend
├── server/
│   ├── gmm-api/         # NestJS Backend API
│   ├── directus/        # Directus CMS
│   └── monitoring/      # GlitchTip Error Monitoring
└── tests/               # E2E Tests
```

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl (supports 16+ languages)
- **State Management:** Zustand
- **Error Monitoring:** Sentry

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL with TypeORM
- **Authentication:** AWS Amplify
- **File Storage:** AWS S3
- **Payment Processing:** Stripe

### Infrastructure
- **CMS:** Directus with directus-sync
- **Error Tracking:** GlitchTip
- **CI/CD:** GitHub Actions
- **Deployment:** AWS (Amplify + EC2)

## 📋 Prerequisites

- Node.js 18+
- Yarn or npm
- PostgreSQL 14+
- Docker & Docker Compose
- AWS Account (for Amplify, S3)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AliT-GMM/GMM.git
cd GMM
```

### 2. Frontend Setup

```bash
cd client/gmm-fe
yarn install
yarn dev
```

### 3. Backend Setup

```bash
cd server/gmm-api
yarn install
yarn run start:dev
```

### 4. Directus CMS Setup

```bash
cd server/directus
docker compose up -d
```

### 5. Monitoring Setup (Optional)

```bash
cd server/monitoring/glitchtip
docker compose up -d
```

## 🌍 Supported Languages

| Language | Code |
|----------|------|
| English | en |
| Arabic | ar |
| Chinese (Mandarin) | zh-guoyu |
| Chinese (Cantonese) | zh-yue |
| French | fr |
| German | de |
| Spanish | es |
| Portuguese | pt |
| Russian | ru |
| Turkish | tr |
| Indonesian | id |
| Malay | ms-MY |
| Dutch | nl |
| Italian | it |
| Bosnian | bs |
| Somali | so |
| Albanian | sq |
| Tagalog | tl |

## 🔧 Development

### Running Tests

```bash
# Frontend tests
cd client/gmm-fe
yarn test

# Backend tests
cd server/gmm-api
yarn test
yarn test:e2e
```

### Database Migrations

```bash
cd server/gmm-api
yarn run migration:run
yarn run migration:generate
```

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_AWS_REGION=
NEXT_PUBLIC_USER_POOL_ID=
NEXT_PUBLIC_USER_POOL_CLIENT_ID=
```

### Backend (.env)
```
DATABASE_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ for the Muslim Ummah
