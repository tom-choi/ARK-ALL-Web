import React from "react";
import Container from "../container";
import { useTranslation } from "react-i18next";

const Cta = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-themeColor bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            {t("Are you ready to use the App?")}
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            {t("new world")}
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="https://apps.apple.com/us/app/um-all/id1636670554"
            target="_blank"
            rel="noopener"
            className="inline-block py-3 mx-auto text-themeColor text-lg font-medium text-center bg-white rounded-md px-7 lg:px-8 lg:py-3 hover:opacity-50">
            App Store
          </a>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="https://play.google.com/store/apps/details?id=one.umall"
            target="_blank"
            rel="noopener"
            className="inline-block py-3 mx-auto text-themeColor text-lg font-medium text-center bg-white rounded-md px-7 lg:px-8 lg:py-3 hover:opacity-50">
            Android
          </a>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="https://umall.one/static/release/app-release.apk"
            target="_blank"
            rel="noopener"
            className="inline-block py-3 mx-auto text-themeColor text-lg font-medium text-center bg-white rounded-md px-7 lg:px-8 lg:py-3 hover:opacity-50">
            HUAWEI
          </a>
        </div>

      </div>
    </Container>
  );
}

export default Cta;