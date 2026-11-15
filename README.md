# Synchronous vs Asynchronous Execution Simulator

**Course:** CS3551 – Distributed Computing  
**Assignment topic:** Compare synchronous and asynchronous execution using simulated processes, communication delays, and response mechanisms.

## 1. Project overview
This browser-based educational simulator compares two execution models using 3–5 simulated processes. The user can configure processing time, communication delay and response time, run either model, and compare total completion time.

- **Synchronous model:** each process performs its work, sends a message, waits for the configured communication delay and response time, and only then completes and allows the next process to proceed.
- **Asynchronous model:** processes perform their work and send messages without blocking the other processes. Message delivery and response handling happen independently.

The simulator uses JavaScript timers to model elapsed time. It does not create real network connections or distributed computers.

## 2. Folder structure
```text
Sync_Async_Distributed_Computing/
├── index.html
├── style.css
├── script.js
├── README.md
├── PROJECT_REPORT.md
└── TEST_CASES.md
```

## 3. Requirements
- Windows, Linux, or macOS
- A modern browser (Chrome, Edge, Firefox)
- VS Code (recommended, optional)
- Internet connection only to load the Chart.js chart library from its CDN. The simulation itself runs in the browser.

## 4. How to run in VS Code
1. Extract the ZIP file.
2. Open VS Code.
3. Select **File → Open Folder** and choose `Sync_Async_Distributed_Computing`.
4. Open `index.html`.
5. Right-click and select **Open with Live Server** if the Live Server extension is installed.
6. Alternatively, double-click `index.html` to open it directly in a browser.

## 5. How to use
1. Select the number of processes (3, 4 or 5).
2. Enter communication delay, processing time and response time in milliseconds.
3. Select **Run Synchronous** or **Run Asynchronous** to view one model.
4. Select **Run Both & Compare** to run both models with the same settings.
5. Observe the process status, event trace, completion time and comparison chart.
6. Select **Reset** to clear the previous run.

## 6. Main algorithm
### Synchronous
For each process in order:
1. Start process.
2. Simulate processing time.
3. Send request.
4. Wait for communication delay.
5. Receive/handle response.
6. Mark process completed.
7. Continue to the next process.

### Asynchronous
For each process:
1. Start processing.
2. Simulate processing time.
3. Send message and continue without blocking other processes.
4. Simulate message delivery.
5. Handle response independently.
6. Mark process completed after its response is handled.

## 7. Limitations
- Processes and messages are simulated in one browser tab.
- Delays are artificial timer values, not measured network latency.
- The simulator assumes successful message delivery; packet loss, retries and server failures are outside this basic version.
- Browser scheduling can cause small differences in measured time.
- Chart.js is loaded from a CDN, so the chart requires internet access.

## 8. Learning outcome
The project demonstrates blocking versus non-blocking communication, process concurrency, message delay, response handling, event tracing and execution-time comparison.
