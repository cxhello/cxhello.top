import Image from 'next/image'

export function HeroImage({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[clamp(240px,60vh,620px)] overflow-hidden forced-colors:hidden print:hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.38] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_96%)] dark:opacity-[0.26]"
      />
    </div>
  )
}
