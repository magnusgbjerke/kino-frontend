<p align="center">
  <!-- Dark mode -->
  <img src="https://github.com/magnusgbjerke/kino-frontend/blob/main/logo/cinema-dessert-fastfood-svgrepo-com-dark-mode.svg#gh-dark-mode-only" alt="accounting-book-svgrepo-com-dark-mode" width="170" />

  <!-- Light mode -->
  <img src="https://github.com/magnusgbjerke/kino-frontend/blob/main/logo/cinema-dessert-fastfood-svgrepo-com-light-mode.svg#gh-light-mode-only" alt="accounting-book-svgrepo-com-light-mode" width="170" />
</p>

<h3 align="center">Kino</h3>

<p align="center">
    <i>Administrasjonssystem for kino.</i>
    <br />
<br />
    <a href="#Introduction"><strong>Introduction</strong></a> ·
    <a href="#Features"><strong>Features</strong></a> ·
    <a href="#Technologies"><strong>Technologies</strong></a> ·
    <a href="#Getting-Started"><strong>Getting Started</strong></a>
</p>

## Introduction

<!--- Short description --->

72-hour exam. Grade: A

## Getting Started

### Prerequisites

- Node.js must be installed.
- Docker must be installed to run the Keycloak authentication server.

### Installing Dependencies

Before running the application, install the necessary dependencies:

```bash
cd kino-frontend

npm install
```

### Authentication (Keycloak)

To enable login and secure routes, you must start the Keycloak container.

```bash

cd kino-frontend

docker build -t keycloak -f keycloak.Dockerfile .

docker run --name keycloak -d -p 8081:8081 keycloak

```

### Running in Development Mode

```bash
cd tcs-frontend

npm run dev
```

### Running in Production Mode

```bash
cd tcs-frontend

npm run preview
```

## Troubleshooting

If Node.js processes hang or don’t shut down properly, you can force-stop them:

```bash
cd tcs-frontend

npm run stop-node
```
