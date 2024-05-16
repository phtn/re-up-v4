export const getUnitAmount = (n: number) => {
  const bigInt = n + "00000000";
  return Number(BigInt(bigInt));
};

export const getDecimalAmount = (unitValue: string | undefined | null) => {
  if (unitValue === "null") {
    return 0;
  }
  const decimalValue = Number(BigInt(unitValue ?? "0")) / 100000000; // 100,000,000
  return decimalValue.toFixed(2);
};
