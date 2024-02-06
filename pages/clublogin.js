// 包引用
import axios from 'axios';
import qs from 'qs';

//本地引用
import { BASE_URI, GET } from '../utils/pathMap';
import Container from '../components/container';
import Navbar from '../components/navbar';


// 存入臨時變量，準備提交後端驗證
let accountPassword = {
    account: '',
    password: '',
};


const ClubLogin = () => {

    return(
        <>
        <Navbar/>
        <Container className="flex flex-col w-full h-full items-center justify-center">
            {/* UI Block*/}
            <div className="block p-5 pb-10 bg-white drop-shadow-xl rounded-lg items-center justify-center min-w-96 ">
                <div className="text-2xl text-themeColor font-semibold mb-8 text-center">
                    <h1>社團賬號登入</h1>
                </div>

                <div className="flex felx-col items-center justify-center">
                    <ul className="space-y-4">
                        <li>
                            <p className="text-themeColor font-bold">社團名稱</p>
                            <input
                                className="border-2 rounded-lg h-10"
                                defaultValue="">
                            </input>
                        </li>
                        <li className="justify-center items-center">
                            <p className="text-themeColor font-bold">登入密碼</p>
                            <input
                                className="border-2 rounded-lg h-10"
                                defaultValue="">
                            </input>
                        </li>
                        <li className="flex justify-center items-center">
                            <button className="bg-themeColor py-2 px-5 rounded-lg text-white font-bold">
                                Login
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
        </>
    );
        
};



export default ClubLogin;