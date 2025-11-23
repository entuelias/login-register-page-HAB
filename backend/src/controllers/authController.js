// register logic
const User = require('../models/User');
const { signToken } = require('../utils/token'); 


async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // 1) basic validation
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2) check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status
    (400).json({ error: 'Email already registered' });

    
    // 4) create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password
    });

    // 5) sign token
    const token = signToken({ userId: user._id, email: user.email });
   

    // 6) response (do not send password)
    return res.status(201).json({
      user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email },
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    // handle mongoose unique error (duplicate email)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register };
