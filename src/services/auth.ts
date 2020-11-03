import '../utils/loadEnv';
import p from 'phin';
import Koa from 'koa';
import { Context } from 'koa'
// @ts-ignore — не хочу искать declaration file for module :)
import Router from '@koa/router';
// @ts-ignore — не хочу искать declaration file for module :)
import passport from 'koa-passport';
// @ts-ignore — не хочу искать declaration file for module :)
import { Strategy, ExtractJwt } from 'passport-jwt';

const app = new Koa();
const router = new Router();
const userApi = `http://localhost:${process.env.USER_SERVICE_PORT || 3001}/user/`;
// @ts-ignore
const getJSON = p.defaults({ parse: 'json' });

var users = [
	{},
	{ name: 'a' },
	{ name: 'b' },
	{ name: 'c' },
];

router.get('/auth', async (ctx: Context) => {
	ctx.body = {userApi};

	passport.use(
		new Strategy({
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt'),
			secretOrKey: 'secret'
		}, function (jwt_payload: any, done: any) {
			console.log('payload received', jwt_payload);

			var user = users[jwt_payload.id];
			console.log(user);

			done(null, user || false);
		})
	);
})

app .use(router.routes())
	.use(router.allowedMethods());

export default app;
