'use client';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <Image
        src="/images/Leo's Coat White (Shirt-Front).jpg"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Leo's Coat</span>
    </Link>
  );
};
