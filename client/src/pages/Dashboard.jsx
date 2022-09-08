
import DisplayImage from "../components/DisplayImage"
import image from "../assets/background-1.avif";
import { Link } from 'react-router-dom';
import {useGlobally} from '../context/context'
import logo from "../assets/logo.svg"

const Dashboard = () => {
  const {username} = useGlobally()
  return (
    // dashboard
    <div className="w-full bg-white flex flex-col justify-center text-center">
      <section
        style={{
          backgroundImage: { image },
        }}
        className="container-xl flex bg-orangeDark flex-col items-center justify-start bg-center bg-no-repeat bg-cover bg-blend-darken 
        bg-blend-screen h-[550px]"
      >
        <div className="w-full flex px-10 pt-16 mt-2 flex-col items-start md:flex-col md:w-3/4 md:px-0">
          {/* <div className="flex items-center p-2">
            <img
              className="w-9 h-9 mr-5 bg-blackMid rounded-xl md:w-12 md:h-12"
              src={logo}
              alt="logo"
            />
            <h1 className="text-lg text-black font-bold md:text-2xl">
              Sta Blogging App
            </h1>
          </div> */}
          <div className="w-full mt-4 text-left text-lg text-white font-bold mb-20 md:text-left md:text-4xl">
            This a Blogging App, where you can easily store your well written
            essays to inform your fellow users. Unfortunately, unregistered
            users cannot access your dat until they have their own account with
            us but not to worry the registration process is fast and simple.
          </div>
        </div>
        <Link
          className="bg-black text-white transition-all text-sm p-2 px-4 mt-3 drop-shadow-md hover:drop-shadow-lg rounded-md md:text-lg"
          to={username ? "blog" : `auth`}
        >
          Get Started
        </Link>
      </section>
      <DisplayImage />
    </div>
  );
};
export default Dashboard;
