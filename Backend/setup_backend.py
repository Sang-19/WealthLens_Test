#!/usr/bin/env python3
"""
Backend Setup Script for WealthLens
This script helps set up the backend environment and dependencies.
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def print_step(step_num, total_steps, message):
    """Print a formatted step message"""
    print(f"\n[{step_num}/{total_steps}] {message}")
    print("-" * 50)

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python version: {version.major}.{version.minor}.{version.micro}")
    return True

def check_pip():
    """Check if pip is available"""
    try:
        subprocess.run([sys.executable, "-m", "pip", "--version"], 
                      check=True, capture_output=True)
        print("✅ pip is available")
        return True
    except subprocess.CalledProcessError:
        print("❌ pip is not available")
        return False

def install_dependencies():
    """Install Python dependencies"""
    try:
        print("Installing dependencies from requirements.txt...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True)
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def setup_env_file():
    """Set up environment file"""
    env_file = Path(".env")
    env_example = Path(".env.example")
    
    if env_file.exists():
        print("✅ .env file already exists")
        return True
    
    if env_example.exists():
        try:
            shutil.copy(env_example, env_file)
            print("✅ Created .env file from .env.example")
            print("⚠️  Please edit .env file and add your API keys:")
            print("   - GROQ_API_KEY (required)")
            print("   - TAVILY_API_KEY (required)")
            return True
        except Exception as e:
            print(f"❌ Failed to create .env file: {e}")
            return False
    else:
        print("❌ .env.example file not found")
        return False

def create_data_directory():
    """Create data directory for vector store"""
    data_dir = Path("data")
    if not data_dir.exists():
        try:
            data_dir.mkdir(parents=True, exist_ok=True)
            print("✅ Created data directory")
        except Exception as e:
            print(f"❌ Failed to create data directory: {e}")
            return False
    else:
        print("✅ Data directory already exists")
    return True

def test_imports():
    """Test if all required packages can be imported"""
    required_packages = [
        "fastapi",
        "uvicorn",
        "langchain",
        "agno",
        "python-dotenv",
        "tavily",
        "rich",
        "termcolor",
        "pydantic",
        "yfinance",
        "beautifulsoup4",
        "requests"
    ]
    
    failed_imports = []
    for package in required_packages:
        try:
            # Handle special cases
            if package == "python-dotenv":
                __import__("dotenv")
            elif package == "tavily":
                __import__("tavily")
            else:
                __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package}")
            failed_imports.append(package)
    
    if failed_imports:
        print(f"\n❌ Failed to import: {', '.join(failed_imports)}")
        return False
    else:
        print("\n✅ All required packages imported successfully")
        return True

def main():
    """Main setup function"""
    print("🚀 WealthLens Backend Setup")
    print("=" * 50)
    
    total_steps = 6
    current_step = 0
    
    # Step 1: Check Python version
    current_step += 1
    print_step(current_step, total_steps, "Checking Python version")
    if not check_python_version():
        sys.exit(1)
    
    # Step 2: Check pip
    current_step += 1
    print_step(current_step, total_steps, "Checking pip availability")
    if not check_pip():
        sys.exit(1)
    
    # Step 3: Install dependencies
    current_step += 1
    print_step(current_step, total_steps, "Installing dependencies")
    if not install_dependencies():
        sys.exit(1)
    
    # Step 4: Set up environment file
    current_step += 1
    print_step(current_step, total_steps, "Setting up environment file")
    if not setup_env_file():
        sys.exit(1)
    
    # Step 5: Create data directory
    current_step += 1
    print_step(current_step, total_steps, "Creating data directory")
    if not create_data_directory():
        sys.exit(1)
    
    # Step 6: Test imports
    current_step += 1
    print_step(current_step, total_steps, "Testing package imports")
    if not test_imports():
        print("\n⚠️  Some packages failed to import. You may need to install them manually.")
    
    print("\n" + "=" * 50)
    print("🎉 Backend setup completed!")
    print("\n📝 Next steps:")
    print("1. Edit the .env file and add your API keys")
    print("2. Run: python start_server.py")
    print("3. Test the API at: http://localhost:8000/health")
    print("\n🔑 Required API Keys:")
    print("- GROQ_API_KEY: Get from https://console.groq.com/keys")
    print("- TAVILY_API_KEY: Get from https://app.tavily.com/")

if __name__ == "__main__":
    main()
