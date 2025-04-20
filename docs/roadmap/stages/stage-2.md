# Connecting the USRP
A USRP (Universal Software Radio Peripheral) is a hardware device used for software-defined radio (SDR). It acts as a flexible, programmable radio front-end that can transmit and receive radio signals across a wide range of frequencies.


In a 5G network, a USRP is often used as the radio interface for the gNodeB (base station) or User Equipment (UE), allowing software like OpenAirInterface to process 5G protocols and communicate over the air using real RF signals instead of simulations.

::: tip PRE-REQUISITES
* build [openairinterface (USRP)](/setup/oai#usrp-setup)
* ensure the proper installation of [uhd drivers](/setup/uhd)
* make sure [configuration files](/roadmap/stages/stage-0#clone-config-files) are downloaded
* understand the workings of the core network
:::

## Before you start
This documentation has been made with exclusive testing on the following devices, and the same level of success with different hardware isn't guaranteed.
* [National Instruments USRP 2901 (type b210)](https://www.ni.com/en-in/shop/model/usrp-2901.html?srsltid=AfmBOoqkpBP2KKH0Qpc4WgEij-yHOcFpQtm939OiTWeB4Wd1arCu5RSO)
* [VERT2450 Antenna](https://www.ettus.com/all-products/vert2450/)


::: info NOTE
* The configuration provided is exclusive for the above provided hardware.
* Success with different hardware, is not guaranteed, but is possible.
* For very dissimilar hardware, please refer to the default configuration files provided by `openairinterface5g` directly and fine tune them as required.
:::


## Connecting the USRPs
Connect the USRPs to each of the devices (gNodeB & UE) via the provided ethernet / USB interface. The NI USRP-2901 used in this tutorial has a USB 3.0 interface, which is what will be refered to in this demo.
::: info NOTE
It is important to note that, even though the USRPs can perform well even with just the power provided by the USB connector, for proper utilization of the hardware, it is recommended to make use of the provided DC charging adapter provided with each USRP as well.
:::


Now verify the proper connection of the USRP on the PCs by running 
```bash
sudo uhd_find_devices
```
Both of the PCs should show that the USRP is connected



## Interfacing the USRPs with each other
USRPs can connect to each other via both an `antenna` as well as `SMA` cables connecting their TX and RX ports to each other.

::: danger NOTE
To utilize the `SMA` cable, it is **very important** to note that the cable should **never** be directly connected to each other, instead an attenuator should be utilized
:::


In this demo, we have used Ettus Research V2450 antenna, for the interface



## Establishing the connection

### Running the core network
Run the core network as shown before in stage 1


### Running the gNodeB
::: details ~/expgnb/conf-files/conf/usrp/gnb-du.sa.band78.106prb.conf (gNodeB config file)
```yaml
Active_gNBs = ( "gNB-OAI");
# Asn1_verbosity, choice in: none, info, annoying
Asn1_verbosity = "none";

gNBs =
(
 {
    ////////// Identification parameters:
    gNB_ID    =  0xe00;
    gNB_name  =  "gNB-OAI";

    // Tracking area code, 0x0000 and 0xfffe are reserved values
    tracking_area_code  =  1;
    plmn_list = ({ mcc = 001; mnc = 01; mnc_length = 2; snssaiList = ({ sst = 1; }) });

    nr_cellid = 12345678L;
    min_rxtxtime = 6;

    ////////// Physical parameters:

    do_CSIRS                                                  = 1;
    do_SRS                                                    = 1;

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
        ra_msg3_max_harq_rounds                                     = 6;
        timingAdvanceOffset                                         = 2;
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
    amf_ip_address = ({ ipv4 = "192.168.70.132"; });


    NETWORK_INTERFACES :
    {
        GNB_IPV4_ADDRESS_FOR_NG_AMF              = "192.168.70.129/24";
        GNB_IPV4_ADDRESS_FOR_NGU                 = "192.168.70.129/24";
        GNB_PORT_FOR_S1U                         = 2152; # Spec 2152
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
}
);

L1s = (
{
  num_cc = 1;
  tr_n_preference       = "local_mac";
  prach_dtx_threshold   = 120;
  pucch0_dtx_threshold  = 100;
  ofdm_offset_divisor   = 8; #set this to UINT_MAX for offset 0
}
);

RUs = (
{
  local_rf       = "yes"
  nb_tx          = 1
  nb_rx          = 1
  att_tx         = 12;
  att_rx         = 12;
  bands          = [78];
  max_pdschReferenceSignalPower = -27;
  max_rxgain                    = 114;
  eNB_instances  = [0];
  clock_src = "internal";

  tx_gain = 30;
  rx_gain = 110;
}
);


rfsimulator :
{
  serveraddr = "server";
  serverport = 4043;
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

log_config :
{
  global_log_level                      ="info";
  hw_log_level                          ="info";
  phy_log_level                         ="info";
  mac_log_level                         ="info";
  rlc_log_level                         ="info";
  pdcp_log_level                        ="info";
  rrc_log_level                         ="info";
  ngap_log_level                        ="debug";
  f1ap_log_level                        ="debug";
};

e2_agent = {
  near_ric_ip_addr = "127.0.0.1";
  #sm_dir = "/path/where/the/SMs/are/located/"
  sm_dir = "/usr/local/lib/flexric/"
};
```
:::

Run the gNodeB on a new terminal instance 
```bash
cd ~/expgnb/openairinterface/cmake_targets/ran_build/build
sudo ./nr-softmodem -E --sa -O ~/expgnb/conf-files/conf/usrp/gnb-du.sa.band78.106prb.conf  --continuous --tx
```


### Run the UE
::: details ~/expgnb/conf-files/conf/usrp/ue-usrp.conf (UE config file)
```yaml
sa=1;
rfsim=0;

uicc0 = {
  imsi = "001010000000001";
  key = "fec86ba6eb707ed08905757b1bb44b8f";
  opc = "C42449363BBAD02B66D16BC975D77CC1";
  dnn = "oai";
  nssai_sst = 1;
};

telnetsrv = {
  listenport = 9091;
  histfile = "~/history.telnetsrv";
};

PRSs =
(
  {
    Active_gNBs = 1;
    prs_config0 = (
    {
      gNB_id = 0;
      NumPRSResources       = 1;
      PRSResourceSetPeriod  = [20, 2];
      SymbolStart           = [7];
      NumPRSSymbols         = [6];
      NumRB                 = 106;
      RBOffset              = 0;
      CombSize              = 4;
      REOffset              = [0];
      PRSResourceOffset     = [0];
      PRSResourceRepetition = 1;
      PRSResourceTimeGap    = 1;
      NPRS_ID               = [0];
      MutingPattern1        = [];
      MutingPattern2        = [];
      MutingBitRepetition   = 1;
    }
    );
  }
);

UE_rf_config = {
  rf_device         = "usrp";
  usrp_args         = "type=b210,master_clock_rate=3619200000"; // Update with your USRP device args
  enable_rx         = true;
  enable_tx         = true;
  maxHARQ_Tx        = 10; 
  rx_gain           = 10;
  tx_gain           = 10;
  center_frequency  = 3.5e9;
  sample_rate       = 3619200000
  numerology = 2;
};


rfsimulator :
{
    serveraddr = "192.168.1.1";
    serverport = "4043";
    options = (); #("saviq"); or/and "chanmod"
    modelname = "AWGN";
};
```
:::


Run the UE on the PC dedicated for UE
```bash
cd ~/expgnb/openairinterface5g/cmake_targets/ran_build/build
sudo ./nr-uesoftmodem -E --numerology 1 -r 106 --band 78 -C 3619200000 --ssb 516 -O ~/expgnb/conf-filesconf/usrp/ue-usrp.conf
```

## Testing the connection
If the USRPs are kept at a close enough range without much outside interference, you should see data being transfered between the gNodeB and the UE as logs on the terminal


We can now verify if the connection by checking whether the UE has received an IP address via the DCHP server within the core network. This can be checked by running 
```bash
ip a
```
The output should contain the following device if the connection has been successful
```bash
...
3: oaitun_ue1: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 500
    link/[??] 
    inet 10.0.0.2/24 scope global oaitun_ue1
       valid_lft forever preferred_lft forever
...
```

## Add default routes
Till now, we have only tested the connection via the command line interface. 

Unfortunately, as such a network isn't automatically supported by the `linux` operating system, which only defaults to either `ethernet` or `WiFi`, we have to manually add routes default routes to force the device to route the packets via this interface


To do that, run this command
```bash
sudo ip route add default via 10.0.0.1 dev oaitun_ue1
```


Now you will be able to use this connection as if it was directly connected to a WiFi / ethernet network

::: info NOTE
To ensure the UE can access the external network via the gNodeB, ensure that the PC containing the gNodeB is connected to the outside network.
For the demo, we will basically be using the core network similar to how we use a **WiFi hotspot**
:::


To test it out, open the browser and try to access any web page as usual.

::: danger IN PROGRESS
* There still exists bugs in the configuration that leads to the gNodeB crashing after a certain amount of data has been transfered between the gNodeB and the UE
* The reason of the bug is under exploration, and will be fixed in the later iterations
* Any suggestions / contributions are welcome!
:::