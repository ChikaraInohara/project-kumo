"use client";

import { useEffect, useState } from "react";

type VM = {
  id: number;
  name: string;
  status: string;
  node: string;
  type: string;
  cpu: number;
  mem: string;
};

export default function Home() {
  const [vms, setVms] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://100.122.204.59:8000"; // あなたのAPIアドレス

  const fetchVMs = () => {
    fetch(`${API_URL}/api/vms`)
      .then((res) => res.json())
      .then((data) => {
        // ID順に並び替え
        const sorted = data.sort((a: VM, b: VM) => a.id - b.id);
        setVms(sorted);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchVMs();
    // 5秒ごとに自動更新するポーリング機能を追加（リアルタイム感！）
    const interval = setInterval(fetchVMs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePower = async (vm: VM, action: "start" | "stop") => {
    try {
      await fetch(`${API_URL}/api/vms/${vm.node}/${vm.id}/${vm.type}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      // ボタンを押した直後にデータを再取得
      setTimeout(fetchVMs, 1000);
    } catch (err) {
      alert("Failed to send command");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Project Kumo</h1>
        <button onClick={fetchVMs} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Connecting to Proxmox...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vms.map((vm) => (
            <div key={vm.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl transition hover:border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{vm.name}</h2>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      vm.status === "running" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                    }`}
                  >
                    {vm.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-gray-400 text-sm mb-6">
                <p>ID: {vm.id} / Node: {vm.node}</p>
                <div className="flex gap-4">
                    <p>CPU: {vm.cpu} vCore</p>
                    <p>Mem: {vm.mem}</p>
                </div>
              </div>

              {/* コントロールボタン */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handlePower(vm, "start")}
                  disabled={vm.status === "running"}
                  className={`py-2 rounded font-semibold ${
                    vm.status === "running" 
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }`}
                >
                  Start
                </button>
                <button
                  onClick={() => handlePower(vm, "stop")}
                  disabled={vm.status === "stopped"}
                  className={`py-2 rounded font-semibold ${
                    vm.status === "stopped" 
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                      : "bg-red-600 hover:bg-red-500 text-white"
                  }`}
                >
                  Stop
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}