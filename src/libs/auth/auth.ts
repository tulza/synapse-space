import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin, openAPI } from "better-auth/plugins";
import { headers } from "next/headers";
import { db } from "@/libs/db";

import { ac, admin, staff, user } from "./permission";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	session: {
		cookieCache: {
			enabled: true, // enable in production
			maxAge: 5 * 60,
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
	},
	plugins: [
		openAPI(), // http://localhost:3000/api/auth/reference
		adminPlugin({
			ac,
			defaultRole: "user",
			roles: {
				user,
				staff,
				admin,
			},
		}),
	],
	// emailVerification: {
	// 	sendOnSignUp: true,
	// 	sendVerificationEmail: async ({ user, url }) => {
	// 		await sendEmail({
	// 			to: user.email,
	// 			subject: "Verify your email address",
	// 			url: url,
	// 		});
	// 	},
	// },
	// socialProviders: {
	// google: {
	// 	clientId: env.AUTH_GOOGLE_ID,
	// 	clientSecret: env.AUTH_GOOGLE_SECRET,
	// },
	// },
});

export const getSession = async (
	req?: Request | null,
	disableCached: boolean = false,
) => {
	const result = await auth.api.getSession(
		req || {
			headers: await headers(),
			query: { disableCookieCache: disableCached },
		},
	);

	return result as AuthSession;
};

export type AuthSession = {
	user: typeof auth.$Infer.Session.user;
	session: typeof auth.$Infer.Session.session;
};
