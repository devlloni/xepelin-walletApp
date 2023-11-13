"use client"
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import AccountDetails from '@/components/Dashboard/AccountDetails';

const DashboardPage = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status]);

    return (
        <>
            <div className="min-h-full">

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {session?.user ? (
                            <AccountDetails
                                name={session.user.name}
                                email={session.user.email}
                                balance={session.user.balance}
                                accountNumber={session.user.accountNumber}
                            />
                        ): <>Cargando...</>}
                    </div>
                </main>
            </div>
        </>
    )
}

export default DashboardPage;
