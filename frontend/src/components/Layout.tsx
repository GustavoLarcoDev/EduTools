'use client'

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getCareers } from '@/lib/api'
import { Career } from '@/types'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Careers', href: '/careers' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [careers, setCareers] = useState<Career[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    loadCareers()
  }, [])

  const loadCareers = async () => {
    try {
      const data = await getCareers()
      setCareers(data)
    } catch (error) {
      console.error('Error loading careers:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <span className="text-2xl font-bold text-indigo-600">EduTools</span>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Dropdown para Tutoriales por Carrera */}
                    <Menu as="div" className="relative inline-flex items-center">
                      <Menu.Button
                        className={classNames(
                          pathname.startsWith('/tutorials')
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium'
                        )}
                      >
                        Tutorials
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Menu.Items className="absolute left-0 z-10 mt-14 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/tutorials"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 font-medium border-l-4 border-transparent'
                                )}
                              >
                                All Tutorials
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="border-t border-gray-100 my-1" />
                          {careers.map((career) => (
                            <Menu.Item key={career.id}>
                              {({ active }) => (
                                <Link
                                  href={`/tutorials?career=${career.id}`}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {career.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    {/* Dropdown para Herramientas por Carrera */}
                    <Menu as="div" className="relative inline-flex items-center">
                      <Menu.Button
                        className={classNames(
                          pathname.startsWith('/tools')
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium'
                        )}
                      >
                        Tools
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Menu.Items className="absolute left-0 z-10 mt-14 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/tools"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 font-medium border-l-4 border-transparent'
                                )}
                              >
                                All Tools
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="border-t border-gray-100 my-1" />
                          {careers.map((career) => (
                            <Menu.Item key={career.id}>
                              {({ active }) => (
                                <Link
                                  href={`/tools?career=${career.id}`}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {career.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {isLoggedIn ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full px-4 py-2 text-left text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Link
                        href="/auth/login"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/auth/register"
                        className="bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                <Disclosure.Button
                  as="div"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500"
                >
                  Tutorials by Career
                </Disclosure.Button>
                <div className="pl-4">
                  <Link
                    href="/tutorials"
                    className="block py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    All Tutorials
                  </Link>
                  {careers.map((career) => (
                    <Link
                      key={career.id}
                      href={`/tutorials?career=${career.id}`}
                      className="block py-2 pl-3 pr-4 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {career.name}
                    </Link>
                  ))}
                </div>

                <Disclosure.Button
                  as="div"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500"
                >
                  Tools by Career
                </Disclosure.Button>
                <div className="pl-4">
                  <Link
                    href="/tools"
                    className="block py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    All Tools
                  </Link>
                  {careers.map((career) => (
                    <Link
                      key={career.id}
                      href={`/tools?career=${career.id}`}
                      className="block py-2 pl-3 pr-4 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {career.name}
                    </Link>
                  ))}
                </div>

                {isLoggedIn ? (
                  <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as={Link}
                        href="/auth/login"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Sign in
                      </Disclosure.Button>
                      <Disclosure.Button
                        as={Link}
                        href="/auth/register"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Sign up
                      </Disclosure.Button>
                    </div>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>{children}</main>
    </div>
  )
}
