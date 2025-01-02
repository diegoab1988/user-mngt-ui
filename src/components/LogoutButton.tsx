"use client";

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button className="btn btn-outline" title="Submit" onClick={() => signOut()}>Sair</button>
    )
}