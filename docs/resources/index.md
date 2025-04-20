# 📚 Resources

To help you better understand, replicate, or extend this setup, here are curated official resources, guides, and tools.

---

## 🔧 OpenAirInterface (OAI) Resources

- **Official OpenAirInterface 5G GitLab Repository**  
  📎 [https://gitlab.eurecom.fr/oai/openairinterface5g](https://gitlab.eurecom.fr/oai/openairinterface5g)

- **OAI 5G Documentation Wiki**  
  📎 [https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/home](https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/home)

- **Installation & Configuration Guides**  
  📎 [https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5G-NR-User-Equipment-(UE)](https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5G-NR-User-Equipment-(UE))

---

## 📡 USRP and RF Setup

- **NI USRP 2901 Product Page (B210 variant)**  
  📎 [https://www.ni.com/en-us/support/model.usrp-2901.html](https://www.ni.com/en-us/support/model.usrp-2901.html)

- **UHD (USRP Hardware Driver) Installation**  
  📎 [https://files.ettus.com/manual/page_install.html](https://files.ettus.com/manual/page_install.html)

- **RF Setup Guide for OAI**  
  📎 [https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5g-nr-how-to-connect-with-usrp](https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5g-nr-how-to-connect-with-usrp)

---

## 🧠 Concepts & Background Reading

- **5G Core Network Explained – Free 5GC Book (by 5G-ACIA)**  
  📎 [https://www.5g-acia.org/publications/5g-core-networks/](https://www.5g-acia.org/publications/5g-core-networks/)

- **gNodeB and NR Architecture Overview**  
  📎 [https://www.3gpp.org/technologies/5g-nr](https://www.3gpp.org/technologies/5g-nr)

- **Packet Flow in OAI 5G (UE ↔ gNB ↔ Core)**  
  📎 [https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5g-nr-architecture](https://gitlab.eurecom.fr/oai/openairinterface5g/-/wikis/5g-nr-architecture)

---

## 🧪 Useful Testing Tools

- `ip a`, `ifconfig`, `ping`, `iperf3` – Check interface/IP and network throughput  
- `wireshark` – Analyze GTP-U and SCTP traffic  
- `netstat` or `ss` – Inspect socket state and port usage  
- `docker logs <container>` – Debug OAI Core VNFs

---

## 📎 Additional Sample Repos & Demos

- **OAI 5G IEEE ANTS Tutorial Repo (great for students)**  
  📎 [https://github.com/rajeevGa/ieee_ants2024_oai_tutorial](https://github.com/rajeevGa/ieee_ants2024_oai_tutorial)

- **OAI Docker Compose Deployments**  
  📎 [https://gitlab.eurecom.fr/oai/oai-cn5g-fed](https://gitlab.eurecom.fr/oai/oai-cn5g-fed)
