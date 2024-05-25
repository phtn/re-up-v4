export const getUnitAmount = (n: number) => {
  const bigInt = n + "00000000";
  return Number(BigInt(bigInt));
};

export const getDecimalAmount = (unitValue: string | undefined | null) => {
  if (unitValue === "null") {
    return 0;
  }
  return (Number(BigInt(unitValue ?? "0")) / 100000000).toFixed(2); // 100,000,000
};
