import React, { Component, Fragment } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Transition, Menu } from '@headlessui/react';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const userNavigation = [
    { name: 'Your profile' },
    { name: 'Sign out' },
];

export default class header extends Component {
    render() {
        return (
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center lg:hidden">
                    <img
                        className="h-6 w-auto"
                        src="/logo.png"
                        alt="Your Company"
                    />
                </div>
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => this.setState({ sidebarOpen: true })}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <form className="relative flex flex-1" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <MagnifyingGlassIcon
                            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <input
                            id="search-field"
                            className="block h-full w-full border-0 py-0 pl-8 pr-0 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                            placeholder="Search..."
                            type="search"
                            name="search"
                        />
                    </form>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">

                        {/* Separator */}
                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span className="hidden lg:flex lg:items-center">
                                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                        Tom Cook
                                    </span>
                                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <p
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    {item.name}
                                                </p>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}
