import '../utils/loadEnv';
import p from 'phin';
import Koa from 'koa';
import { Context } from 'koa'
// @ts-ignore — не хочу искать declaration file for module :)
import Router from '@koa/router';
const app = new Koa();
const router = new Router();
const authApi = `http://localhost:${process.env.AUTH_SERVICE_PORT || 3002}/auth/`;
// @ts-ignore
const getJSON = p.defaults({ parse: 'json' });

router.get('/user', async (ctx: Context) => {
	const res = await getJSON(authApi);
	ctx.body = `
		<h1>USER</h1>
		<ul>
			<li>${ authApi }
			<li>${ JSON.stringify(res.body) }
		</ul>
	`;
})

app .use(router.routes())
	.use(router.allowedMethods());

export default app;
