const http = require('http')

let count = 0

http.createServer((req, res) => {
  const route = `${req.method} ${req.url}`
  const rnd = parseInt(Math.random() * 100, 0)
  const now = new Date()

  count++
  process.stdout.write(`[${now.toISOString()}] ${route}\n`)

  setTimeout(() => {
    if (process.env.ENABLE_CORS) {
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
    res.end(JSON.stringify({count}))
  }, rnd * 10)
}).listen(4001)

console.log('Dummy server started on port 4001')
