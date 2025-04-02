'use server';

import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    const existingUser = await db.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    const hashedPassword = await hash(password, 10);
    
    const user = await db.user.create({
      // @ts-ignore
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });
    
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { message: 'Registration successful', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
