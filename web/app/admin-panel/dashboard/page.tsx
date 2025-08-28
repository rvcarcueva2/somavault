'use client';
import { ChartBarInteractive } from "@/app/components/ChartBarInteractive";
import { SectionCards } from "@/app/components/SectionCards";


export default function DashboardPage() {
    return (
        <div className="ml-64 p-6 font-geist">
            <h1 className="text-2xl font-bold text-black mb-2">Hello, Admin!</h1>

            <main className="mt-6">
                <div className="mb-8 text-black flex ">
                    <div className="max-w-sm w-full">
                        <SectionCards />
                    </div>
                </div>

                <div className="mb-8 text-black flex ">
                    <div className="max-w-full w-full">
                    <ChartBarInteractive />
                </div>
            </div>

            </main>
        </div>
    );
}