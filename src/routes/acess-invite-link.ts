import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/acess-invite-link'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Get invite link',
        tags: ['referrals'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await acessInviteLink({ subscriberId })

      console.log(subscriberId)

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
