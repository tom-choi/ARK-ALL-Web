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

  const imgArr = [
    Imglog,
    Img2_1,
    Img2_2,
    Img2_3,
    Img3_1,
    Img3_2,
  ];

  return (
    <>
      <Navbar selected={"Tutorial"} />
      <Container className="flex flex-wrap lg:flex-nowrap w-full h-full">
        <div className="flex items-center justify-center w-full h-full lg:w-1/2 grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {imgArr.map(itm => {
              return <Image
                src={itm}
                width="521"
                height="auto"
                alt="Benefits"
                className="object-cover"
                placeholder="blur"
                blurDataURL={itm.src}
                style={{ maxWidth: "100%" }}
              />
            })}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default tutorial;