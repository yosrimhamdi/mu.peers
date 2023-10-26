import bcrypt from 'bcrypt';

export const hash = async (data: string) => {
  return await bcrypt.hash(data, Number(process.env.BCRYPT_SALT));
};
