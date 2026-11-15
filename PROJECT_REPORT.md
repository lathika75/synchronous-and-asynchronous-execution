# PROJECT REPORT

## Title
**Comparison of Synchronous and Asynchronous Execution Using Simulated Processes**

## 1. Problem Definition
In distributed computing, multiple processes communicate by exchanging messages. The way a process waits for a response affects system responsiveness and completion time. This project provides a simulator to understand and compare synchronous and asynchronous execution using simulated processes and communication delays.

## 2. Objectives
- To understand synchronous and asynchronous execution.
- To simulate multiple processes.
- To introduce configurable communication and response delays.
- To observe process states and message events.
- To compare completion time under identical settings.

## 3. System Requirements
**Hardware:** Computer or laptop with a modern web browser.  
**Software:** HTML5, CSS3, JavaScript, VS Code (optional), Chrome/Edge/Firefox.

## 4. System Design
The user enters simulation settings through the web interface. JavaScript reads the settings and executes the selected simulation model. The process state panel displays progress, the event trace lists communication events, and the chart compares completion time.

### Architecture
```text
+-------------------------+
|        User             |
| Select settings / Run   |
+------------+------------+
             |
             v
+-------------------------+
|     Web Interface       |
|       index.html        |
+------------+------------+
             |
             v
+-------------------------+
|   Simulation Engine     |
|        script.js        |
+------------+------------+
             |
       +-----+-----+
       |           |
       v           v
+-------------+ +-------------+
| Synchronous | |Asynchronous |
|   Model     | |    Model    |
+------+------+ +------+------+
       |               |
       +-------+-------+
               v
+-------------------------+
| Process Status & Event  |
| Timeline                |
+------------+------------+
             |
             v
+-------------------------+
| Time Comparison Chart   |
+-------------------------+
```

## 5. Methodology
Two models use the same process count and delay settings. In the synchronous model, each process waits for its response before the next process proceeds. In the asynchronous model, process tasks are started independently and their responses are handled when available.

## 6. Execution
1. Open the project in a browser.
2. Select process count.
3. Enter processing, communication and response delays.
4. Run each execution model.
5. Observe process states and event trace.
6. Run both models and compare completion times.

## 7. Expected Output
The interface displays process status, message events, total completion time for each model, and a bar chart comparing the two models. With the same positive delay values, the asynchronous model will generally finish sooner in this simplified simulation because process activities overlap.

## 8. Result
The project demonstrates the difference between blocking synchronous execution and non-blocking asynchronous execution. The comparison shows how independent process progress can reduce overall waiting in the simulated workload.

## 9. Conclusion
The simulator provides a visual and interactive way to understand synchronous and asynchronous execution in distributed computing. It demonstrates process coordination, communication delays, response handling and performance comparison.

## 10. Future Enhancement
Real network communication using separate client/server processes, message failure simulation, retry mechanisms, and detailed latency statistics can be added in a future version.
