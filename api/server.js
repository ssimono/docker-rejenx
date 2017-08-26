const http = require('http')

let nbRequests = 0

http.createServer((req, res) => {
  const route = `${req.method} ${req.url}`
  const rnd = parseInt(Math.random() * 100, 0)

  nbRequests++
  process.stdout.write(`${route}\n`)

  setTimeout(() => {
    res.statusCode = [200, 400, 500][rnd % 3]
    if (process.env.ENABLE_CORS) {
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
    res.end(JSON.stringify({route, nbRequests}))
  }, rnd * 10)
}).listen(4001)

console.log('Server started on port 4001')
