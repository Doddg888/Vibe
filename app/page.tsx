// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Centered and Clickable Floating Icons */}
      <div className="absolute top-4 right-4 flex space-x-4 items-center">
        <Link href="https://t.me/enterVibee" target="_blank" rel="noopener noreferrer" legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/telegram-icon.png" // Make sure to add telegram-icon.png to the public folder
              alt="Telegram"
              width={40}
              height={40}
              className="hover:opacity-80"
            />
          </a>
        </Link>
        <Link href="https://dexscreener.com/solana/4b6akdqcqpqaylbkmdex4k9nrszj86qdax8vapzp5ra6" target="_blank" rel="noopener noreferrer" legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/dexscreener-icon.png" // Make sure to add dexscreener-icon.png to the public folder
              alt="Dexscreener"
              width={40}
              height={40}
              className="hover:opacity-80"
            />
          </a>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Welcome to Vibe</h1>

        {/* Moving GIF */}
        <div className="bounce-container">
          <Image
            src="/vibe.gif" // Make sure to add vibe.gif to the public folder
            alt="Vibe GIF"
            width={500}
            height={500}
            className="bounce"
          />
        </div>
      </div>
    </div>
  );
}
