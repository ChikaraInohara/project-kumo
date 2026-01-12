# ☁️ Project Kumo

![Status](https://img.shields.io/badge/Status-Alpha_v0.1.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**"Proxmox for Everyone."**

Project Kumo is a modern, simplified cloud management dashboard for **Proxmox VE**. It aims to provide an intuitive interface for developers and IT administrators to manage their virtual infrastructure without navigating the complexity of the default Proxmox GUI.

> 🚧 **Note:** This project is currently in **Alpha (v0.1.0)**. Use with caution in production environments.

## ✨ Features (v0.1.0)

- **🖥️ VM & Container List:** View all your QEMU VMs and LXC Containers across nodes in one dashboard.
- **⚡ Power Control:** Start and Shutdown VMs directly from the UI.
- **🔄 Real-time Status:** Polling mechanism updates VM status (CPU, Memory, Power) every 5 seconds.
- **🐳 Dockerized:** Fully containerized architecture for easy deployment.

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11), Proxmoxer
- **Infrastructure:** Docker, Docker Compose

## 🚀 Getting Started

You can run Project Kumo on your local machine or a server using Docker Compose.

### Prerequisites
- Docker & Docker Compose installed.
- Access to a Proxmox VE instance (IP address, User, API Token).

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/ChikaraInohara/project-kumo.git](https://github.com/ChikaraInohara/project-kumo.git)
   cd project-kumo
