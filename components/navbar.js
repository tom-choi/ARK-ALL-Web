import React from "react";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import WarningBanner from "/components/micros/WarningBanner";
import { useEffect, useState } from "react";

const NBLink = (props) => {
  const { destination, isMobile, isSelected = false } = props;
  const router = useRouter();

  const styles = {
    "PC": `inline-block px-4 py-2 text-lg ${isSelected ? "text-themeColor font-bold" : "text-gray-800 dark:text-gray-200 font-normal"} no-underline rounded-md  hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 hover:scale-[1.02] transition-all focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800 hover:cursor-pointer`,
    "Mobile": "w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-200 hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800 hover:cursor-pointer"
  };

  return (
    <div
      className={isMobile ? styles.Mobile : styles.PC}
      onClick={() => router.push('/' + destination)}>
      {props.children}
    </div>
  );
};

const Navbar = (props) => {
  const { selected = "", fixed } = props;
  const { t } = useTranslation();

  const [m_atTop, setAtTop] = useState(true);

  const navigation = [
    "ClubSignin",
    "Tutorial",
    "QA",
    "User_Agreement",
    "About_us",
  ];

  const handleScroll = () => {
    const position = window.scrollY;
    setAtTop(position == 0);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${fixed ? "fixed" : "sticky"} top-0 w-full ${m_atTop ? "" : "backdrop-blur-3xl bg-[#ffffff99] dark:bg-[#17171799]"} z-[99] transition-all`}>
      <nav className="container relative w-full flex flex-wrap items-center justify-between pt-4 py-4 px-0 mx-auto lg:justify-between xl:px-0 ">

        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <React.Fragment>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto gap-1">
                {/* Logo */}
                <Link href="/" className={`mx-5`}>
                  <div className="flex flex-row items-left space-x-5 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <Image
                      src="/img/logo.png"
                      alt="N"
                      width="32"
                      height="32"
                      className="w-8 rounded-md"
                    />
                    <div className={`text-themeColor font-bold opacity-${m_atTop ? "0" : "100"} transition-all`}>
                      ARK ALL
                    </div>
                  </div>
                </Link>

                {/* Hamburger */}
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 mr-5 ml-auto text-gray-500 rounded-md lg:hidden hover: text-text-indigo-500 focus:text-themeColor focus:bg-themeColorUltraLight focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700 transition-all">
                  <svg
                    className="w-6 h-6 fill-current transition-all"
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

                {/* Mobile Nav*/}
                <Disclosure.Panel className={`relative flex flex-wrap w-full lg:hidden ${m_atTop && "backdrop-blur-3xl bg-[#ffffff99]"} px-10 py-5 items-center text-center gap-5 transition-all`}>
                  <NBLink destination={""} isMobile>{t("PG_HOME")}</NBLink>
                  {navigation.map((menu, index) => (
                    <NBLink destination={menu.toLowerCase()} isMobile>{t(menu)}</NBLink>
                  ))}
                </Disclosure.Panel>
              </div>
            </React.Fragment>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex gap-3">
            <li>
              <NBLink destination={""} isSelected={selected == ""}>{t("PG_HOME")}</NBLink>
            </li>
            {navigation.map((menu, index) => (
              <li className="nav__item" key={index}>
                <NBLink destination={menu.toLowerCase()} isSelected={selected == menu}>
                  {t(menu)}
                </NBLink>
              </li>
            ))}
          </ul>
        </div>

        {/** 語言、主題切換 */}
        <div className="flex max-[1320px]:hidden mr-3 space-x-4 nav__item">
          <ThemeChanger />
          <LanguageSwitcher />

        </div>
      </nav>

      <WarningBanner />
    </div>
  );
}

export default Navbar;
