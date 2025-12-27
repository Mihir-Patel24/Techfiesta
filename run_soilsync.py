#!/usr/bin/env python3
import subprocess
import sys
import time
import webbrowser
import os

def run_soilsync():
    print("🌱 Starting SoilSync AI System...")
    
    # Start Flask backend
    print("📡 Starting backend server...")
    backend_process = subprocess.Popen([
        sys.executable, "backend/app.py"
    ], cwd=os.getcwd())
    
    # Wait for backend to start
    time.sleep(3)
    
    # Start frontend server
    print("🌐 Starting frontend server...")
    frontend_process = subprocess.Popen([
        sys.executable, "-m", "http.server", "8000"
    ], cwd=os.getcwd())
    
    # Wait for frontend to start
    time.sleep(2)
    
    # Open browser
    print("🚀 Opening SoilSync in browser...")
    webbrowser.open("http://localhost:8000")
    
    print("\n✅ SoilSync is running!")
    print("📱 Frontend: http://localhost:8000")
    print("🔧 Backend API: http://localhost:5000")
    print("\nPress Ctrl+C to stop all servers")
    
    try:
        # Keep running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping SoilSync...")
        backend_process.terminate()
        frontend_process.terminate()
        print("✅ All servers stopped")

if __name__ == "__main__":
    run_soilsync()