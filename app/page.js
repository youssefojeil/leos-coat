import { HeroSectionWithBeamsAndGrid } from '@/components/hero-section';
import Test from '@/components/test';
import UserGuide from '@/components/user-guide';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <HeroSectionWithBeamsAndGrid />
      <UserGuide />
    </div>
  );
}
