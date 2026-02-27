### Part 1: Process Scheduling

#### 1.1 FCFS (First-Come, First-Served)

Processes (arrival, burst):  
- P1: (0, 5)  
- P2: (1, 3)  
- P3: (2, 1)

Execution order: P1 → P2 → P3

**Gantt chart (FCFS):**

`0      5      8    9`  
`| P1   | P2   | P3 |`

**Waiting times:**

- P1: starts at 0 → WT₁ = 0 − 0 = **0**
- P2: starts at 5 → WT₂ = 5 − 1 = **4**
- P3: starts at 8 → WT₃ = 8 − 2 = **6**

Average waiting time (FCFS):  
\((0 + 4 + 6) / 3 = 10/3 ≈ \mathbf{3.33}\)

---

#### 1.2 Round Robin (q = 2)

Time-slice = 2, arrivals respected.

Timeline:

- 0–2: P1 (remaining 3) → queue at 2: [P2, P3, P1]
- 2–4: P2 (remaining 1) → queue: [P3, P1, P2]
- 4–5: P3 (finishes)    → queue: [P1, P2]
- 5–7: P1 (remaining 1) → queue: [P2, P1]
- 7–8: P2 (finishes)    → queue: [P1]
- 8–9: P1 (finishes)

**Gantt chart (RR):**

`0  2  4  5  7  8  9`  
`|P1|P2|P3|P1|P2|P1|`

**Completion times:**

- P1 finishes at 9 → TAT₁ = 9 − 0 = 9 → WT₁ = 9 − 5 = **4**
- P2 finishes at 8 → TAT₂ = 8 − 1 = 7 → WT₂ = 7 − 3 = **4**
- P3 finishes at 5 → TAT₃ = 5 − 2 = 3 → WT₃ = 3 − 1 = **2**

Average waiting time (RR):  
\((4 + 4 + 2) / 3 = 10/3 ≈ \mathbf{3.33}\)

**Responsiveness:**  
Even though the *average* waiting time is the same here, **Round Robin is more responsive**: every process gets CPU time quickly after arrival (e.g., P3 starts at t=4 in RR vs. t=8 in FCFS). This leads to better perceived interactivity.

---

### Part 2: Process Synchronization

Two processes P1 and P2 each do `counter++` 100 times on a shared variable.

#### 2.1 What can go wrong without synchronization?

- `counter++` is not atomic; it typically does:
  1. load `counter`
  2. increment
  3. store back
- Without mutual exclusion:
  - P1 and P2 can interleave their load/increment/store steps.
  - Lost updates occur (both read the same old value, both write back different increments).
  - Final result can be **less than 200**, even though 200 increments were requested.

#### 2.2 Synchronization mechanism

Use a **mutex (binary semaphore / lock)** to ensure **mutual exclusion** around `counter++`.

#### 2.3 Pseudocode with mutual exclusion

```pseudo
shared int counter = 0
mutex m = UNLOCKED

Process P1:
  for i = 1 to 100:
    lock(m)
    counter = counter + 1
    unlock(m)

Process P2:
  for i = 1 to 100:
    lock(m)
    counter = counter + 1
    unlock(m)
```

Here `lock(m)` blocks if another process holds the mutex, ensuring only one process updates `counter` at a time.

---

### Part 3: Memory Management (Page Replacement)

Frames = 3  
Reference string: **1, 2, 3, 2, 4, 1, 5**

#### 3.1 FIFO

Frames shown as `[f1 f2 f3]`:

1. 1 → miss → `[1 - -]` (faults = 1)  
2. 2 → miss → `[1 2 -]` (2)  
3. 3 → miss → `[1 2 3]` (3)  
4. 2 → hit → `[1 2 3]` (3)  
5. 4 → miss, evict 1 → `[4 2 3]` (4)  
6. 1 → miss, evict 2 → `[4 1 3]` (5)  
7. 5 → miss, evict 3 → `[4 1 5]` (6)

**Total FIFO faults: \(\mathbf{6}\)**

---

#### 3.2 LRU

Track least recently used:

1. 1 → miss → `[1 - -]` (1)  
2. 2 → miss → `[1 2 -]` (2)  
3. 3 → miss → `[1 2 3]` (3)  
4. 2 → hit → `[1 2 3]` (3)  
5. 4 → miss, evict LRU (1) → `[4 2 3]` (4)  
6. 1 → miss, LRU among [4,2,3] = 3 → `[4 2 1]` (5)  
7. 5 → miss, LRU among [4,2,1] = 2 → `[4 5 1]` (6)

**Total LRU faults: \(\mathbf{6}\)**

**Comparison:**  
In this short sequence, **FIFO and LRU perform equally (6 faults)**. Generally, LRU often does better because it uses recency info, but here the pattern causes the same evictions.

---

### Part 4: Disk Scheduling

Initial head position: **53**  
Requests: **98, 183, 37, 122, 14, 124, 65, 67**

#### 4.1 FCFS

Order: 53 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67

Movements (absolute differences):

- |53 − 98|  = 45
- |98 − 183| = 85   (total 130)
- |183 − 37| = 146  (276)
- |37 − 122| = 85   (361)
- |122 − 14| = 108  (469)
- |14 − 124| = 110  (579)
- |124 − 65| = 59   (638)
- |65 − 67|  = 2    (640)

**Total FCFS head movement: \(\mathbf{640}\) tracks**

---

#### 4.2 SSTF (Shortest Seek Time First)

Always go to the closest pending request.

Start at 53, pending: {98, 183, 37, 122, 14, 124, 65, 67}

- From 53: closest is 65 (distance 12) → 53 → 65  
- From 65: closest is 67 (2)          → 65 → 67  
- From 67: closest is 37 (30)         → 67 → 37  
- From 37: closest is 14 (23)         → 37 → 14  
- From 14: closest is 98 (84)         → 14 → 98  
- From 98: closest is 122 (24)        → 98 → 122  
- From 122: closest is 124 (2)        → 122 → 124  
- From 124: last is 183 (59)          → 124 → 183  

Movements:

- 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = **236**

**Total SSTF head movement: \(\mathbf{236}\) tracks**

**Conclusion:**  
SSTF is **more efficient** here (236 vs. 640) because it always services the nearest pending request, minimizing seek distance.

