# 🛠️ Serverless CRUD API with AWS Lambda, API Gateway & PostgreSQL

This project is a **serverless RESTful API** built using **AWS Lambda**, **Amazon API Gateway**, and **Amazon RDS (PostgreSQL)**. Each CRUD operation is implemented in a separate Lambda function written in **Node.js**. The infrastructure is managed using the **AWS SAM CLI**, and **GitHub Actions** handles CI/CD deployment.

---

## 📦 Tech Stack

- **Node.js** – JavaScript runtime for Lambda
- **AWS Lambda** – Serverless function execution
- **Amazon API Gateway** – Public RESTful API interface
- **Amazon RDS (PostgreSQL)** – Cloud-based SQL database
- **AWS SAM (Serverless Application Model)** – Infrastructure as Code
- **GitHub Actions** – Continuous integration and deployment

---

## 📁 Project Structure

```plaintext
.
├── create.js          # Lambda handler for creating a record
├── read.js            # Lambda handler for reading records
├── update.js          # Lambda handler for updating a record
├── delete.js          # Lambda handler for deleting a record
├── template.yml       # AWS SAM deployment template
├── package.json       # Node.js project metadata and dependencies
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions CI/CD configuration
```

---

## 🌐 API Endpoints

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | `/contacts`        | Create a new record |
| GET    | `/contacts`        | Fetch all records   |
| PUT    | `/contacts/{id}`   | Update a record     |
| DELETE | `/contacts/{id}`   | Delete a record     |

> **Note:** Endpoint paths depend on your deployed base path (e.g., `/dev`, `/prod`).

---

## ⚙️ Environment Variables

These are required for the Lambda functions to connect to the PostgreSQL database:

| Variable  | Description              |
|-----------|--------------------------|
| `DB_HOST` | PostgreSQL host name/IP  |
| `DB_USER` | PostgreSQL username      |
| `DB_PASS` | PostgreSQL password      |
| `DB_NAME` | PostgreSQL database name |

They are passed via the SAM template or injected through GitHub Secrets.

---

## 🧪 Local Development

### Prerequisites

- Node.js (v18+)
- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed
- PostgreSQL instance (local or on RDS)

### Install Dependencies

```bash
npm install
```

### Start the Local Server

```bash
sam local start-api
```

Test endpoints at: [http://localhost:3000/contacts](http://localhost:3000/contacts)

---

## 🚀 Deployment

### GitHub Actions Workflow

The `deploy.yml` workflow is triggered on every push to the `main` branch. It performs the following:

1. Builds the app with `sam build`.
2. Deploys to AWS with `sam deploy`.

Ensure these secrets are configured in your GitHub repository:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `DB_NAME`

### Manual Deployment

You can also deploy manually:

```bash
sam build
sam deploy --guided
```

Or use:

```bash
sam deploy \
  --stack-name sam-app \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    DB_HOST=your-host \
    DB_USER=your-user \
    DB_PASS=your-password \
    DB_NAME=your-db-name
```

---

## 🧹 Cleanup Resources

To delete all the deployed AWS resources:

```bash
sam delete --stack-name sam-app
```

This will remove Lambda functions, API Gateway, and other stack components.

---

## 💡 Future Improvements

- Add authentication (Cognito or JWT)
- Add input validation (Joi, express-validator)
- Add pagination, filtering, and sorting
- Write tests using Jest or Mocha
- Generate OpenAPI / Swagger docs

---

## 📄 License

This project is licensed under the MIT License.

---
