[Client HTTP Request]
↓
server.js → app(req, res)
↓
app.js → middleware (CORS, logger)
↓
todoRoutes.js → map URL → controller
↓
controller → parse body, handle req/res
↓
service → business logic, validate, call model
↓
model → data storage (in-memory)
↓
controller → send JSON response
↓
app.js → catch errors → errorHandler
↓
[Client Receives Response]
