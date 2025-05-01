# Setup openairinterface for base station (gNB) and user equipment (nrUE)

Open a new terminal and clone the ran repository
```bash
cd ~/expgnb
git clone https://gitlab.eurecom.fr/oai/openairinterface5g.git
```

### RF Simulator setup
compile the gNB and nrUE for rf simulator
```bash
cd ~/expgnb/openairinterface5g/
git checkout develop
source oaienv
cd cmake_targets/
./build_oai -I
./build_oai -w SIMU --gNB --nrUE --ninja
```


### USRP Setup
compile the gNB and nrUE for actual USRP setup (stage 2)
```bash
cd ~/expgnb/openairinterface5g/
git checkout develop
source oaienv
cd cmake_targets/
rm -rf ran_build
./build_oai -I
./build_oai -w USRP --gNB --nrUE
```

