import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from '../components/container';
import Image from "next/image";

import Img2_1 from '../public/img/tur/二-1.JPG';
import Img2_2 from '../public/img/tur/二-2.JPG';
import Img2_3 from '../public/img/tur/二-3.JPG';
import Img3_1 from '../public/img/tur/三-1.JPG';
import Img3_2 from '../public/img/tur/三-2.JPG';
import Imglog from '../public/img/tur/登陸.JPG';

const tutorial = () => {

  const Img1 = {
    image: Img2_1,
  };
  const Img2 = {
    image: Img2_2,
  };
  const Img3 = {
    image: Img2_3,
  };
  const Img4 = {
    image: Img3_1,
  };
  const Img5 = {
    image: Img3_2,
  };
  const Img6 = {
    image: Imglog,
  };

  return (
    <>
      <Navbar />
      <Container className="flex flex-wrap lg:flex-nowrap w-full h-full">
        <div className="flex items-center justify-center w-full h-full lg:w-1/2 grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={Img1.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img1.image.src}
              style={{ maxWidth: "100%" }}
            />
            <Image
              src={Img2.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img2.image.src}
            />
            <Image
              src={Img3.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img3.image.src}
            />
            <Image
              src={Img4.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img4.image.src}
            />
            <Image
              src={Img5.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img5.image.src}
            />
            <Image
              src={Img6.image}
              width="521"
              height="auto"
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Img6.image.src}
            />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default tutorial;