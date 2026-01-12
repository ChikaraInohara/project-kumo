# ☁️ Project Kumo

![Status](https://img.shields.io/badge/Status-Alpha_v0.1.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Granular Role-Based Access Control (RBAC) Frontend for Proxmox VE.**

Project Kumo is an IaaS (Infrastructure as a Service) management dashboard designed for organizations that need to **lend Proxmox resources to users without granting full access.**

By integrating with external authentication providers (AD/OAuth) and implementing a strict role-based permission system, Kumo ensures that end-users only see and control the specific resources (VMs, Networks, Storage) assigned to their role by the administrator.

> 🚧 **Note:** This project is currently in **Alpha (v0.1.0)**.

## ✨ Key Features

- **🔐 Identity Provider Integration:** Support for **Active Directory (LDAP)** and **OAuth2** (Google, GitHub, etc.). Users log in with their existing credentials.
- **🛡️ Role-Based Views:**
  - **Admin View:** Full control over defining roles, resource quotas, and visibility scopes.
  - **User View:** A simplified interface showing *only* the permitted resources. Users cannot see the underlying Proxmox cluster nodes or unassigned VMs.
- **⚡ Self-Service Portal:**
  - **Power Operations:** Start/Stop/Reboot assigned VMs.
  - **Network Management:** Edit IP addresses and VLAN settings within the allowed range.
  - **Console Access:** Secure, role-gated NoVNC access via the browser.

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11), Proxmoxer
- **Auth & DB:** OAuth2 / LDAP Integration, PostgreSQL (planned)
- **Infrastructure:** Docker, Docker Compose

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose installed.
- Access to a Proxmox VE instance.
- (Optional) An Identity Provider (AD/LDAP/OAuth) for full functionality.

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/ChikaraInohara/project-kumo.git
   cd project-kumo
```

2. **Setup Environment Variables**
   
   Create a `.env` file in the `backend` directory.
```bash
   # backend/.env
   PROXMOX_HOST=192.168.1.100
   PROXMOX_USER=root@pam
   PROXMOX_TOKEN_NAME=kumo
   PROXMOX_SECRET=your-secret-key
```

3. **Run with Docker Compose**
```bash
   docker compose up --build
```

4. **Access the Dashboard**
   
   Open your browser and go to: `http://localhost:3000`

## 👤 Author

**Chikara Inohara**

* GitHub: [@ChikaraInohara](https://github.com/ChikaraInohara)
* Twitter: [@InoharaChikara](https://x.com/InoharaChikara)
