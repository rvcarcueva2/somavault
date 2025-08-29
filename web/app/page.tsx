import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/logo/logo-full.svg"
        alt="Centered Logo"
        width={380}
        height={240}
      />
      <div>
        <p className="mt-4 text-center text-gray-600">
          Coming Soon
        </p>
      </div>
      

      
      
    </div>
  );
}
