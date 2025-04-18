# RF Simulator
OpenAirInterface5G provides a software-based radio interface that emulates the physical radio environment. This RF simulator allows users to emulate the behavior of hardware like USRP devices, enabling communication between the gNodeB and UE without requiring actual RF hardware.

By using the RF simulator, we can first validate the setup of the core network and UE in a virtual environment. This provides a stable foundation for testing and debugging before transitioning to a physical setup with real RF equipment.

::: tip PRE-REQUISITES
* build [openairinterface (rfsim)](/setup/oai#rf-simulator-setup)
* make sure [configuration files](/roadmap/stages/stage-0#clone-config-files) are downloaded

* understand the workings of the core network
:::


## Localhost setup
Once the required dependencies are downloaded and setup on both devices, we shall attempt to setup both the gNodeB as wellas the user equipment on a single device first, before we move on to a multi-device setup

### Setup the core network
::: details docker-compose.yaml
```yaml
services:
    mysql:
        container_name: "mysql"
        image: mysql:8.0
        volumes:
            - ./database/oai_db.sql:/docker-entrypoint-initdb.d/oai_db.sql
            - ./healthscripts/mysql-healthcheck.sh:/tmp/mysql-healthcheck.sh
        environment:
            - TZ=Europe/Paris
            - MYSQL_DATABASE=oai_db
            - MYSQL_USER=test
            - MYSQL_PASSWORD=test
            - MYSQL_ROOT_PASSWORD=linux
        healthcheck:
            test: /bin/bash -c "/tmp/mysql-healthcheck.sh"
            interval: 5s
            timeout: 2s
            retries: 10
        networks:
            public_net:
                ipv4_address: 192.168.70.131
                
    ims:
        container_name: "ims"
        image: oaisoftwarealliance/ims:latest
        volumes:
            - ./conf/sip.conf:/etc/asterisk/sip.conf
            - ./conf/users.conf:/etc/asterisk/users.conf
        healthcheck:
            test: /bin/bash -c "pgrep asterisk"
            interval: 5s
            timeout: 2s
            retries: 10
        networks:
            public_net:
                ipv4_address: 192.168.70.139
    oai-udr:
        container_name: "oai-udr"
        image: oaisoftwarealliance/oai-udr:develop
        expose:
            - 80/tcp
            - 8080/tcp
        volumes:
            - ./conf/config.yaml:/openair-udr/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - mysql
            - oai-nrf
        networks:
            public_net:
                ipv4_address: 192.168.70.136
    oai-udm:
        container_name: "oai-udm"
        image: oaisoftwarealliance/oai-udm:develop
        expose:
            - 80/tcp
            - 8080/tcp
        volumes:
            - ./conf/config.yaml:/openair-udm/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - oai-udr
        networks:
            public_net:
                ipv4_address: 192.168.70.137
    oai-ausf:
        container_name: "oai-ausf"
        image: oaisoftwarealliance/oai-ausf:develop
        expose:
            - 80/tcp
            - 8080/tcp
        volumes:
            - ./conf/config.yaml:/openair-ausf/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - oai-udm
        networks:
            public_net:
                ipv4_address: 192.168.70.138
    oai-nrf:
        container_name: "oai-nrf"
        image: oaisoftwarealliance/oai-nrf:develop
        expose:
            - 80/tcp
            - 8080/tcp
        volumes:
            - ./conf/config.yaml:/openair-nrf/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        networks:
            public_net:
                ipv4_address: 192.168.70.130
    oai-amf:
        container_name: "oai-amf"
        image: oaisoftwarealliance/oai-amf:develop
        expose:
            - 80/tcp
            - 8080/tcp
            - 38412/sctp
        volumes:
            - ./conf/config.yaml:/openair-amf/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - mysql
            - oai-nrf
            - oai-ausf
        networks:
            public_net:
                ipv4_address: 192.168.70.132
    oai-smf:
        container_name: "oai-smf"
        image: oaisoftwarealliance/oai-smf:develop
        expose:
            - 80/tcp
            - 8080/tcp
            - 8805/udp
        volumes:
            - ./conf/config.yaml:/openair-smf/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - oai-nrf
            - oai-amf
        networks:
            public_net:
                ipv4_address: 192.168.70.133
    oai-upf:
        container_name: "oai-upf"
        image: oaisoftwarealliance/oai-upf:develop
        expose:
            - 2152/udp
            - 8805/udp
        volumes:
            - ./conf/config.yaml:/openair-upf/etc/config.yaml
        environment:
            - TZ=Europe/Paris
        depends_on:
            - oai-nrf
            - oai-smf
        cap_add:
            - NET_ADMIN
            - SYS_ADMIN
        cap_drop:
            - ALL
        privileged: true
        networks:
            public_net:
                ipv4_address: 192.168.70.134
    oai-ext-dn:
        privileged: true
        init: true
        container_name: oai-ext-dn
        image: oaisoftwarealliance/trf-gen-cn5g:jammy
        entrypoint: /bin/bash -c \
              "ip route add 10.0.0.0/16 via 192.168.70.134 dev eth0; ip route; sleep infinity"
        command: ["/bin/bash", "-c", "trap : SIGTERM SIGINT; sleep infinity & wait"]
        healthcheck:
            test: /bin/bash -c "ip r | grep 10.0.0"
            interval: 5s
            timeout: 2s
            retries: 10
        networks:
            public_net:
                ipv4_address: 192.168.70.135
networks:
    public_net:
        driver: bridge
        name: oai-cn5g-public-net
        ipam:
            config:
                - subnet: 192.168.70.128/26
        driver_opts:
            com.docker.network.bridge.name: "oai-cn5g"
```
:::

pull all the docker images
```bash
docker compose pull
```

start the core network
```bash
docker compose -f docker-compose.yaml up -d
```

watch the status of the core network
```bash
watch docker compose -f docker-compose.yaml ps -a
```

All the docker containers should be healthy


### Run the gNodeB
::: details gnb.sa.band78.106prb.rfsim.conf (gNodeB config file)
```yaml
Active_gNBs = ( "gNB-OAI");
# Asn1_verbosity, choice in: none, info, annoying
Asn1_verbosity = "none";
sa=1;

device: { name = "rfsimulator" }

gNBs =
(
 {
    ////////// Identification parameters:
    gNB_ID    =  0xe00;
    gNB_name  =  "gNB-OAI";

    // Tracking area code, 0x0000 and 0xfffe are reserved values
    tracking_area_code  =  1;
    plmn_list = ({ mcc = 001; mnc = 01; mnc_length = 2; snssaiList = ({ sst = 1 }) });

    nr_cellid = 12345678L;

    ////////// Physical parameters:

    ssb_SubcarrierOffset                                      = 0;
    pdsch_AntennaPorts_N1                                     = 1;
    pusch_AntennaPorts                                        = 1;
    min_rxtxtime                                              = 6;
    enable_sdap                                               = 0;
    #sib1_tda                                                  = 0;

     pdcch_ConfigSIB1 = (
      {
        controlResourceSetZero = 12;
        searchSpaceZero = 0;
      }
      );

    servingCellConfigCommon = (
    {
 #spCellConfigCommon

      physCellId                                                    = 0;

#  downlinkConfigCommon
    #frequencyInfoDL
      # this is 3600 MHz + 43 PRBs@30kHz SCS (same as initial BWP)
      absoluteFrequencySSB                                             = 641280;
      dl_frequencyBand                                                 = 78;
      # this is 3600 MHz
      dl_absoluteFrequencyPointA                                       = 640008;
      #scs-SpecificCarrierList
        dl_offstToCarrier                                              = 0;
# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
        dl_subcarrierSpacing                                           = 1;
        dl_carrierBandwidth                                            = 106;
     #initialDownlinkBWP
      #genericParameters
        # this is RBstart=27,L=48 (275*(L-1))+RBstart
        initialDLBWPlocationAndBandwidth                               = 28875; # 6366 12925 12956 28875 12952
# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
        initialDLBWPsubcarrierSpacing                                   = 1;
      #pdcch-ConfigCommon
        initialDLBWPcontrolResourceSetZero                              = 12;
        initialDLBWPsearchSpaceZero                                     = 0;

  #uplinkConfigCommon
     #frequencyInfoUL
      ul_frequencyBand                                              = 78;
      #scs-SpecificCarrierList
      ul_offstToCarrier                                             = 0;
# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
      ul_subcarrierSpacing                                          = 1;
      ul_carrierBandwidth                                           = 106;
      pMax                                                          = 20;
     #initialUplinkBWP
      #genericParameters
        initialULBWPlocationAndBandwidth                            = 28875;
# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
        initialULBWPsubcarrierSpacing                               = 1;
      #rach-ConfigCommon
        #rach-ConfigGeneric
          prach_ConfigurationIndex                                  = 98;
#prach_msg1_FDM
#0 = one, 1=two, 2=four, 3=eight
          prach_msg1_FDM                                            = 0;
          prach_msg1_FrequencyStart                                 = 0;
          zeroCorrelationZoneConfig                                 = 13;
          preambleReceivedTargetPower                               = -96;
#preamblTransMax (0...10) = (3,4,5,6,7,8,10,20,50,100,200)
          preambleTransMax                                          = 6;
#powerRampingStep
# 0=dB0,1=dB2,2=dB4,3=dB6
        powerRampingStep                                            = 1;
#ra_ReponseWindow
#1,2,4,8,10,20,40,80
        ra_ResponseWindow                                           = 4;
#ssb_perRACH_OccasionAndCB_PreamblesPerSSB_PR
#1=oneeighth,2=onefourth,3=half,4=one,5=two,6=four,7=eight,8=sixteen
        ssb_perRACH_OccasionAndCB_PreamblesPerSSB_PR                = 4;
#oneHalf (0..15) 4,8,12,16,...60,64
        ssb_perRACH_OccasionAndCB_PreamblesPerSSB                   = 14;
#ra_ContentionResolutionTimer
#(0..7) 8,16,24,32,40,48,56,64
        ra_ContentionResolutionTimer                                = 7;
        rsrp_ThresholdSSB                                           = 19;
#prach-RootSequenceIndex_PR
#1 = 839, 2 = 139
        prach_RootSequenceIndex_PR                                  = 2;
        prach_RootSequenceIndex                                     = 1;
        # SCS for msg1, can only be 15 for 30 kHz < 6 GHz, takes precendence over the one derived from prach-ConfigIndex
        #
        msg1_SubcarrierSpacing                                      = 1,
# restrictedSetConfig
# 0=unrestricted, 1=restricted type A, 2=restricted type B
        restrictedSetConfig                                         = 0,

        msg3_DeltaPreamble                                          = 1;
        p0_NominalWithGrant                                         =-90;

# pucch-ConfigCommon setup :
# pucchGroupHopping
# 0 = neither, 1= group hopping, 2=sequence hopping
        pucchGroupHopping                                           = 0;
        hoppingId                                                   = 40;
        p0_nominal                                                  = -90;
# ssb_PositionsInBurs_BitmapPR
# 1=short, 2=medium, 3=long
      ssb_PositionsInBurst_PR                                       = 2;
      ssb_PositionsInBurst_Bitmap                                   = 1;

# ssb_periodicityServingCell
# 0 = ms5, 1=ms10, 2=ms20, 3=ms40, 4=ms80, 5=ms160, 6=spare2, 7=spare1
      ssb_periodicityServingCell                                    = 2;

# dmrs_TypeA_position
# 0 = pos2, 1 = pos3
      dmrs_TypeA_Position                                           = 0;

# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
      subcarrierSpacing                                             = 1;


  #tdd-UL-DL-ConfigurationCommon
# subcarrierSpacing
# 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120
      referenceSubcarrierSpacing                                    = 1;
      # pattern1
      # dl_UL_TransmissionPeriodicity
      # 0=ms0p5, 1=ms0p625, 2=ms1, 3=ms1p25, 4=ms2, 5=ms2p5, 6=ms5, 7=ms10
      dl_UL_TransmissionPeriodicity                                 = 6;
      nrofDownlinkSlots                                             = 7;
      nrofDownlinkSymbols                                           = 6;
      nrofUplinkSlots                                               = 2;
      nrofUplinkSymbols                                             = 4;

      ssPBCH_BlockPower                                             = -25;
  }

  );


    # ------- SCTP definitions
    SCTP :
    {
        # Number of streams to use in input/output
        SCTP_INSTREAMS  = 2;
        SCTP_OUTSTREAMS = 2;
    };


    ////////// AMF parameters:
    amf_ip_address      = ( { ipv4       = "192.168.70.132"; } );


    NETWORK_INTERFACES :
    {
        GNB_IPV4_ADDRESS_FOR_NG_AMF              = "192.168.70.129/13";
        GNB_IPV4_ADDRESS_FOR_NGU                 = "192.168.70.129/26";
    };

  }
);

MACRLCs = (
    {
        num_cc                      = 1;
        tr_s_preference             = "local_L1";
        tr_n_preference             = "local_RRC";
        pusch_TargetSNRx10          = 150;
        pucch_TargetSNRx10          = 200;
    ulsch_max_frame_inactivity  = 20;
    dl_harq_round_max = 4;
    ul_harq_round_max = 4;
    }
);

L1s = (
    {
	num_cc = 1;
	tr_n_preference = "local_mac";
	prach_dtx_threshold = 120;
    pucch0_dtx_threshold = 150;
    ofdm_offset_divisor = 8; #set this to UINT_MAX for offset 0
    }
);

RUs = (
    {
       local_rf       = "yes"
         nb_tx          = 1
         nb_rx          = 1
         att_tx         = 0
         att_rx         = 0;
         bands          = [78];
         max_pdschReferenceSignalPower = -27;
         max_rxgain                    = 114;
         eNB_instances  = [0];
         #beamforming 1x4 matrix:
         bf_weights = [0x00007fff, 0x0000, 0x0000, 0x0000];
         clock_src = "internal";
    }
);

THREAD_STRUCT = (
  {
    #three config for level of parallelism "PARALLEL_SINGLE_THREAD", "PARALLEL_RU_L1_SPLIT", or "PARALLEL_RU_L1_TRX_SPLIT"
    parallel_config    = "PARALLEL_SINGLE_THREAD";
    #two option for worker "WORKER_DISABLE" or "WORKER_ENABLE"
    worker_config      = "WORKER_ENABLE";
  }
);

rfsimulator :
{
    serveraddr = "server";
    serverport = "4043";
    options = (); #("saviq"); or/and "chanmod"
    modelname = "AWGN";
    IQfile = "/tmp/rfsimulator.iqs";
};

security = {
  # preferred ciphering algorithms
  # the first one of the list that an UE supports in chosen
  # valid values: nea0, nea1, nea2, nea3
  ciphering_algorithms = ( "nea0" );

  # preferred integrity algorithms
  # the first one of the list that an UE supports in chosen
  # valid values: nia0, nia1, nia2, nia3
  integrity_algorithms = ( "nia2", "nia0" );

  # setting 'drb_ciphering' to "no" disables ciphering for DRBs, no matter
  # what 'ciphering_algorithms' configures; same thing for 'drb_integrity'
  drb_ciphering = "yes";
  drb_integrity = "no";
};

log_config = {
  global_log_level = "info";
};

#@include "channelmod_rfsimu.conf"
```
:::



Run the gNodeB
```bash
cd ~/openairinterface5g/cmake_targets/ran_build/build
sudo -E ./nr-softmodem --rfsim -O <path/to/gnb.sa.band78.106prb.rfsim.conf>
```


### Run the UE
::: details ue.conf (UE config file)
```yaml
sa=1;
rfsim=1;

uicc0 = {
  imsi = "001010000000001";
  key = "fec86ba6eb707ed08905757b1bb44b8f";
  opc= "C42449363BBAD02B66D16BC975D77CC1";
  dnn= "oai";
  nssai_sst=1;
}

telnetsrv = {
  listenport = 9091
  histfile = "~/history.telnetsrv"
}

rfsimulator :
{
    serveraddr = "127.0.0.1"; # gNodeB's IP address
    serverport = "4043";
    options = (); #("saviq"); or/and "chanmod"
    modelname = "AWGN";
};

#@include "channelmod_rfsimu.conf"
```
:::


Run the UE
```bash
cd ~/openairinterface5g/cmake_targets/ran_build/build
sudo -E ./nr-uesoftmodem -r 106 --numerology 1 --band 78 -C 3619200000 --rfsim --ssb 516 -O <path/to/ue.conf>
```


## Milestone 1
Once both the gNodeB and the UE are successfully running, you should be able to verify the establishment of a connection using the following steps

* the core network has a DHCP component, which should give the UE an IP address (by default in 10.0.0.1/24 submet)
this can be verified by running:-
```bash
ip a
```
The output should contain the following device if the connection has been successfull
```bash
# TODO add correct output
```

## Dedicated device for gNodeB and UE

### Establish an ethernet connection between the devices
* Connect both the devices via an ethernet cable
* Edit the network config to give IP addresses within the same subnet to both the devices
<div style="display: flex; justify-content: space-between;">
<div>

### gNodeB Configuration

| Setting       | Value            |
|---------------|------------------|
| IP Address    | `192.168.1.1`    |
| Subnet Mask   | `255.255.255.0`  |
| Gateway       | *(Leave blank)*  |

</div>
<div>

### UE Configuration

| Setting       | Value            |
|---------------|------------------|
| IP Address    | `192.168.1.2`    |
| Subnet Mask   | `255.255.255.0`  |
| Gateway       | `192.168.1.1`    |
</div>
</div>

### Setup required on the second device
* Do the same build procedure for openairinterface on the second device
* The docker containers are not required on the device running the UE


### Config changes required
::: details ue.conf (modified UE config file)
```yaml
sa=1;
rfsim=1;

uicc0 = {
  imsi = "001010000000001";
  key = "fec86ba6eb707ed08905757b1bb44b8f";
  opc= "C42449363BBAD02B66D16BC975D77CC1";
  dnn= "oai";
  nssai_sst=1;
}

telnetsrv = {
  listenport = 9091
  histfile = "~/history.telnetsrv"
}

rfsimulator :
{
    serveraddr = "192.168.1.1"; # gNodeB's IP address [!code focus]
    serverport = "4043";
    options = (); #("saviq"); or/and "chanmod"
    modelname = "AWGN";
};

#@include "channelmod_rfsimu.conf"
```
:::

### Now run the gNodeB and UE with the updated configuration files

Run the gNodeB on machine with IP `192.168.1.1`
```bash
cd ~/openairinterface5g/cmake_targets/ran_build/build
sudo -E ./nr-softmodem --rfsim -O <path/to/gnb.sa.band78.106prb.rfsim.conf>
```

Run the UE on the machine with IP `192.168.1.2`
```bash
cd ~/openairinterface5g/cmake_targets/ran_build/build
sudo -E ./nr-uesoftmodem -r 106 --numerology 1 --band 78 -C 3619200000 --rfsim --ssb 516 -O <path/to/ue.conf>
```
