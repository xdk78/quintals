import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { files } from './routes'

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ ignoreTrailingSlash: true })

const PORT = process.env.API_PORT || 2138
const HOST = process.env.API_HOST || '0.0.0.0'

app.register(files)

app.listen(PORT as number, HOST, err => {
  if (err) throw err
  // @ts-ignore
  console.log(`Server is listening on ${app.server.address().address}:${app.server.address().port}`)
})

export default () => app
