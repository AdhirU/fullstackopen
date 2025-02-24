// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any) => {
  return isNaN(Number(argument));
};
