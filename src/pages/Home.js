import { useState } from "react";
import { Link } from "react-router-dom";
import { color, btnStyle } from "../utils/uiMap";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

export default function Home() {
    //username初始值為Kelvin
    const [username, setUsername] = useState('Kelvin')
    const handleChangeUser = () => {
        setUsername('Tony')
        console.log(username)
    }
    //style
    const iconStyle = {
        fontSize: 40,
        color: color.theme
    }
    const imgStyle = {
        maxHeight: "20rem",
        objectFit: "contain",
    }

    return (
        <div className="m-1">
            <div className="border bg-white rounded-lg mb-3 pb-2 shadow">
                <div className='flex justify-center'>
                    <h2>Hi! {username}</h2>
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleChangeUser}>Change User</button>
                </div>
                <div>
                    <Swiper
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        speed={300}
                        loop={true}
                        autoplay={true}
                        className="mySwiper"
                    >
                        <SwiperSlide><img src="https://sdfsdf.dev/300x200.png" style={imgStyle} alt="c"></img></SwiperSlide>
                        <SwiperSlide><img src="https://sdfsdf.dev/30x200.png" style={imgStyle} alt="c"></img></SwiperSlide>
                        <SwiperSlide><img src="https://sdfsdf.dev/200x30.png" style={imgStyle} alt="c"></img></SwiperSlide>
                        <SwiperSlide><img src="https://sdfsdf.dev/30x20.png" style={imgStyle} alt="c"></img></SwiperSlide>
                        <SwiperSlide><img src="https://sdfsdf.dev/300x300.png" style={imgStyle} alt="c"></img></SwiperSlide>
                    </Swiper>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="text-center mx-4 mb-2 mt-3 text-sm">
                        <Link to="/campus-loop">
                            <ion-icon name="bus" style={iconStyle}></ion-icon><br />
                            校園巴士
                        </Link>
                    </div>
                    <div className="text-center mx-4 mb-2 mt-3 text-sm">
                        <Link to="/info/activities">
                            <ion-icon name="aperture-sharp" style={iconStyle}></ion-icon><br />
                            最近活動
                        </Link>
                    </div>
                    <div className="text-center mx-4 mb-2 mt-3 text-sm">
                        <Link to="/info/organizations">
                            <ion-icon name="color-wand" style={iconStyle}></ion-icon><br />
                            澳大社團
                        </Link>
                    </div>
                    <div className="text-center mx-4 mb-2 mt-3 text-sm">
                        <Link to="/info/news">
                            <ion-icon name="earth-sharp" style={iconStyle}></ion-icon><br />
                            澳大新聞
                        </Link>
                    </div>
                    <div className="text-center mx-4 mb-2 mt-3 text-sm">
                        <Link to="/services">
                            <ion-icon name="grid" style={iconStyle}></ion-icon><br />
                            所有服務
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center border bg-white rounded-lg mb-3 p-2 shadow">
                ARK ALL源自FST同學為愛發電TAT，並非官方應用程式！<br />
                <div className="font-bold">
                    本軟件代碼在Github開源，歡迎✨✨<br />
                    本軟件並非澳大官方應用‼️ x1<br />
                    本軟件並非澳大官方應用‼️ x2<br />
                    本軟件並非澳大官方應用‼️ x3<br />
                    如您仍然信任本軟件，感謝您的認可 ♪(･ω･)ﾉ<br />
                </div>
                您可能想先了解：<br />
                <Link to="/about" style={btnStyle}>
                    這個APP是?
                </Link><br />
                如果你是新同學... (詳見服務頁新生推薦)<br />
                <a href="https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&album_id=1463637399816323072" target="_blank" rel="noreferrer" style={btnStyle}>
                    我是萌新
                </a><br />
                您可能還有很多疑問...<br />
                <a href="https://umall.one/qa.html" target="_blank" rel="noreferrer" style={btnStyle}>
                    我要怎麼...
                </a>
            </div>
        </div>
    );
}