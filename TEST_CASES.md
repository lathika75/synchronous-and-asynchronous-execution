# TEST CASES

| Test ID | Input / Action | Expected result |
|---|---|---|
| TC01 | Open `index.html` | Simulator dashboard loads |
| TC02 | Select 3 processes and run synchronous | Three processes complete in sequence |
| TC03 | Select 5 processes and run asynchronous | Five process tasks run independently |
| TC04 | Set communication delay to 1000 ms | Event delivery is delayed according to the setting |
| TC05 | Set processing time to 300 ms | Each process uses the configured processing duration |
| TC06 | Run both models with identical settings | Both completion times and a comparison chart appear |
| TC07 | Press Reset | Timelines, values and chart are cleared |
| TC08 | Enter a delay below 100 ms | Simulator clamps the value to 100 ms |

## Sample observation
For 4 processes with processing time = 500 ms, communication delay = 800 ms and response time = 400 ms:

- Synchronous expected time is approximately `4 × (500 + 800 + 400) = 6800 ms`.
- Asynchronous expected time is approximately `500 + 800 + 400 = 1700 ms`, because the independent process tasks overlap.

Actual browser measurements can vary slightly due to timer scheduling.
