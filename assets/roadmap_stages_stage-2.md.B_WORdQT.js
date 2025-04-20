import{_ as i,c as a,o as n,ae as l}from"./chunks/framework.Dh1jimFm.js";const o=JSON.parse('{"title":"Connecting the USRP","description":"","frontmatter":{},"headers":[],"relativePath":"roadmap/stages/stage-2.md","filePath":"roadmap/stages/stage-2.md"}'),e={name:"roadmap/stages/stage-2.md"};function p(t,s,h,k,r,d){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="connecting-the-usrp" tabindex="-1">Connecting the USRP <a class="header-anchor" href="#connecting-the-usrp" aria-label="Permalink to &quot;Connecting the USRP&quot;">​</a></h1><p>A USRP (Universal Software Radio Peripheral) is a hardware device used for software-defined radio (SDR). It acts as a flexible, programmable radio front-end that can transmit and receive radio signals across a wide range of frequencies.</p><p>In a 5G network, a USRP is often used as the radio interface for the gNodeB (base station) or User Equipment (UE), allowing software like OpenAirInterface to process 5G protocols and communicate over the air using real RF signals instead of simulations.</p><div class="tip custom-block"><p class="custom-block-title">PRE-REQUISITES</p><ul><li>build <a href="/setup/oai.html#usrp-setup">openairinterface (USRP)</a></li><li>ensure the proper installation of <a href="/setup/uhd.html">uhd drivers</a></li><li>make sure <a href="/roadmap/stages/stage-0.html#clone-config-files">configuration files</a> are downloaded</li><li>understand the workings of the core network</li></ul></div><h2 id="before-you-start" tabindex="-1">Before you start <a class="header-anchor" href="#before-you-start" aria-label="Permalink to &quot;Before you start&quot;">​</a></h2><p>This documentation has been made with exclusive testing on the following devices, and the same level of success with different hardware isn&#39;t guaranteed.</p><ul><li><a href="https://www.ni.com/en-in/shop/model/usrp-2901.html?srsltid=AfmBOoqkpBP2KKH0Qpc4WgEij-yHOcFpQtm939OiTWeB4Wd1arCu5RSO" target="_blank" rel="noreferrer">National Instruments USRP 2901 (type b210)</a></li><li><a href="https://www.ettus.com/all-products/vert2450/" target="_blank" rel="noreferrer">VERT2450 Antenna</a></li></ul><div class="info custom-block"><p class="custom-block-title">NOTE</p><ul><li>The configuration provided is exclusive for the above provided hardware.</li><li>Success with different hardware, is not guaranteed, but is possible.</li><li>For very dissimilar hardware, please refer to the default configuration files provided by <code>openairinterface5g</code> directly and fine tune them as required.</li></ul></div><h2 id="connecting-the-usrps" tabindex="-1">Connecting the USRPs <a class="header-anchor" href="#connecting-the-usrps" aria-label="Permalink to &quot;Connecting the USRPs&quot;">​</a></h2><p>Connect the USRPs to each of the devices (gNodeB &amp; UE) via the provided ethernet / USB interface. The NI USRP-2901 used in this tutorial has a USB 3.0 interface, which is what will be refered to in this demo.</p><div class="info custom-block"><p class="custom-block-title">NOTE</p><p>It is important to note that, even though the USRPs can perform well even with just the power provided by the USB connector, for proper utilization of the hardware, it is recommended to make use of the provided DC charging adapter provided with each USRP as well.</p></div><p>Now verify the proper connection of the USRP on the PCs by running</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uhd_find_devices</span></span></code></pre></div><p>Both of the PCs should show that the USRP is connected</p><h2 id="interfacing-the-usrps-with-each-other" tabindex="-1">Interfacing the USRPs with each other <a class="header-anchor" href="#interfacing-the-usrps-with-each-other" aria-label="Permalink to &quot;Interfacing the USRPs with each other&quot;">​</a></h2><p>USRPs can connect to each other via both an <code>antenna</code> as well as <code>SMA</code> cables connecting their TX and RX ports to each other.</p><div class="danger custom-block"><p class="custom-block-title">NOTE</p><p>To utilize the <code>SMA</code> cable, it is <strong>very important</strong> to note that the cable should <strong>never</strong> be directly connected to each other, instead an attenuator should be utilized</p></div><p>In this demo, we have used Ettus Research V2450 antenna, for the interface</p><h2 id="establishing-the-connection" tabindex="-1">Establishing the connection <a class="header-anchor" href="#establishing-the-connection" aria-label="Permalink to &quot;Establishing the connection&quot;">​</a></h2><h3 id="running-the-core-network" tabindex="-1">Running the core network <a class="header-anchor" href="#running-the-core-network" aria-label="Permalink to &quot;Running the core network&quot;">​</a></h3><p>Run the core network as shown before in stage 1</p><h3 id="running-the-gnodeb" tabindex="-1">Running the gNodeB <a class="header-anchor" href="#running-the-gnodeb" aria-label="Permalink to &quot;Running the gNodeB&quot;">​</a></h3><details class="details custom-block"><summary>~/expgnb/conf-files/conf/usrp/gnb-du.sa.band78.106prb.conf (gNodeB config file)</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Active_gNBs = ( &quot;gNB-OAI&quot;);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Asn1_verbosity, choice in: none, info, annoying</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Asn1_verbosity = &quot;none&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gNBs =</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ////////// Identification parameters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    gNB_ID    =  0xe00;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    gNB_name  =  &quot;gNB-OAI&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    // Tracking area code</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0x0000 and 0xfffe are reserved values</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    tracking_area_code  =  1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    plmn_list = (</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mcc = 001; mnc = 01; mnc_length = 2; snssaiList = (</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sst = 1;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    nr_cellid = 12345678L;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    min_rxtxtime = 6;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ////////// Physical parameters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    do_CSIRS                                                  = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    do_SRS                                                    = 1;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    servingCellConfigCommon = (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #spCellConfigCommon</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      physCellId                                                    = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#  downlinkConfigCommon</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    #frequencyInfoDL</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # this is 3600 MHz + 43 PRBs@30kHz SCS (same as initial BWP)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      absoluteFrequencySSB                                             = 641280;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dl_frequencyBand                                                 = 78;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # this is 3600 MHz</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dl_absoluteFrequencyPointA                                       = 640008;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #scs-SpecificCarrierList</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        dl_offstToCarrier                                              = 0;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        dl_subcarrierSpacing                                           = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        dl_carrierBandwidth                                            = 106;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     #initialDownlinkBWP</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #genericParameters</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # this is RBstart=27,L=48 (275*(L-1))+RBstart</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialDLBWPlocationAndBandwidth                               = 28875;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 6366 12925 12956 28875 12952</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialDLBWPsubcarrierSpacing                                   = 1;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #pdcch-ConfigCommon</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialDLBWPcontrolResourceSetZero                              = 12;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialDLBWPsearchSpaceZero                                     = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #uplinkConfigCommon</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     #frequencyInfoUL</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ul_frequencyBand                                              = 78;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #scs-SpecificCarrierList</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ul_offstToCarrier                                             = 0;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ul_subcarrierSpacing                                          = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ul_carrierBandwidth                                           = 106;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      pMax                                                          = 20;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     #initialUplinkBWP</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #genericParameters</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialULBWPlocationAndBandwidth                            = 28875;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        initialULBWPsubcarrierSpacing                               = 1;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      #rach-ConfigCommon</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #rach-ConfigGeneric</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          prach_ConfigurationIndex                                  = 98;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#prach_msg1_FDM</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#0 = one, 1=two, 2=four, 3=eight</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          prach_msg1_FDM                                            = 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          prach_msg1_FrequencyStart                                 = 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          zeroCorrelationZoneConfig                                 = 13;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          preambleReceivedTargetPower                               = -96;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#preamblTransMax (0...10) = (3,4,5,6,7,8,10,20,50,100,200)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          preambleTransMax                                          = 6;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#powerRampingStep</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=dB0,1=dB2,2=dB4,3=dB6</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        powerRampingStep                                            = 1;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#ra_ReponseWindow</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#1,2,4,8,10,20,40,80</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        ra_ResponseWindow                                           = 4;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        ra_msg3_max_harq_rounds                                     = 6;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        timingAdvanceOffset                                         = 2;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#ssb_perRACH_OccasionAndCB_PreamblesPerSSB_PR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#1=oneeighth,2=onefourth,3=half,4=one,5=two,6=four,7=eight,8=sixteen</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        ssb_perRACH_OccasionAndCB_PreamblesPerSSB_PR                = 4;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#oneHalf (0..15) 4,8,12,16,...60,64</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        ssb_perRACH_OccasionAndCB_PreamblesPerSSB                   = 14;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#ra_ContentionResolutionTimer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#(0..7) 8,16,24,32,40,48,56,64</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        ra_ContentionResolutionTimer                                = 7;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        rsrp_ThresholdSSB                                           = 19;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#prach-RootSequenceIndex_PR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#1 = 839, 2 = 139</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        prach_RootSequenceIndex_PR                                  = 2;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        prach_RootSequenceIndex                                     = 1;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # SCS for msg1, can only be 15 for 30 kHz &lt; 6 GHz, takes precendence over the one derived from prach-ConfigIndex</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        #</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        msg1_SubcarrierSpacing                                      = 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># restrictedSetConfig</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=unrestricted, 1=restricted type A, 2=restricted type B</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        restrictedSetConfig                                         = 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        msg3_DeltaPreamble                                          = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        p0_NominalWithGrant                                         =-90;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># pucch-ConfigCommon setup :</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># pucchGroupHopping</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0 = neither, 1= group hopping, 2=sequence hopping</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        pucchGroupHopping                                           = 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        hoppingId                                                   = 40;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        p0_nominal                                                  = -90;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ssb_PositionsInBurst_Bitmap                                   = 1;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ssb_periodicityServingCell</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0 = ms5, 1=ms10, 2=ms20, 3=ms40, 4=ms80, 5=ms160, 6=spare2, 7=spare1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ssb_periodicityServingCell                                    = 2;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># dmrs_TypeA_position</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0 = pos2, 1 = pos3</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dmrs_TypeA_Position                                           = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      subcarrierSpacing                                             = 1;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #tdd-UL-DL-ConfigurationCommon</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># subcarrierSpacing</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 0=kHz15, 1=kHz30, 2=kHz60, 3=kHz120</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      referenceSubcarrierSpacing                                    = 1;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # pattern1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # dl_UL_TransmissionPeriodicity</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 0=ms0p5, 1=ms0p625, 2=ms1, 3=ms1p25, 4=ms2, 5=ms2p5, 6=ms5, 7=ms10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      dl_UL_TransmissionPeriodicity                                 = 6;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      nrofDownlinkSlots                                             = 7;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      nrofDownlinkSymbols                                           = 6;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      nrofUplinkSlots                                               = 2;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      nrofUplinkSymbols                                             = 4;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ssPBCH_BlockPower                                             = -25;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  );</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # ------- SCTP definitions</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    SCTP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # Number of streams to use in input/output</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        SCTP_INSTREAMS  = 2;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        SCTP_OUTSTREAMS = 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    ////////// AMF parameters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    amf_ip_address = (</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ipv4 = &quot;192.168.70.132&quot;;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    NETWORK_INTERFACES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        GNB_IPV4_ADDRESS_FOR_NG_AMF              = &quot;192.168.70.129/24&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        GNB_IPV4_ADDRESS_FOR_NGU                 = &quot;192.168.70.129/24&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        GNB_PORT_FOR_S1U                         = 2152;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # Spec 2152</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MACRLCs = (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  num_cc                      = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tr_s_preference             = &quot;local_L1&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tr_n_preference             = &quot;local_RRC&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  pusch_TargetSNRx10          = 150;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  pucch_TargetSNRx10          = 200;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">L1s = (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  num_cc = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tr_n_preference       = &quot;local_mac&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  prach_dtx_threshold   = 120;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  pucch0_dtx_threshold  = 100;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ofdm_offset_divisor   = 8;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #set this to UINT_MAX for offset 0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">RUs = (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  local_rf       = &quot;yes&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nb_tx          = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nb_rx          = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  att_tx         = 12;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  att_rx         = 12;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bands          =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">78</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  max_pdschReferenceSignalPower = -27;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  max_rxgain                    = 114;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  eNB_instances  =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  clock_src = &quot;internal&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tx_gain = 30;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rx_gain = 110;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">rfsimulator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  serveraddr = &quot;server&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  serverport = 4043;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  options = ();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #(&quot;saviq&quot;); or/and &quot;chanmod&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  modelname = &quot;AWGN&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  IQfile = &quot;/tmp/rfsimulator.iqs&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">security = {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # preferred ciphering algorithms</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # the first one of the list that an UE supports in chosen</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # valid values: nea0, nea1, nea2, nea3</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ciphering_algorithms = ( &quot;nea0&quot; );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # preferred integrity algorithms</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # the first one of the list that an UE supports in chosen</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # valid values: nia0, nia1, nia2, nia3</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  integrity_algorithms = ( &quot;nia2&quot;, &quot;nia0&quot; );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # setting &#39;drb_ciphering&#39; to &quot;no&quot; disables ciphering for DRBs, no matter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # what &#39;ciphering_algorithms&#39; configures; same thing for &#39;drb_integrity&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  drb_ciphering = &quot;yes&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  drb_integrity = &quot;no&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">log_config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  global_log_level                      =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  hw_log_level                          =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  phy_log_level                         =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  mac_log_level                         =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rlc_log_level                         =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  pdcp_log_level                        =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rrc_log_level                         =&quot;info&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ngap_log_level                        =&quot;debug&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  f1ap_log_level                        =&quot;debug&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">e2_agent = {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  near_ric_ip_addr = &quot;127.0.0.1&quot;;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #sm_dir = &quot;/path/where/the/SMs/are/located/&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  sm_dir = &quot;/usr/local/lib/flexric/&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span></code></pre></div></details><p>Run the gNodeB on a new terminal instance</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/expgnb/openairinterface/cmake_targets/ran_build/build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nr-softmodem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -E</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sa</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/expgnb/conf-files/conf/usrp/gnb-du.sa.band78.106prb.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --continuous</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --tx</span></span></code></pre></div><h3 id="run-the-ue" tabindex="-1">Run the UE <a class="header-anchor" href="#run-the-ue" aria-label="Permalink to &quot;Run the UE&quot;">​</a></h3><details class="details custom-block"><summary>~/expgnb/conf-files/conf/usrp/ue-usrp.conf (UE config file)</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sa=1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rfsim=0;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">uicc0 = {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  imsi = &quot;001010000000001&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  key = &quot;fec86ba6eb707ed08905757b1bb44b8f&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  opc = &quot;C42449363BBAD02B66D16BC975D77CC1&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  dnn = &quot;oai&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nssai_sst = 1;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">telnetsrv = {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  listenport = 9091;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  histfile = &quot;~/history.telnetsrv&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PRSs =</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Active_gNBs = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    prs_config0 = (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      gNB_id = 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      NumPRSResources       = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      PRSResourceSetPeriod  =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      SymbolStart           =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      NumPRSSymbols         =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      NumRB                 = 106;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      RBOffset              = 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      CombSize              = 4;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      REOffset              =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      PRSResourceOffset     =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      PRSResourceRepetition = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      PRSResourceTimeGap    = 1;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      NPRS_ID               =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      MutingPattern1        =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      MutingPattern2        =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      MutingBitRepetition   = 1;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">UE_rf_config = {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rf_device         = &quot;usrp&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  usrp_args         = &quot;type=b210,master_clock_rate=3619200000&quot;; // Update with your USRP device args</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  enable_rx         = true;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  enable_tx         = true;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  maxHARQ_Tx        = 10;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rx_gain           = 10;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tx_gain           = 10;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  center_frequency  = 3.5e9;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  sample_rate       = 3619200000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  numerology = 2;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">rfsimulator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    serveraddr = &quot;192.168.1.1&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    serverport = &quot;4043&quot;;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    options = ();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #(&quot;saviq&quot;); or/and &quot;chanmod&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    modelname = &quot;AWGN&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">;</span></span></code></pre></div></details><p>Run the UE on the PC dedicated for UE</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/expgnb/openairinterface5g/cmake_targets/ran_build/build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nr-uesoftmodem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -E</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --numerology</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 106</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --band</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 78</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -C</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3619200000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ssb</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 516</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/expgnb/conf-filesconf/usrp/ue-usrp.conf</span></span></code></pre></div><h2 id="testing-the-connection" tabindex="-1">Testing the connection <a class="header-anchor" href="#testing-the-connection" aria-label="Permalink to &quot;Testing the connection&quot;">​</a></h2><p>If the USRPs are kept at a close enough range without much outside interference, you should see data being transfered between the gNodeB and the UE as logs on the terminal</p><p>We can now verify if the connection by checking whether the UE has received an IP address via the DCHP server within the core network. This can be checked by running</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span></span></code></pre></div><p>The output should contain the following device if the connection has been successful</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> oaitun_ue1:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">POINTOPOINT,NOARP,UP,LOWER_U</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">P</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mtu</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1500</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qdisc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pfifo_fast</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> state</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> UP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> group</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> qlen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 500</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    link/[??]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    inet</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10.0.0.2/24</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scope</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> global</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> oaitun_ue1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       valid_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> forever</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> preferred_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> forever</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span></code></pre></div><h2 id="add-default-routes" tabindex="-1">Add default routes <a class="header-anchor" href="#add-default-routes" aria-label="Permalink to &quot;Add default routes&quot;">​</a></h2><p>Till now, we have only tested the connection via the command line interface.</p><p>Unfortunately, as such a network isn&#39;t automatically supported by the <code>linux</code> operating system, which only defaults to either <code>ethernet</code> or <code>WiFi</code>, we have to manually add routes default routes to force the device to route the packets via this interface</p><p>To do that, run this command</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> route</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> via</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10.0.0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> oaitun_ue1</span></span></code></pre></div><p>Now you will be able to use this connection as if it was directly connected to a WiFi / ethernet network</p><div class="info custom-block"><p class="custom-block-title">NOTE</p><p>To ensure the UE can access the external network via the gNodeB, ensure that the PC containing the gNodeB is connected to the outside network. For the demo, we will basically be using the core network similar to how we use a <strong>WiFi hotspot</strong></p></div><p>To test it out, open the browser and try to access any web page as usual.</p><div class="danger custom-block"><p class="custom-block-title">IN PROGRESS</p><ul><li>There still exists bugs in the configuration that leads to the gNodeB crashing after a certain amount of data has been transfered between the gNodeB and the UE</li><li>The reason of the bug is under exploration, and will be fixed in the later iterations</li><li>Any suggestions / contributions are welcome!</li></ul></div>`,44)]))}const F=i(e,[["render",p]]);export{o as __pageData,F as default};
