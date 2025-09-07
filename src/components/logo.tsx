import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, hideText = false }: { className?: string, hideText?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-lg font-bold font-headline',
        className
      )}
    >
      <Image
        src="/assets/Cutted_Nested.png"
        alt="Nested Logo"
        width={24}
        height={24}
        className="w-6 h-6"
      />
      {!hideText && <span>Nested</span>}
    </div>
  );
}
