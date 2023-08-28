import Head from "next/head";
import Ark from "../components/ark";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

// data

import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import BusImg from "../public/img/接駁車(宣傳).png";
import EventImg from "../public/img/社團活動(宣傳).png";

// 


import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";

import { useTranslation, I18nextProvider } from "react-i18next";

import { useRouter } from 'next/router';

const Home = () => {

  const { t } = useTranslation();

  const benefitOne = {
    title: t("Take the Bus!"),
    desc: t("THBdesc"),
    image: BusImg,
    bullets: [
      {
        title: t("THBbullets1-title"),
        desc: t("THBbullets1-desc"),
        icon: <FaceSmileIcon />,
      },
      // {
      //   title: "Improve acquisition",
      //   desc: "aaabbb",
      //   icon: <ChartBarSquareIcon />,
      // }
    ],
  };
  
  const benefitTwo = {
    title: t("Club Activity Tracking"),
    desc: t("CATdesc"),
    image: EventImg,
    bullets: [
      {
        title: t("CATbullets1-title"),
        desc: t("CATbullets1-desc"),
        icon: <DevicePhoneMobileIcon />,
      },
      // {
      //   title: "aaabbb",
      //   desc: "aaabbb",
      //   icon: <AdjustmentsHorizontalIcon />,
      // }
    ],
  };
  
  // data

  const router = useRouter();
  const navigateToPage = (page) => {
    router.push(page);
  };

  return (
    <>
      <Head>
        <title>UM-ARK-ALL</title>
        <meta
          name="description"
          content={t("arkText")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Ark />
      <SectionTitle
        pretitle = {t("More Features")}
        title={t("Why Use UM-ARK-ALL?")}>
        {t("arkText")}
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      {/* <SectionTitle
        pretitle={t("Promotional Video")}
        title={t("Tutorial")}>
        {t("Tutorial")}
      </SectionTitle> */}
      {/* <Video /> */}
      {/* <SectionTitle
        pretitle={t("User Feedback")}
        title={t("See Feedback from UM Students")}>
      </SectionTitle> */}
      {/* <Testimonials /> */}
      <SectionTitle 
      pretitle={t("FAQ")} 
      title={t("ARK ALL Frequently Asked Questions")}>
        {t("Frequently Asked Questions")}
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
      <PopupWidget />
    </>
  );
}

export default Home;