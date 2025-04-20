# Setup UHD drivers 

To start with a clean install let us delete any existing UHD installations
```bash
sudo apt remove --purge uhd-host
sudo apt autoremove
```


Install the necessary dependencies
```bash
sudo apt update
sudo apt install -y cmake build-essential libboost-all-dev libusb-1.0-0-dev \
    python3-mako python3-numpy python3-requests python3-pip
```


Clone the UHD repository
* We shall clone uhd v3.15 which is the one that has been used for testing
```bash
cd ~/expgnb
mkdir tmp
cd tmp
git clone --branch UHD-3.15.LTS --single-branch https://github.com/EttusResearch/uhd.git 
cd uhd
```

Build and install UHD
```bash
mkdir build
cd build
cmake ../host
make -j$(nproc)
sudo make install
sudo ldconfig
```


If you still get an error, check for missing submodules
```bash
git submodule update --init --recursive
```


Once the installation has been completed, restart the device
```bash
sudo reboot
```


The installation can be verified by running
```bash
sudo uhd_find_devices
```
When running it for the first time, you might get an error asking you to download the required images. The images for the common USRPs can be done using
```bash
sudo uhd_images_downloader
export UHD_IMAGES_DIR=/usr/local/share/uhd # To make this persistent, add this to your user's .bashrc file to set at startup
```


Now when running the `uhd_find_devices` command, you should see an output similar to this
![uhd_find_devices output](/assets/uhd_find_devices.png)
