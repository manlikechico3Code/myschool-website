import React from 'react'
import css1 from '../assets/css1.jpeg'
import css2 from '../assets/css2.jpeg'
import css3 from '../assets/css3.jpeg'
import css4 from '../assets/css4.jpeg'
import css5 from '../assets/css5.jpeg'
import css6 from '../assets/css6.jpeg'
import cssLogo from '../assets/csslogo.jpeg'

const Font = ({ onApply }) => {
  return (
    <>
      <section className='relative mt-4 overflow-hidden bg-blue-900'>
        <div className='absolute inset-0'>
          <img src={css1} alt='School background' className='h-full w-full object-cover opacity-30' />
        </div>

        <div className='relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-20 md:grid-cols-2'>
          <div className='text-white'>
            <p className='mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-100'>Excellence in Education</p>
            <h1 className='text-4xl font-black uppercase leading-tight md:text-6xl'>Discover your future</h1>
            <p className='mt-5 max-w-xl text-base text-blue-100 md:text-lg'>
              Inspiring learners through quality teaching, strong values, and a vibrant school community.
            </p>

            <div className='mt-8 flex flex-wrap gap-4'>
              
              <button className='rounded-full border border-white/60 bg-transparent px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white/10'>
                Learn More
              </button>
            </div>
          </div>

          <div className='rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm'>
            <img src={css2} alt='Student and school life' className='h-[420px] w-full rounded-[20px] object-cover' />
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden bg-white px-6 py-16'>
        <div className='absolute inset-0 opacity-10'>
          <img src={cssLogo} alt='School logo background' className='h-full w-full object-cover' />
        </div>

        <div className='relative mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-blue-50/90 p-8 shadow-sm backdrop-blur-sm'>
          <h1 className='text-[60px] font-black uppercase leading-none text-blue-900'>Apply for Admission</h1>
          <p className='mt-4 text-lg leading-8 text-blue-900'>
            <span className='font-bold'>Admission into Community Secondary School Ukpo</span> for the 2025/2026 academic session is now in progress.
          </p>

          <div className='mt-6'>
            <button
              onClick={onApply}
              className='inline-flex items-center gap-2 rounded-lg border border-red-700 bg-red-600 px-6 py-3 text-base font-bold uppercase text-white shadow-md transition hover:bg-red-700'
            >
              Apply
              <span aria-hidden='true'>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className='bg-slate-100 px-6 py-20'>
        <div className='mx-auto max-w-6xl text-center'>
          <h2 className='text-[40px] font-bold leading-none text-blue-900'>Explore Our School: Videos & Stories</h2>
          <div className='mx-auto mt-6 h-1 w-[220px] rounded-full bg-blue-900'></div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='grid items-center gap-8 md:grid-cols-[400px_1fr]'>
            <div className='overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-blue-100'>
              <img src={css3} alt='Senator visit to the school' className='aspect-square w-full object-cover' />
            </div>

            <div className='text-left'>
              <p className='text-sm font-bold uppercase tracking-[0.25em] text-blue-700'>School Memory</p>
              <h3 className='mt-3 text-3xl font-bold text-blue-900'>A Senatorial Visit to Our Campus</h3>
              <p className='mt-4 text-lg leading-8 text-blue-900'>
                A memorable visit that inspired our students, strengthened our community, and reminded us of the value of excellence, leadership, and service.
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='grid items-center gap-8 md:grid-cols-[1fr_400px]'>
            <div className='text-left'>
              <p className='text-sm font-bold uppercase tracking-[0.25em] text-blue-700'>Celebration</p>
              <h3 className='mt-3 text-3xl font-bold text-blue-900'>Best Match Cup Champions</h3>
              <p className='mt-4 text-lg leading-8 text-blue-900'>
                On 27 May, we won the cup for the best match and the King of Ukpo Kingdom was very proud of our achievement. We visited with joy, celebration, and gratitude for the support that made this victory possible.
              </p>
            </div>

            <div className='overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-blue-100'>
              <img src={css1} alt='School victory celebration' className='aspect-square w-full object-cover' />
            </div>
          </div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='grid items-center gap-8 md:grid-cols-[400px_1fr]'>
            <div className='overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-blue-100'>
              <img src={css4} alt='Senator Uche Ekwunife opening a new school building' className='aspect-square w-full object-cover' />
            </div>

            <div className='text-left'>
              <p className='text-sm font-bold uppercase tracking-[0.25em] text-blue-700'>School Growth</p>
              <h3 className='mt-3 text-3xl font-bold text-blue-900'>A New Building for Our School</h3>
              <p className='mt-4 text-lg leading-8 text-blue-900'>
                Senator Uche Ekwunife officially opened a new building for the school, a proud moment that marked a new chapter in our journey toward better learning, stronger opportunity, and greater excellence.
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='grid items-center gap-8 md:grid-cols-[1fr_400px]'>
            <div className='text-left'>
              <p className='text-sm font-bold uppercase tracking-[0.25em] text-blue-700'>Guidance</p>
              <h3 className='mt-3 text-3xl font-bold text-blue-900'>Welcoming New Youth Corper Teachers</h3>
              <p className='mt-4 text-lg leading-8 text-blue-900'>
                The guidance and counseling teacher addressed the new youth corpers who came for teaching, providing support, encouragement, and wise guidance as they began their important role in shaping young minds.
              </p>
            </div>

            <div className='overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-blue-100'>
              <img src={css5} alt='Guidance and counseling teacher addressing new youth corpers' className='aspect-square w-full object-cover' />
            </div>
          </div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='flex justify-center md:justify-end'>
            <button className='inline-flex items-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-blue-800 sm:px-6 sm:text-base'>
              View More
              <span aria-hidden='true' className='text-lg leading-none'>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className='bg-blue-900 px-6 py-16'>
        <div className='mx-auto max-w-6xl text-center'>
          <p className='text-sm font-bold uppercase tracking-[0.35em] text-blue-100'>Our Promise</p>
          <h3 className='mt-4 text-4xl font-black uppercase leading-tight text-white sm:text-5xl md:text-7xl'>Pioneering Excellence</h3>
        </div>
      </section>

      <section className='bg-white px-6 py-12'>
        <div className='mx-auto grid max-w-6xl gap-6 md:grid-cols-2'>
          <div className='grid items-center gap-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-6 shadow-sm md:grid-cols-[1fr_220px] md:p-8'>
            <div>
              <h4 className='text-2xl font-black uppercase leading-snug text-blue-900 md:text-3xl'>Robotics &amp; AI Integration</h4>
              <p className='mt-3 text-base leading-8 text-blue-900 md:text-lg'>
                We’re introducing Robotics and AI to equip students with the skills for future leadership and innovation.
              </p>
            </div>

            <div className='overflow-hidden rounded-xl border border-blue-200 bg-white p-2 shadow-sm'>
              <img src={css6} alt='Robotics and AI learning' className='h-40 w-full rounded-lg object-cover md:h-48' />
            </div>
          </div>

          <div className='grid items-center gap-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-6 shadow-sm md:grid-cols-[1fr_220px] md:p-8'>
            <div>
              <h4 className='text-2xl font-black uppercase leading-snug text-blue-900 md:text-3xl'>Interactive Learning Environments</h4>
              <p className='mt-3 text-base leading-8 text-blue-900 md:text-lg'>
                Our modern computer lab facilitates hands-on learning through interactive tools and multimedia resources, fostering deeper engagement and comprehension.
              </p>
            </div>

            <div className='overflow-hidden rounded-xl border border-blue-200 bg-white p-2 shadow-sm'>
              <img src={css2} alt='Interactive learning environment' className='h-40 w-full rounded-lg object-cover md:h-48' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Font
