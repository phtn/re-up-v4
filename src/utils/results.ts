export const Err = (err: Error) => {
  return [0, err];
};

export const Ok = () => {
  return [1, "success"];
};
