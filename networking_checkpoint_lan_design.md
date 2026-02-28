# Small LAN with Internet Access — Networking Checkpoint

**Scenario:** Company floor network with 1 router, 2 switches, 4 PCs, 1 printer, 1 Wi‑Fi AP, and 2 wireless devices.

---

## Network Topology Diagram

```
                    [Internet]
                         |
                    [Router]
                    /   |   \
                   /    |    \
            [Switch 1]  |  [Switch 2]
             /  |  \    |     |
         PC1 PC2 PC3  [AP]  PC4 + Printer
                     /  \
                  W1   W2
```

---

# Part 1: MAC & Frame Handling

## 1.1 MAC Address Assignments

| Device | MAC Address (example) |
|--------|------------------------|
| Router (LAN ports) | 00:1A:2B:3C:4D:01 |
| Switch 1 | 00:1A:2B:3C:4D:10 |
| Switch 2 | 00:1A:2B:3C:4D:11 |
| PC1 | 00:1A:2B:3C:4D:21 |
| PC2 | 00:1A:2B:3C:4D:22 |
| PC3 | 00:1A:2B:3C:4D:23 |
| PC4 | 00:1A:2B:3C:4D:24 |
| Printer | 00:1A:2B:3C:4D:30 |
| Wi‑Fi AP | 00:1A:2B:3C:4D:40 |
| Wireless Device 1 (W1) | 00:1A:2B:3C:4D:51 |
| Wireless Device 2 (W2) | 00:1A:2B:3C:4D:52 |

---

## 1.2 Frame Structure (PC to Printer)

When **PC1** sends data to the **Printer**, an Ethernet frame looks like this:

```
+------------------+------------------+--------+------+------+
| Preamble (8 B)   | Dest MAC (6 B)  | Src MAC (6 B) | Type (2 B) | Payload (46–1500 B) | FCS (4 B) |
+------------------+------------------+--------+------+------+
```

**Example values for PC1 → Printer:**

| Field | Value |
|-------|-------|
| **Destination MAC** | 00:1A:2B:3C:4D:30 (Printer) |
| **Source MAC** | 00:1A:2B:3C:4D:21 (PC1) |
| **Type** | 0x0800 (IPv4) |
| **Payload** | IP packet (incl. IP header + TCP/UDP + data) |
| **FCS** | CRC-32 checksum |

The switch learns PC1’s MAC on the ingress port and forwards the frame only to the port where the Printer’s MAC was learned.

---

## 1.3 Collision Handling

### Ethernet (Wired)

- **Full-duplex (switch):** No collisions. Each port has its own collision domain; switch buffers and forwards frames.
- **Half-duplex (legacy hub):** **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection):
  1. Listen before transmit.
  2. If collision detected → send jam signal, back off (exponential backoff), retry.

### Wi‑Fi (Wireless)

- **CSMA/CA** (Collision Avoidance):
  1. Listen (DIFS) before transmit.
  2. If channel busy → wait and use random backoff.
  3. Send RTS (Request to Send); AP replies with CTS (Clear to Send).
  4. Then transmit data; ACK confirms receipt.
- No collision *detection* (can’t transmit and receive at once), so avoidance is used instead.

---

# Part 2: IP Addressing & Subnetting

## 2.1 Private Range and Subnetting

**Base range:** 192.168.10.0/24 (256 addresses)

**Subnets:**

| Subnet | Use | CIDR | Range | Hosts |
|--------|-----|------|------|------|
| Subnet A | Wired (Switch 1 + Switch 2, PCs, Printer) | 192.168.10.0/25 | 192.168.10.0 – 192.168.10.127 | 126 |
| Subnet B | Wireless (AP + W1, W2) | 192.168.10.128/25 | 192.168.10.128 – 192.168.10.255 | 126 |

---

## 2.2 IP Address Assignments

| Device | IP Address | Subnet Mask | Default Gateway |
|--------|------------|-------------|-----------------|
| Router (LAN) | 192.168.10.1 | 255.255.255.128 | — |
| Router (WAN) | (ISP-assigned, e.g. 203.0.113.5) | — | ISP gateway |
| PC1 | 192.168.10.10 | 255.255.255.128 | 192.168.10.1 |
| PC2 | 192.168.10.11 | 255.255.255.128 | 192.168.10.1 |
| PC3 | 192.168.10.12 | 255.255.255.128 | 192.168.10.1 |
| PC4 | 192.168.10.13 | 255.255.255.128 | 192.168.10.1 |
| Printer | 192.168.10.20 | 255.255.255.128 | 192.168.10.1 |
| Wi‑Fi AP | 192.168.10.129 | 255.255.255.128 | 192.168.10.1 |
| Wireless Device 1 | 192.168.10.130 | 255.255.255.128 | 192.168.10.1 |
| Wireless Device 2 | 192.168.10.131 | 255.255.255.128 | 192.168.10.1 |

