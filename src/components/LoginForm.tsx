"use client";

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
   const searchParams = useSearchParams();

   const error = searchParams.get('error');


    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
            const formData = new FormData(e.currentTarget);
            
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            signIn('credentials', {
                ...data,
                callbackUrl: '/dashboard'

            });
        
    }

    return (
        <form onSubmit={login} 
        className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
              <Image
                  className="mb-4"
                  src="/Logo.svg"
                  alt="Next.js logo"
                  width={250}
                  height={250}
                  priority
                />
                <input 
                name='email'
                type="email" 
                className="input input-primary w-full" 
                id="email" 
                placeholder="Email" 
                />
                <input 
                name='password'
                type="password" 
                className="input input-primary w-full" 
                id="password" 
                placeholder="Senha" 
                />
                <button type="submit" 
                className="btn btn-primary w-full"
                title="Submit">Login
                </button>
                {error === 'CredentialsSignin' && <div className="text-red-500">Credenciais inválidas</div>}
              </form>
    )

}