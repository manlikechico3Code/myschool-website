import React from 'react'

const socialLinks = [
  { name: 'WhatsApp', href: '#', icon: (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current' aria-hidden='true'>
      <path d='M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.42 0 .03 5.39.03 12.03c0 2.12.55 4.2 1.6 6.03L0 24l6.1-1.6a11.95 11.95 0 0 0 5.96 1.82h.01c6.63 0 12.02-5.39 12.02-12.03 0-3.22-1.25-6.25-3.48-8.71Zm-8.46 18.46h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.62.95 1-3.53-.24-.37A9.93 9.93 0 0 1 2.06 12c0-5.5 4.47-9.97 9.98-9.97 2.66 0 5.16 1.04 7.05 2.93a9.92 9.92 0 0 1 2.92 7.05c0 5.5-4.47 9.97-9.98 9.97Zm5.48-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.63-.92-2.23-.24-.58-.48-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.08-.8.37-.27.28-1.04 1.02-1.04 2.49 0 1.47 1.06 2.88 1.2 3.07.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.62.7.22 1.35.19 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.6-.34Z' />
    </svg>
  ) },
  { name: 'Facebook', href: '#', icon: (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current' aria-hidden='true'>
      <path d='M13.5 22v-8h2.7l.4-3.2h-3.1V7.2c0-.93.26-1.56 1.6-1.56H17V2.72c-.28-.04-1.24-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.02v2.15H8v3.2h2.75v8h2.75Z' />
    </svg>
  ) },
  { name: 'Instagram', href: '#', icon: (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current' aria-hidden='true'>
      <path d='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.25-3.3a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z' />
    </svg>
  ) },
  { name: 'Twitter', href: '#', icon: (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current' aria-hidden='true'>
      <path d='M18.9 2h3.6l-7.87 9.02L23.5 22h-7.1l-5.56-7.43L4.5 22H.9l8.43-9.65L.5 2h7.26l5.02 6.75L18.9 2Zm-1.26 18.17h1.97L7.14 3.72H5.08l12.56 16.45Z' />
    </svg>
  ) },
]

const footer = () => {
  return (
    <footer id='contact' className='bg-blue-950 px-6 py-12 text-white'>
      <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-2'>
        <div>
          <h3 className='text-2xl font-black uppercase tracking-wide text-white'>Community Secondary School</h3>
          <p className='mt-4 max-w-lg text-base leading-8 text-blue-100'>
            We are here to assist you! Reach out to us with any inquiries, feedback, or support you may need. Let&apos;s work together to build a brighter future!
          </p>

          <div className='mt-8 flex items-center gap-3'>
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className='flex h-11 w-11 items-center justify-center rounded-full border border-blue-300 bg-white/5 text-blue-100 transition hover:bg-white hover:text-blue-900'
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-center'>
          <p className='text-2xl font-black uppercase tracking-wide text-white'>Contact</p>

          <div className='mt-5 space-y-4 text-base leading-7 text-blue-100'>
            <p>
              <span className='font-bold text-white'>Email:</span>{' '}
              <a href='mailto:cssukpo.edu@gmail.com' className='underline hover:text-white'>cssukpo.edu@gmail.com</a>
            </p>

            <p>
              <span className='font-bold text-white'>Phone:</span>{' '}
              08141894117
            </p>

            <p>
              <span className='font-bold text-white'>Address:</span>{' '}
                Obinagu Akpu village ,Ukpo Anambra State, Nigeria
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default footer
