import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt('10');

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error(error);
    throw new Error('Error hashing password');
  }
};
