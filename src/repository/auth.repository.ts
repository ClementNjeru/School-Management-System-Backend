import crypto from 'crypto';
import { serialize } from 'cookie';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client';
const { FormatData } = require('../utils');

const prisma = new PrismaClient();

class AuthRepository {
  async Login(args: any) {
    try {
      const { email, password, res } = args;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (!user.activeStatus) {
        throw new Error('User account is inactive');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );

      // Set the session cookie
      const sessionCookie = serialize('session', token, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 12 * 60 * 60, // 12 hours in seconds
        path: '/',
      });

      // Add the session cookie to the response header
      res.setHeader('Set-Cookie', sessionCookie);

      return {
        token,
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user.id,
        success: true,
      };
    } catch (err) {
      return FormatData(err);
    }
  }

  async VerifyEmail(args: any) {
    try {
      const { email } = args;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error('Invalid email');
      }

      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = Date.now() + 3600000; // 1 hour from now
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          // emailToken: token,
          // emailTokenExpiry: tokenExpiry,
        },
      });
      return {
        success: true,
        message: 'Email verified, Token generated',
        token: token,
      };
    } catch (err) {
      return FormatData(err);
    }
  }

  async ResetPassword(args: any) {
    try {
      const { token, newPassword, confirmPassword } = args;
      const user = await prisma.user.findUnique({
        where: {
          passwordResetToken: token,
        },
      });

      if (
        !user ||
        user.passwordResetExpires === null ||
        user.passwordResetExpires < new Date()
      ) {
        throw new Error('Token is invalid or expired');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      });
      return {
        success: true,
        message: 'Password reset successfully',
      };
    } catch (err) {
      return FormatData(err);
    }
  }
}

module.exports = AuthRepository;
