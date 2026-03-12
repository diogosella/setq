import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashedPassword])


return res.status(201).json({ user: newUser.rows[0] })
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (user.rows.length === 0) {
    return res.status(400).json({message: 'Email ou senha inválido'});
  }
  
  const userData = user.rows[0];
  
  const passwordMatch = await bcrypt.compare(password, userData.password);
  
  if (!passwordMatch) {
    return res.status(400).json({message: 'Senha inválida'})
  }

  return res.status(400).json({user: userData});
})

router.get('/me', async (req, res) => {
  res.json(req.user)
})

export default router;