import { z } from "zod";

export const Currency = z.union([
  z.literal("usdc"),
  z.literal("usdt"),
  z.literal("btc"),
  z.literal("eth"),
  z.literal("bnb"),
  z.literal("sol"),
  z.literal("dai"),
  z.literal("busd"),
  z.literal("matic"),
  z.literal("food"),
  z.literal("tfi"),
]);

export type CurrencySchema = z.infer<typeof Currency>;

export const Interval = z.union([
  z.literal("day"),
  z.literal("week"),
  z.literal("month"),
  z.literal("year"),
]);

export const PaymentType = z.union([
  z.literal("one_time"),
  z.literal("recurring"),
  z.literal("streaming"),
]);

export type PaymentTypeSchema = z.infer<typeof PaymentType>;

export const GetOneResource = z.object({
  id: z.string(),
});

export type GetOneSchema = z.infer<typeof GetOneResource>;
