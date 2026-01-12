# ☁️ Project Kumo

![Status](https://img.shields.io/badge/Status-Alpha_v0.1.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**An IaaS Frontend for Proxmox VE.**

Project Kumo is a client-facing control panel designed for **Infrastructure as a Service (IaaS)** providers or IT administrators who need to lend resources to end-users.

It allows users to manage their assigned VMs and Networks within specific roles **without granting them direct access to the backend Proxmox host or cluster**, ensuring security and isolation.

> 🚧 **Note:** This project is currently in **Alpha (v0.1.0)**.

## ✨ Key Features

- **🛡️ Backend Isolation:** End-users interact only with Kumo's API. The underlying Proxmox host/cluster is completely hidden from the client.
- **👥 Role-Based Management:** Users can manage only the resources (VMs, IPs, VLANs) assigned to their contract/role.
- **⚡ Self-Service Portal:**
  - **Power Control:** Start, Stop, and Reboot VMs.
  - **Network Config:** Edit allowed Network interfaces and IP addresses (planned).
  - **Console Access:** Secure NoVNC access via the browser (planned).

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11), Proxmoxer
- **Infrastructure:** Docker, Docker Compose

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose installed.
- Access to a Proxmox VE instance (IP address, User, API Token).

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/ChikaraInohara/project-kumo.git](https://github.com/ChikaraInohara/project-kumo.git)
   cd project-kumo
