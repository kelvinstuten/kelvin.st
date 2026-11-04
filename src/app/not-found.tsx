import type { Metadata } from 'next'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'

export const metadata: Metadata = {
  title: 'Page not found | Kelvin Stuten',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="grid max-w-2xl gap-6">
      <div className="grid gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Error 404</p>
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl">This page got lost in the pipeline</h2>
        <p className="text-lg md:text-xl 2xl:text-2xl text-white/80">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <pre
        aria-hidden
        className="whitespace-pre-wrap break-words rounded-xl bg-black/30 p-4 font-mono text-xs leading-relaxed text-white/80 ring-1 ring-white/10 md:text-sm"
      >
        <span className="text-emerald-400">kelvin@st</span>:<span className="text-sky-400">~</span>$ kubectl get page
        {'\n'}
        <span className="text-rose-400">Error from server (NotFound)</span>: pages &quot;this-one&quot; not found
        {'\n'}
        <span className="text-emerald-400">kelvin@st</span>:<span className="text-sky-400">~</span>$ <span className="animate-pulse">▍</span>
      </pre>

      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 justify-self-center rounded-full bg-white px-5 py-2.5 font-semibold text-[#012030] transition-colors
          hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="text-sm" aria-hidden />
        Roll back to home
      </Link>
    </div>
  )
}
