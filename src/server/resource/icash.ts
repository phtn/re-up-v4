import { z } from "zod";

export const IcashCheckoutResource = z.object({
  merchantUsername: z.string(),
  merchantPassword: z.string(),
  merchantCode: z.string(),
  merchantRefNo: z.string(),
  merchantProductDescription: z.string(),
  currencyCode: z.string(),
  amount: z.string(),
  successUrl: z.string(),
  errorUrl: z.string(),
});

export type IcashCheckoutSchema = z.infer<typeof IcashCheckoutResource>;
export const icashCheckoutUrl = `/api/Merchant/checkout-url`;

export const IcashCheckoutDataResponse = z.object({
  merchantRefNo: z.string(),
  statusCode: z.string(),
  statusMessage: z.string(),
  timestamp: z.string(),
  redirectUrl: z.string(),
});

export type IcashCheckoutDataResponseSchema = z.infer<
  typeof IcashCheckoutDataResponse
>;

export const IcashCheckoutResponse = z.array(IcashCheckoutDataResponse);

export type IcashCheckoutResponseSchema = z.infer<typeof IcashCheckoutResponse>;

export const IcashPayoutResource = z.object({
  accountName: z.string(),
  accountNo: z.string(),
  backCode: z.string(),
  amount: z.string(),
  merchantRefNo: z.string(),
});

export type IcashPayoutSchema = z.infer<typeof IcashPayoutResource>;
export const icashPayoutUrl = "/api/payout/create";

export const IcashPayoutResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  transactionStatus: z.string(),
  merchantRefNo: z.string(),
  transactionRefNo: z.string(),
});

export type IcashPayoutResponseSchema = z.infer<typeof IcashPayoutResponse>;

export const IcashAuthResource = z.object({
  merchantCode: z.string(),
  merchantUsername: z.string(),
  merchantPassword: z.string(),
});

export type IcashAuthSchema = z.infer<typeof IcashAuthResource>;
export const icashAuthUrl = "/api/auth/login";

export const IcashAuthResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  accessToken: z.string(),
  accessTokenExpiresIn: z.string(),
  tokenType: z.string(),
});

export type IcashAuthResponseSchema = z.infer<typeof IcashAuthResponse>;

export const IcashAuthFailed = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
});

export type IcashAuthFailedSchema = z.infer<typeof IcashAuthFailed>;

export const IcashBankLookupResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  data: z.array(
    z.object({
      bankCode: z.string(),
      bankDesc: z.string(),
      accountFormat: z.string(),
      status: z.string(),
    }),
  ),
});

export type IcashBankLookupResponseSchema = z.infer<
  typeof IcashBankLookupResponse
>;
export const icashBankLookupUrl = "/api/lookup/banks";

export const icashWebhookMsg = {
  merchantReferenceNo: "TESTREF000002",
  transactionReferenceNo: "MP1234567890",
  amount: "10.00",
  transactionStatus: "CREDITED",
  transactionDate: "2023-11-13 17:12:25.957",
};

export const IcashCreateVAResource = z.object({
  merchantUsername: z.string(),
  merchantPassword: z.string(),
  merchantCode: z.string(),
  merchantCustomerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type IcashCreateVASchema = z.infer<typeof IcashCreateVAResource>;

export const IcashCreateVAResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  virtualAccountNo: z.string(),
});

export type IcashCreateVAResponseSchema = z.infer<typeof IcashCreateVAResponse>;

export const icashCreateVAConfig = {
  url: "/api/merchant/create-virtual-account",
  method: "POST",
};

export const IcashGenQRResource = z.object({
  merchantUsername: z.string(),
  merchantPassword: z.string(),
  merchantCode: z.string(),
  merchantCustomerId: z.string(),
  merchantTransactionId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  amount: z.number().multipleOf(0.01),
});

export type IcashGenQRSchema = z.infer<typeof IcashGenQRResource>;

export const IcashGenQRResponse = z.object({
  accountName: z.string(),
  accountNo: z.string(),
  bankName: z.string(),
  base64Image: z.unknown(),
  expiredAt: z.string(),
  merchantTransactionId: z.string(),
  rawImageData: z.string(),
  statusCode: z.string(),
  statusMessage: z.string(),
});

export type IcashGenQRResponseSchema = z.infer<typeof IcashGenQRResponse>;

export const icashGenQRConfig = {
  url: "/api/merchant/generate-trans-qr",
  method: "POST",
};

export const IcashGenQRCodeVAResource = z.object({
  virtualAccountNumber: z.string(),
  amount: z.string(),
});

export type IcashGenQRCodeVASchema = z.infer<typeof IcashGenQRCodeVAResource>;

export const IcashGenQRCodeVAResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  data: z.object({
    bash64Image: z.string(),
  }),
});

export type IcashGenQRCodeVAResponseSchema = z.infer<
  typeof IcashGenQRCodeVAResponse
>;

export const icashGenQRCodeVAUrl = "/api/merchant/generate-qrcode";

export const IcashGetVAResource = z.string();

export type IcashGetVASchema = z.infer<typeof IcashGetVAResource>;

export const IcashGetVAResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  virtualAccountNo: z.string(),
  merchantCustomerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createAt: z.string(),
});

export type IcashGetVAResponseSchema = z.infer<typeof IcashGetVAResponse>;

export const icashGetVAConfig = {
  url: "/api/inquire/virtual-account?merchantCustomerId=",
  method: "GET",
};

export const sampleCreateVAResource: IcashCreateVASchema = {
  merchantCode: "FASTINSURE",
  merchantUsername: "fastinsure",
  merchantPassword: `XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY`,
  // merchantCode: `${process.env.ICASH_CODE}`,
  // merchantUsername: `${process.env.ICASH_USER}`,
  // merchantPassword: `${process.env.ICASH_PASS}`,
  merchantCustomerId: "PH0123456789",
  firstName: "re-up.ph",
  lastName: "Wed Services",
};
export const sampleGenQRResource: IcashGenQRSchema = {
  merchantCode: `${process.env.ICASH_CODE}`,
  merchantUsername: `${process.env.ICASH_USER}`,
  merchantPassword: `${process.env.ICASH_PASS}`,
  merchantCustomerId: "",
  merchantTransactionId: "TXN02000000321",
  firstName: "Jun",
  lastName: "Jun",
  amount: parseFloat((100.25).toFixed(2)),
};

export const sampleICashCheckoutResource: IcashCheckoutSchema = {
  merchantCode: "FASTINSURE",
  merchantUsername: "fastinsure",
  merchantPassword: `XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY`,
  merchantRefNo: "0123456789KILO",
  merchantProductDescription: "desc",
  currencyCode: "PHP",
  amount: "100",
  successUrl: "https://re-up.ph",
  errorUrl: "https://re-up.ph",
};
