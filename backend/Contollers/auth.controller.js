const crypto = require('crypto');
const prisma = require('../config/prismaclient');
const bcrypt = require('bcryptjs');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gearguard.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // 1) Try DB user
    const dbUser = await prisma.user.findUnique({ where: { email } });

    if (dbUser && dbUser.password) {
      const match = await bcrypt.compare(password, dbUser.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = crypto.randomBytes(24).toString('hex');
      const { password: _pw, ...userSafe } = dbUser;
      return res.json({ token, user: userSafe });
    }

    // 2) Fallback to ADMIN env (internal system admin)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = {
        id: 0,
        email: ADMIN_EMAIL,
        name: 'Administrator',
        role: 'admin',
      };
      const token = crypto.randomBytes(24).toString('hex');
      return res.json({ token, user });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };