export const checkEmail = (email: string) => {
  let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
  if (!email.includes("@") || !email.includes(".") || !regex.test(email))
    return false;
  return true;
};
