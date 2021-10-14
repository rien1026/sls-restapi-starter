import passport from 'koa-passport';
import * as passportJwt from 'passport-jwt';

const JwtStrategy = passportJwt.Strategy;
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'P@ssw0rd',
		},
		async (tokenPayload, done) => {
			done(undefined, tokenPayload);
		},
	),
);

export const configPassport = () => {};
