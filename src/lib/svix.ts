import { Svix } from "svix";

/**
 * @name svix
 * Svix instance
 * @location \@lib/svix.ts
 * @env SVIX_T1 Testing
 */
export const svix = new Svix(`${process.env.SVIX_T1}`);
