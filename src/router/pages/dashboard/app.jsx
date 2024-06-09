import { useEffect, useState } from "react";
import { SignOutUser } from "../../../services/firebase/hooks";
import { useAuthUser } from "../../../provider/context";
import { Bars3Icon, XMarkIcon, UserCircleIcon, UsersIcon, IdentificationIcon, RocketLaunchIcon, ChartBarSquareIcon, DocumentTextIcon, Cog8ToothIcon, CommandLineIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import styles from './app.module.css';

import { ReactSVG } from "react-svg";
import MoonIlus from '../../../assets/images/moon.svg';
import { Link } from "react-router-dom";

export const DashBoard = () => {
  const { user } = useAuthUser();
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    document.title = 'React Flow | Dashboard';
  }, []);

  const toggleMenuIcon = () => {
    setMenuOpened(!menuOpened);
  };
  const MenuMainWeb = [{ name_opt: 'Profile', icon: <IdentificationIcon className={styles.menu_web_icon} /> }, { name_opt: 'User', icon: <UsersIcon className={styles.menu_web_icon} /> }, { name_opt: 'Playing', icon: <RocketLaunchIcon className={styles.menu_web_icon} /> }, { name_opt: 'Status', icon: <ChartBarSquareIcon className={styles.menu_web_icon} /> }]
  const MenuOthersWeb = [{ name_opt: 'Historic', icon: <DocumentTextIcon className={styles.menu_web_icon} /> }, { name_opt: 'Settings', icon: <Cog8ToothIcon className={styles.menu_web_icon} /> }, { name_opt: 'Commands', icon: <CommandLineIcon className={styles.menu_web_icon} /> }]
  const MenuMobile = ['Profile', 'Users', 'Commands', 'Settings', 'History'];

  const tryLogoutUser = () => {
    try {
      SignOutUser();
    } catch (error) {
      alert('Não foi possível deslogar, erro:\n', error);
    }
  };

  return (
    <>
      {menuOpened && (
        <div className="absolute flex w-full h-full z-10 bg-gray-950">
          <div className="absolute w-full flex flex-col gap-2.5 top-32">
            <div className="flex flex-col items-center w-full ">
              <div className="w-3/5">
                <span className="text-slate-400 text-xl uppercase font-bold">Menu Principal</span>
                <ul className="flex  my-5 flex-col text-lg  font-semibold">
                  {MenuMobile && MenuMobile.map((item, index) => (
                    <li className="flex items-center gap-0.5 py-2.5 text-slate-500 transition-colors hover:text-slate-300 duration-300 ease-in-out" key={index}><Link to="#">{item}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button onClick={tryLogoutUser} className="flex justify-center w-3/5 py-2.5 cursor-pointer items-center text-base font-semibold bg-blue-700 bg-opacity-80 text-slate-300 rounded-md transition-colors duration-300 ease-in-out"><ArrowRightStartOnRectangleIcon className="size-5 mr-2" />Logout</button>
            </div>
          </div>
        </div>
      )}
      <main className="flex max-md:flex-col w-full h-screen bg-black text-slate-300">
        <aside className="flex max-md:w-full flex-col bg-zinc-950 bg-opacity-50 gap-2 w-1/5 h-full max-sm:h-fit">
          <div className="w-full h-14">
            <div className="w-full h-full relative border-b max-sm:px-2.5 border-gray-800 justify-between flex items-center">
              <div className="flex w-full pl-5 max-sm:p-0 self-start h-full items-center gap-1">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-400 bg-opacity-10">
                  <UserCircleIcon className="size-5 text-slate-400" />
                </div>
                <span className="font-bold text-xs text-slate-400 uppercase ">{user?.displayName || 'Unknown'}</span>
              </div>
              <div className="flex relative items-center max-sm:pr-5 right-0">
                <button type="button" className="lg:hidden max-sm:absolute z-50" onClick={toggleMenuIcon}>{!menuOpened ? <Bars3Icon className="size-5" /> : <XMarkIcon className="size-6" />}</button>
              </div>
            </div>
          </div>
          <div className=" max-sm:hidden flex-1 mt-5">
            <div className="px-1 border-b border-gray-800 pb-5">
              <span className="uppercase px-5 text-gray-400 text-xs font-bold">Menu</span>
              <ul className="flex flex-col px-1 gap-1 mt-2 ">
                {MenuMainWeb && MenuMainWeb.map((i) => {
                  return (<li className={styles.text_page} key={i.name_opt}>{i.icon}{i.name_opt}</li>)
                })}
              </ul>
            </div>
            <div className=" mt-2.5 px-1 border-b border-gray-800 pb-5">
              <span className="uppercase px-5 text-gray-400 text-xs font-bold">Others</span>
              <ul className="flex flex-col px-1 gap-1 mt-2">
                {MenuOthersWeb && MenuOthersWeb.map((i) => {
                  return (<li className={styles.text_page} key={i.name_opt}>{i.icon}{i.name_opt}</li>)
                })}
              </ul>
            </div>
            <div className="mt-7 px-5 w-full">
              <button onClick={tryLogoutUser} className="flex justify-center w-full py-2.5 cursor-pointer items-center text-base font-semibold bg-blue-700 bg-opacity-80 rounded-md transition-colors duration-300 ease-in-out"><ArrowRightStartOnRectangleIcon className="size-5 mr-2" />Logout</button>
            </div>
          </div>
        </aside>
        <section className=" bg-black w-full h-full bg-opacity-45 flex items-center justify-center max-sm:h-full md:h-1/2 max-lg:h-1/2 xl:h-full flex-col ">
          <div className="text-center p-2.5">
            <h1 className="font-semibold text-2xl">Hello, <span className="font-bold text-slate-200">{user?.displayName || 'Unknown'}</span> welcome to!</h1>
            <p className="font-semibold my-1 text-slate-400 text-base">You've reached the Dashboard, the place where you can control everything.</p>
          </div>
          <div className="flex items-center w-fit h-fit  justify-center">
            <ReactSVG beforeInjection={(svg) => { svg.classList.add('max-sm:w-72', 'max-sm:h-fit') }} src={MoonIlus} />
          </div>
        </section>
      </main>
    </>
  );
};
