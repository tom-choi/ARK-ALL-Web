import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from "../components/container";

const about_us = () => {
  return (
    <div className="relative">
      <Navbar selected={"About_us"} />
      <Container>
        <div className="block flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
          <h1
            style={{
              fontWeight: '600',
              fontSize: '30px',
              textAlign: 'center',
              marginBottom: '30px',
              color: '#328ad1',
            }}
          >
            關於ARK ALL
          </h1>
          <ul className="space-y-8">
            <li>
              <div>
                <h2 className="font-bold text-xl">
                  ARK ALL 的由來？
                </h2>
                <p> &emsp;
                  ARK ALL 是 2022 年暑假，幾位不知名的 FST 同學奮戰兩個月做出來的，整個應用全程都是由我們自主開發，其中都踩了不少坑，掉了不少頭髮 QAQ。
                  ARK ALL 的前身是 ARK 微信小程式，該小程式已集成 ARK 學術分享會發佈、UM 校園巴士等功能，也是首次由第三方聯合 FST 的眾學會、社團，為如今的 ARK ALL 運作模式提供了寶貴的經驗。
                  小程式於 21 年 9 月發佈，22 年 4 月停運，2 個月後作者與這幾位不知名同學正式成立新 ARK 開發團隊，ARK ALL 項目正式立項開始開發。
                </p>
              </div>
            </li>

            <li>
              <div>
                <h2 className="font-bold text-xl">
                  ARK ALL 免費嗎？
                </h2>
                <p> &emsp;
                  ARK ALL 為免費軟件，組織申請進駐也無需費用。作者為愛發電 ing。。。希望 ARK ALL 能越來越壯大，最後能真正包羅 UM 的所有。同學們的喜歡與讚揚就是對作者最大的支持~~
                </p>
              </div>
            </li>

            <li>
              <div>
                <h2 className="font-bold text-xl">
                  ARK ALL是澳大官方應用程式嗎？
                </h2>
                <p> &emsp;
                  非也~ 至少在作者寫下這段文字時仍不是。如有改善 ARK ALL 的功能和體驗的方法、渠道，開發者團隊都會盡力去嘗試的！
                </p>
              </div>
            </li>

            <li>
              <div>
                <h2 className="font-bold text-xl">
                  那幾位不知名的同學是？
                </h2>
                <p> &emsp;
                  ARK ALL 第一批代碼貢獻者： <br />
                  &emsp; &emsp;Rookie, yyyyyyounger <br />
                  &emsp; &emsp;Tony, tony153 <br />
                  &emsp; &emsp;Box, BoxMars <br />
                  &emsp; &emsp;Syukugen, Syukugen <br />
                  &emsp; &emsp;Kalo, K4Lok <br />
                  &emsp; &emsp;Kelvin, keltam27 <br />
                  &emsp; YZ Huang 為第一版的 UI 設計師，製作了大部分的設計稿。
                  kevin、Mega、Mane、Ray 等大佬都提供了友情技術支援。
                </p>
              </div>
            </li>

            <li>
              <h2 className="font-bold text-xl">
                Add Drop不能正常使用
              </h2>
              <p>
                &emsp;因為澳大系統的固有設計問題，例如 Add Drop 此類網頁會需要彈窗操作，盡量在電腦上操作會更便利。因此留下複製鏈接和在瀏覽器打開的功能。該功能主要是為新同學準備，初來乍到並不知道舊生所講的服務是何，ARK ALL 可以讓同學對澳大服務先有直觀的了解。
              </p>
            </li>
          </ul>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default about_us;