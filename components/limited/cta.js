import React from "react";
import Container from "../container";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import logo from '../../public/img/logo.png';

const Cta = () => {
  const { t } = useTranslation();

  useEffect(() => { console.log(logo) }, [])

  const DownloadBtn = (props) => {
    return (
      <div className="flex-shrink-0 w-full text-center lg:w-auto">
        <a
          href={props.link}
          target="_blank"
          rel="noopener"
          className="inline-block py-3 mx-auto text-themeColor text-lg font-medium text-center bg-white rounded-md px-7 lg:px-8 lg:py-3 hover:scale-[1.02] transition-all">
          {props.children}
        </a>
      </div>
    );
  }

  return (
    <Container>
      <div
        style={{
          backgroundImage: `url(${logo.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center justify-between w-full max-w-4xlmx-auto text-white bg-themeColor bg-indigo-600 px-7 py-5 lg:px-12 lg:py-8 lg:flex-nowrap rounded-xl">
        <div className={"flex flex-wrap items-center justify-between w-full gap-5"}>
          <div className="flex-grow text-center lg:text-left drop-shadow-lg">
            <h2 className="text-2xl font-medium lg:text-3xl">
              {t("Are you ready to use the App?")}
            </h2>
            <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
              {t("new world")}
            </p>
          </div>
          <div className={"flex flex-col gap-1"}>
            <div className={"font-bold drop-shadow-md"}>可從以下平臺下載</div>
            <div className={"flex flex-wrap gap-4"}>
              <DownloadBtn
                link={"https://apps.apple.com/us/app/um-all/id1636670554"}>
                App Store
              </DownloadBtn>
              <DownloadBtn
                link={"https://play.google.com/store/apps/details?id=one.umall"}>
                Android
              </DownloadBtn>
              <DownloadBtn
                link={"https://umall.one/static/release/app-release.apk"}>
                HUAWEI
              </DownloadBtn>
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default Cta;