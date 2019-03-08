import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import { getResourcesData, getUserData } from '../../utils/files'

export default async (fastify: FastifyInstance, opts) => {
  fastify.get(
    '/user-resources',
    opts,
    async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      reply.header('Content-Type', 'application/json').code(200)
      return {
        data: await getResourcesData()
      }
    }
  )
  return
}
