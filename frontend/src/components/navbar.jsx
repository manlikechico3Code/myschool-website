import React from 'react'
import { Link } from 'react-router-dom'
import cssLogo from '../assets/csslogo.jpeg'

const navItems = ['HOME', 'ABOUT US', 'SECONDARY', 'ADMISSION', 'PORTAL', 'CONTACT']
const aboutMenu = ['ABOUT', 'CODE OF CONDUCT', 'MANAGEMENT', 'OUR VISION']
const secondaryMenu = ['ACADEMICS', 'BOARDING FACILITIES', 'MILESTONE', 'CURRICULAR', 'GALLERY']
const admissionMenu = ['SECONDARY ADMISSION', 'UNIVERSITIES ADMISSION']
const portalMenu = ['STUDENTS', 'STAFF']

const navbar = ({ Theme, setTheme, onOpenAdmission }) => {
  return (
    <nav className='flex items-center justify-start gap-6 pt-4 pl-4 pr-4'>
      <img
        src={cssLogo}
        alt="CSS Logo"
        className='h-[120px] w-[160px] object-contain border-none bg-transparent outline-none ring-0 shadow-none'
      />

      <div className='ml-8 flex flex-1 items-center justify-between gap-0.5 text-base font-extrabold uppercase tracking-wide text-blue-900'>
        {navItems.map((item) => {
          if (item === 'ABOUT US') {
            return (
              <div key={item} className='group relative z-50'>
                <button className='flex items-center gap-1 transition-colors duration-200 hover:text-blue-600'>
                  {item}
                  <span className='text-xs'>▾</span>
                </button>

                <div className='absolute left-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <div className='min-w-[220px] rounded-md bg-blue-700 shadow-lg ring-1 ring-blue-200'>
                    {aboutMenu.map((subItem) => (
                      <a
                        key={subItem}
                        href='#'
                        className='block px-4 py-2 text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          if (item === 'SECONDARY') {
            return (
              <div key={item} className='group relative z-50'>
                <button className='flex items-center gap-1 transition-colors duration-200 hover:text-blue-600'>
                  {item}
                  <span className='text-xs'>▾</span>
                </button>

                <div className='absolute left-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <div className='min-w-[220px] rounded-md bg-blue-700 shadow-lg ring-1 ring-blue-200'>
                    {secondaryMenu.map((subItem) => (
                      <a
                        key={subItem}
                        href='#'
                        className='block px-4 py-2 text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          if (item === 'ADMISSION') {
            return (
              <div key={item} className='group relative z-50'>
                <button className='flex items-center gap-1 transition-colors duration-200 hover:text-blue-600'>
                  {item}
                  <span className='text-xs'>▾</span>
                </button>

                <div className='absolute left-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <div className='min-w-[220px] rounded-md bg-blue-700 shadow-lg ring-1 ring-blue-200'>
                    {admissionMenu.map((subItem) => (
                      <button
                        key={subItem}
                        type='button'
                        onClick={onOpenAdmission}
                        className='block w-full px-4 py-2 text-left text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          if (item === 'PORTAL') {
            return (
              <div key={item} className='group relative z-50'>
                <button className='flex items-center gap-1 transition-colors duration-200 hover:text-blue-600'>
                  {item}
                  <span className='text-xs'>▾</span>
                </button>

                <div className='absolute left-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <div className='min-w-[200px] rounded-md bg-blue-700 shadow-lg ring-1 ring-blue-200'>
                    {portalMenu.map((subItem) =>
                      subItem === 'STAFF' || subItem === 'STUDENTS' ? (
                        <Link
                          key={subItem}
                          to={subItem === 'STAFF' ? '/admin/login' : '/applicant/login'}
                          className='block px-4 py-2 text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                        >
                          {subItem}
                        </Link>
                      ) : (
                        <a
                          key={subItem}
                          href='#'
                          className='block px-4 py-2 text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-blue-800 hover:text-white'
                        >
                          {subItem}
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )
          }

          if (item === 'CONTACT') {
            return (
              <a
                key={item}
                href='#contact'
                className='rounded-full border border-blue-700 bg-transparent px-4 py-2 text-blue-900 transition-all duration-200 hover:bg-blue-700 hover:text-white'
              >
                {item}
              </a>
            )
          }

          return (
            <a key={item} href='#' className='transition-colors duration-200 hover:text-blue-600'>
              {item}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default navbar
