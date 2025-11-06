import z from "zod";
import { TRPCError } from "@trpc/server";
import { type PrismaClient } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Get or create database user from Clerk user ID
 */
async function getOrCreateDbUser(clerkUserId: string, db: PrismaClient) {
	const client = await clerkClient();
	const clerkUser = await client.users.getUser(clerkUserId);

	const emailAddress = clerkUser.emailAddresses[0]?.emailAddress;
	if (!emailAddress) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "User email not found",
		});
	}

	return db.user.upsert({
		where: { emailAddress },
		create: {
			emailAddress,
			firstName: clerkUser.firstName,
			lastName: clerkUser.lastName,
			imageUrl: clerkUser.imageUrl,
		},
		update: {
			firstName: clerkUser.firstName,
			lastName: clerkUser.lastName,
			imageUrl: clerkUser.imageUrl,
		},
	});
}

/**
 * Get database user from Clerk user ID (returns null if not found)
 */
async function getDbUser(clerkUserId: string, db: PrismaClient) {
	const client = await clerkClient();
	const clerkUser = await client.users.getUser(clerkUserId);

	const emailAddress = clerkUser.emailAddresses[0]?.emailAddress;
	if (!emailAddress) {
		return null;
	}

	return db.user.findUnique({
		where: { emailAddress },
	});
}

export const projectRouter = createTRPCRouter({
	createProject: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				githubUrl: z.string(),
				githubToken: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const dbUser = await getOrCreateDbUser(ctx.user.userId!, ctx.db);

			const project = await ctx.db.project.create({
				data: {
					name: input.name,
					repoUrl: input.githubUrl,
					userToProject: {
						create: {
							userId: dbUser.id,
						},
					},
				},
			});

			return project;
		}),

	getProjects: protectedProcedure.query(async ({ ctx }) => {
		const dbUser = await getDbUser(ctx.user.userId!, ctx.db);

		if (!dbUser) {
			return [];
		}

		return ctx.db.project.findMany({
			where: {
				userToProject: {
					some: {
						userId: dbUser.id,
					},
				},
				deletedAt: null,
			},
		});
	}),
});