*Note: If the router has a single LAN interface, both subnets can share 192.168.10.0/24 with the router at 192.168.10.1. The table above shows a split for clarity; in a simple setup, all LAN devices can use 192.168.10.0/24.*

---

## 2.3 Role of DHCP

- **DHCP server** (usually on the router) assigns IP, subnet mask, default gateway, and DNS automatically.
- **Process:**
  1. Client sends DHCP Discover (broadcast).
  2. Server replies with DHCP Offer (IP + lease).
  3. Client sends DHCP Request.
  4. Server sends DHCP Ack.
- **Benefits:** No manual configuration, fewer errors, easier changes (e.g. new subnet or gateway).

---

# Part 3: Routing & Packet Forwarding

## 3.1 Wireless Device → External Website

When **Wireless Device 1 (W1)** sends a request to an external site (e.g. `https://www.example.com`):

---

## 3.2 Packet Path (High Level)

```
W1 → AP → Router → Internet → Destination Server
     ↑         ↑
   (Wi‑Fi)   (NAT, routing)
```

---

## 3.3 Step-by-Step Flow

| Step | Location | Action |
|------|----------|--------|
| 1 | W1 | Builds IP packet: Src=192.168.10.130, Dst=93.184.216.34 (example.com). Sends frame to AP (dest MAC = AP). |
| 2 | AP | Forwards frame to router (dest MAC = router). |
| 3 | Router | Receives packet. Dst IP is external → forward to WAN. |
| 4 | Router (NAT) | Replaces Src IP 192.168.10.130 with router’s WAN IP (e.g. 203.0.113.5). Stores mapping in NAT table. |
| 5 | Router | Sends packet to ISP gateway. |
| 6 | Internet | Routers use Dst IP to route toward 93.184.216.34. |
| 7 | Server | Receives packet, sends reply to 203.0.113.5. |
| 8 | Router | NAT table maps 203.0.113.5:port → 192.168.10.130. Rewrites Dst IP to 192.168.10.130. |
| 9 | Router → AP → W1 | Forwards reply to W1. |

---

## 3.4 How the IP Header Is Used by Routers

Routers use:

- **Destination IP:** Look up in routing table to choose next hop.
- **TTL:** Decrement by 1; drop if 0 (prevents loops).
- **Header checksum:** Recalculated after TTL change.

They generally do **not** change source/destination IP (except when NAT is applied).

---

## 3.5 How the Router Chooses the Next Hop

1. Look up **destination IP** in routing table.
2. Match longest prefix (e.g. 192.168.10.0/24 before 0.0.0.0/0).
3. Use the matching route’s **next-hop** (IP or outgoing interface).
4. If no match → use default route (0.0.0.0/0) toward ISP.

**Example routing table (simplified):**

| Destination | Next Hop | Interface |
|-------------|----------|-----------|
| 192.168.10.0/24 | — | LAN |
| 0.0.0.0/0 | ISP gateway | WAN |

---

## 3.6 Role of NAT

- **Problem:** Private IPs (192.168.x.x) are not routable on the Internet.
- **NAT:** Router translates private Src IP to its public WAN IP for outbound traffic.
- **NAT table:** Maps (private IP, port) ↔ (public IP, port).
- **Result:** Many internal hosts share one public IP; replies are correctly sent back to the right host.

---

## Summary Diagram: End-to-End Path

```
[W1: 192.168.10.130]                    [Internet]
       |                                      |
       | Frame (MAC)                          |
       v                                      |
   [Wi‑Fi AP]                                 |
       |                                      |
       | Packet: Src=192.168.10.130           |
       |        Dst=93.184.216.34             |
       v                                      |
   [Router]  ---- NAT ---->  Src=203.0.113.5  |
       |                     Dst=93.184.216.34|
       |-------------------------------------->
                                              |
                                    [example.com Server]
```
