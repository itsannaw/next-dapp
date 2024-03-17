const CURRENCY_FRACTION = 2;
const FORMAT_BALANCE_COEF = 1000000000000000000;

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / FORMAT_BALANCE_COEF).toFixed(CURRENCY_FRACTION);
  return balance;
};