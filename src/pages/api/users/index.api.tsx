import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '../../../lib/prisma'

// no next, as rotas não são identificadas automaticamente, por isso verificamos se é POST primeiro
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      name,
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({ message: 'User already taken.' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@ignitecall:user-id', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/', // definindo a raiz "/", todas as rotas podem acessar o cookie
    // expires:
  })

  return res.status(201).json(user)
}
