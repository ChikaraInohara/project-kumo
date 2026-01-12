import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from proxmoxer import ProxmoxAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import urllib3

load_dotenv()

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
PROXMOX_HOST = os.getenv("PROXMOX_HOST")
TOKEN_ID = f"{os.getenv('PROXMOX_user')}!{os.getenv('PROXMOX_TOKEN_NAME')}"
SECRET_KEY = os.getenv("PROXMOX_SECRET")
# ==========================================

def get_proxmox_connection():
    return ProxmoxAPI(
        PROXMOX_HOST,
        user=TOKEN_ID.split("!")[0],
        token_name=TOKEN_ID.split("!")[1],
        token_value=SECRET_KEY,
        verify_ssl=False
    )

# フロントエンドから送られてくるデータの定義
class PowerAction(BaseModel):
    action: str  

@app.get("/api/vms")
def get_vms():
    proxmox = get_proxmox_connection()
    vms = []
    
    for node in proxmox.nodes.get():
        node_name = node['node']
        
        # VM (QEMU)
        for vm in proxmox.nodes(node_name).qemu.get():
            vms.append({
                "id": vm['vmid'],
                "name": vm['name'],
                "status": vm['status'],
                "node": node_name,      
                "type": "qemu",         
                "cpu": vm.get('cpus', 0),
                "mem": f"{round(vm.get('maxmem', 0) / 1024 / 1024 / 1024, 1)}GB" # 修正: 小数点1位まで表示(0GB問題解決)
            })

        # コンテナ (LXC)
        try:
            for lxc in proxmox.nodes(node_name).lxc.get():
                vms.append({
                    "id": lxc['vmid'],
                    "name": lxc['name'],
                    "status": lxc['status'],
                    "node": node_name,      
                    "type": "lxc",          
                    "cpu": lxc.get('cpus', 0),
                    "mem": f"{round(lxc.get('maxmem', 0) / 1024 / 1024 / 1024, 1)}GB" 
                })
        except:
            pass

    return vms

@app.post("/api/vms/{node}/{vmid}/{vm_type}/status")
def change_vm_status(node: str, vmid: int, vm_type: str, power: PowerAction):
    proxmox = get_proxmox_connection()
    
    try:
        if vm_type == "qemu":
            target = proxmox.nodes(node).qemu(vmid).status
        else:
            target = proxmox.nodes(node).lxc(vmid).status
            
        if power.action == "start":
            target.start.post()
        elif power.action == "stop":
            target.shutdown.post() 
            
        return {"message": f"Signal {power.action} sent to {vmid}"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))