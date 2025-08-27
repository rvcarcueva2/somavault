'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const AdminPanelSidebar = () => {
    const pathname = usePathname();

    // 🔹 Static sample user data
    const [userInitials] = useState<string>('AU');
    const [firstName] = useState<string>('Admin');
    const [lastName] = useState<string>('User');

    const handleSignOut = () => {
        // Just a placeholder – no Supabase
        console.log('User signed out');
    };

    const navItems = [
        {
            label: 'Dashboard',
            href: '/admin-panel/dashboard',
            icon: faHome,
        },

    ];

    return (
        <aside className="fixed top-0 left-0 z-50 h-screen w-64 font-geist flex flex-col justify-between border-r bg-white border-gray-300">

            {/* Logo */}
            <div className="p-6 border-b flex justify-center border-gray-300">
                <Link href="/" className="transition-all duration-300 hover:opacity-80">
                    <Image
                        src="/public/logo.png"
                        alt="Somavault"
                        width={100}
                        height={100}
                        className="transition-all duration-300 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-4 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href || pathname.startsWith(item.href);

                    return (
                        <Link href={item.href} key={item.label} className="block">
                            <div
                                className={`flex items-center gap-3 py-2.5 px-4 transition-all cursor-pointer
                                    ${isActive
                                        ? 'bg-[#C52233] text-white font-regular rounded-md mx-4'
                                        : 'text-black hover:bg-gray-100 mx-4'
                                    }`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                                <span>{item.label}</span>
                            </div>
                        </Link>

                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t px-4 py-4 flex items-center gap-3 border-gray-300 flex-shrink-0 h-24">
                <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium">
                    {userInitials}
                </div>
                <div className="text-sm flex-1 min-w-0">
                    <p className="font-medium min-h-[16px] text-black">
                        {firstName} {lastName}
                    </p>
                    <button
                        onClick={handleSignOut}
                        className="text-gray-500 text-xs hover:underline cursor-pointer"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminPanelSidebar;
