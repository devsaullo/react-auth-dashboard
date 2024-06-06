import { useEffect } from "react";
import { SignOutUser } from "../../../services/firebase/hooks";
import { useAuthUser } from "../../../provider/context";
import { ArrowRightStartOnRectangleIcon, ChartBarSquareIcon, Cog8ToothIcon, CommandLineIcon, DocumentTextIcon, IdentificationIcon, RocketLaunchIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/20/solid";
import styles from './app.module.css';
import { ReactSVG } from "react-svg";
import teste from '../../../assets/images/moon.svg'
export const DashBoard = () => {
  const { user } = useAuthUser();

  useEffect(() => {
    document.title = 'React Flow | DashBoard'
  }, [])

  const Deslogar = () => {
    try {
      SignOutUser()
    } catch (error) {
      alert('Não foi possivel deslogar, erro:\n', error)
    }
  }
  return (
    <>
      <main className="flex flex-1 w-screen h-screen bg-blueOcean text-slate-300">
        <aside className="flex flex-col justify-items-center bg-zinc-950 bg-opacity-50 gap-2 w-1/5 h-full">
          <div className="w-full h-14">
            <div className="w-full h-full px-5 border-b border-gray-800 gap-1.5 flex items-center">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-400 bg-opacity-10">
                <UserCircleIcon className="size-5 text-slate-400" />
              </div>
              <span className="font-bold text-xs text-slate-400 uppercase ">{(user && user.displayName) || 'Unknown'}</span>
            </div>
          </div>
          <div className=" flex-1 mt-5">
            <div className="px-1 border-b border-gray-800 pb-5">
              <span className="uppercase px-5 text-gray-400 text-xs font-bold">Menu</span>
              <ul className="flex flex-col px-1 gap-1 mt-2 ">
                <li className={styles.text_page}><IdentificationIcon className="size-5 mr-2" /> Profile</li>
                <li className={styles.text_page}><UsersIcon className="size-5 mr-2" />Users</li>
                <li className={styles.text_page}><RocketLaunchIcon className="size-5 mr-2" />Playing</li>
                <li className={styles.text_page}><ChartBarSquareIcon className="size-5 mr-2" />Status</li>
              </ul>
            </div>
            <div className=" mt-2.5 px-1 border-b border-gray-800 pb-5">
              <span className="uppercase px-5 text-gray-400 text-xs font-bold">Others</span>
              <ul className="flex flex-col px-1 gap-1 mt-2">
                <li className={styles.text_page}><DocumentTextIcon className="size-5 mr-2" />Historic</li>
                <li className={styles.text_page}><Cog8ToothIcon className="size-5 mr-2" />Settings</li>
                <li className={styles.text_page}><CommandLineIcon className="size-5 mr-2" />Commands</li>
              </ul>
            </div>
            <div className="mt-7 px-5 w-full">
              <button onClick={Deslogar} className="flex justify-center w-full py-2.5 cursor-pointer items-center text-base font-semibold bg-blue-700 bg-opacity-80 rounded-md transition-colors duration-300 ease-in-out"><ArrowRightStartOnRectangleIcon className="size-5 mr-2" />Logout</button>
            </div>
          </div>
        </aside>
        <section className=" bg-black bg-opacity-45 flex items-center justify-center  flex-col w-full h-full">
          <h1 className="font-semibold text-2xl">Hello, <span className="font-bold text-slate-200">{(user && user.displayName) || 'Unknowm'}</span> welcome to!</h1>
          <p className="font-semibold my-1 text-slate-400 text-base">You've reached the Dashboard, the place where you can control everything.</p>
          <div className="flex w-full h-64 items-center justify-center">
            <ReactSVG src={teste} />
          </div>
        </section>
      </main>
    </>

  );
}
