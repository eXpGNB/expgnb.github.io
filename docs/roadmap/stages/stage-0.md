# Stage 0: Setup

## Setup
There main requiremnents for running the gNodeB and UE within your own hardware are:-

### Unix
- Any distribution of linux can be used to deploy both the `gNodeB` as well as the `UE`
::: warning
The current version has only been tested out on ubuntu 22.04, thus although possible, there could be dependency issues in other distros
:::

### Docker
- The core network will be deployed as docker container
- Thus it is important to set up docker in your system
- Refer to the [docker installation page](https://docs.docker.com/engine/install/ubuntu/) for installation


### Git
- As we will be relying on a few open-source libraries and services, `git` is required to use those libraries
- On top of that, versioning your progress can also help in debugging if anything goes wrong


### Setup a working directory
- For the ease of use, let us create a common working directory, where we shall keep the configuration and other relevant files to our project
- make a folder within the home directory of the user as follows
```bash
cd ~
mkdir expgnb
```


### Openairinterface5g
- OpenAirInterface5G (OAI) is an open-source software suite that implements key components of 4G and 5G mobile networks, including the core network (5GC), the base station (gNodeB), and user equipment (UE). 
- It provides a fully customizable and extensible framework for research, prototyping, and deployment of cellular networks.
- [click here](/setup/oai) for build steps 


### Clone config files
```bash
cd ~/expgnb
git clone https://github.com/expgnb/expgnb.git conf-files
cd conf-files
rm -rf .git
```

### UHD Drivers
- Required to interface with USRP devices
- [clieck here](/setup/uhd.md) for installation steps
::: info
This can be skipped in the initial stage
:::

### Conclusion
- Once all the installation is completed, you are ready to move on to the rest of the stages