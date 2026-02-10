import { rateLimit } from 'express-rate-limit'

const baseConfig = {
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56,
	handler: (_req, res, _next, options) => {
		const retryAfterSeconds = Math.ceil(options.windowMs / 1000)
		res.set('Retry-After', retryAfterSeconds.toString())
		res.status(options.statusCode).json(options.message)
	},
	keyGenerator: (req) => req.ip ?? req.socket?.remoteAddress ?? 'unknown',
}

export const authLimiter = rateLimit({
	...baseConfig,
	windowMs: 60 * 1000,
	limit: 10,
	message: { status: 429, error: 'Too many auth attempts. Try again in a minute.' },
})

export const createUrlLimiter = rateLimit({
	...baseConfig,
	windowMs: 60 * 60 * 1000,
	limit: 100,
	keyGenerator: (req) => req.verifiedJWTUserId?._id?.toString() ?? req.ip ?? 'unknown',
	message: { status: 429, error: 'URL creation limit reached. Try again later.' },
})

export const redirectLimiter = rateLimit({
	...baseConfig,
	windowMs: 60 * 1000,
	limit: 1000,
	message: { status: 429, error: 'Too many redirect requests. Please retry shortly.' },
})

export const analyticsLimiter = rateLimit({
	...baseConfig,
	windowMs: 60 * 1000,
	limit: 120,
	keyGenerator: (req) => req.verifiedJWTUserId?._id?.toString() ?? req.ip ?? 'unknown',
	message: { status: 429, error: 'Too many analytics requests. Please retry shortly.' },
})


  