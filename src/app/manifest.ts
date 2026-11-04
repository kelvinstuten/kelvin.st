import type { MetadataRoute } from 'next'

// Web app manifest: name, colours and icons used when the site is added to a home screen
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kelvin Stuten | DevOps Tech Lead',
    short_name: 'Kelvin Stuten',
    description: 'Kelvin Stuten is a DevOps Tech Lead specializing in Azure, Kubernetes, CI/CD pipelines, AI agents and cloud-native web development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#012030',
    theme_color: '#012030',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
