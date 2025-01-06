import Image from 'next/image';


export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full py-4 px-8 flex justify-center">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Image
          src="/logo.png" // Replace with your logo file path
          alt="Logoipsum"
          width={100}
          height={100}
        />
      </div>
    </nav>
  );
}
