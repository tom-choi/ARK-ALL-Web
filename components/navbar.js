import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslation } from "react-i18next";

import { useRouter } from 'next/router';

import { customSettings } from '../utils/settings';

const Navbar = () => {

  const router = useRouter();
  const navigateToPage = (page) => {
    router.push(page);
  };

  const { t } = useTranslation();

  const navigation = [
    "ClubSignin",
    "Tutorial",
    "QA",
    "User_Agreement",
    "About_us",
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">

        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.png"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8 rounded-md"
                      />
                    </span>
                    <span className="text-themeColor font-bold">
                      ARK ALL
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover: text-text-indigo-500 focus:text-themeColor focus:bg-themeColorUltraLight focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((menu, index) => {
                      return (
                        <Link
                          href={`/${menu.toLowerCase()}`} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-200 hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800"
                          onClick={() => navigateToPage('/' + menu.toLowerCase())}>
                          {t(menu)}
                        </Link>
                      )
                    })}
                    {/* <Link href="/" className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">         
                        Get Started
                    </Link> */}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => {
              return (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href={`/${menu.toLowerCase()}`} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800"
                    onClick={() => navigateToPage('/' + menu.toLowerCase())}>
                    {t(menu)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {/* <Link href="/" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Get Started
          </Link> */}

          <ThemeChanger />
          <LanguageSwitcher />
        </div>
      </nav>
      {process.env.NODE_ENV == 'development' && (
        <div className="bg-alert pl-3 py-2">
          <p className="text-white"><strong>警告:</strong> 您現在使用的是本地服務器。</p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
