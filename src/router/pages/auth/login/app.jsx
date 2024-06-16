import { ReactSVG } from 'react-svg';
import Logo from '../../../../assets/images/logo.svg'
import { ArrowRightCircleIcon, LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { InputComponent } from '../../../../components/form/input/input';
import { LabelComponent } from '../../../../components/form/label/label';
import { ButtonComponent } from '../../../../components/form/button/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthUser } from '../../../../provider/context';
import { SignInUser } from '../../../../services/firebase/hooks';
import { ToastContainer, toast } from 'react-toastify';
import '../auth.module.css'
import { Spinner } from '../../../../components/loader/spin/app';

export const AuthLogin = () => {
  const { user, loading } = useAuthUser();
  const [processingLogin, setProcessingLogin] = useState(false);
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passType, setPassType] = useState('password')
  const [passIsVisible, setPassVisible] = useState(false)
  const [validEmailAndPass, setValidEmailAndPass] = useState(false)
  const [isBtnDisable, setBtnDisable] = useState(true)
  const navigate = useNavigate()
  const toastPrms = { position: 'bottom-left', autoClose: 2500, closeButton: false, theme: 'light', pauseOnHover: true }

  if (!loading && user && !processingLogin) {
    navigate('/', { replace: true })
  }

  useEffect(() => {
    document.title = 'Space Flow | Login';
  }, []);


  const changedFields = (e) => {
    const { value, name } = e.target;

    if (name === 'email') {
      setEmail(value)
      vFields(value, pass)
    }
    if (name === 'password') {
      setPass(value)
      vFields(email, value)
    }
  }

  const vFields = (email, password) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPass = password.length >= 8;
    setValidEmailAndPass(isValidEmail && isValidPass);
    setBtnDisable(false)
  };

  const passEyeVisibility = () => {
    if (passType !== 'password') {
      setPassType('password')
      setPassVisible(false)
    } else
      if (passType !== 'text') {
        setPassType('text')
        setPassVisible(true)
      }
  }

  const trySigninUser = async (e) => {
    try {
      e.preventDefault()
      setProcessingLogin(true);
      setBtnDisable(true)
      await SignInUser(email, pass);
      toast.success('Successfully logged in.', toastPrms)
      toast.loading('Redirecting you...', toastPrms)
      setTimeout(() => {
        navigate('/', { replace: true })
        setProcessingLogin(false)
      }, 3500)
    } catch (error) {
      setProcessingLogin(false)
      switch (error.code) {
        case ('auth/invalid-credential'):
          setEmail('')
          setPass('')
          toast.error('The credentials provided are invalid!', toastPrms)
          break;
        case ('auth/invalid-email'):
          setEmail('')
          toast.warn("You didn't enter a valid email.", toastPrms)
          break;
        case ('auth/user-disabled'):
          setEmail('')
          setPass('')
          toast.error("Your account this disabled.", toastPrms)
          break;
        case ('auth/missing-password'):
          setPass('')
          toast.warn("You didn't enter your password.", toastPrms)
          break;
        case ('auth/too-many-requests'):
          setEmail('')
          setPass('')
          toast.warning("You have made too many requests, please try again later.", toastPrms)
          break;
        default:
          console.error("Login Error: \n", error)
          break;
      }
    }

  }

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center flex-col text-white bg-blueOcean" >
        <div className='flex w-full h-52 items-center justify-center flex-col'>
          <ReactSVG role='img' className='' src={Logo} beforeInjection={(svg) => { svg.classList.add('w-full', 'h-full') }} />
        </div>
        <form autoComplete='off' className="w-full max-md:p-5 my-4 h-fit flex flex-col items-center gap-5" onSubmit={trySigninUser} method='post'>
          <div className='w-full md:w-3/5 lg:w-2/5  xl:w-1/4 flex flex-col'>
            <div className='flex mb-1 mx-0.5 items-center justify-between'>
              <div className='flex gap-1 items-center'>
                <EnvelopeIcon className='w-4.5 h-4.5 text-slate-400' />
                <LabelComponent htmlFor="mail_form" >Email</LabelComponent>
              </div>
              <Link to={'/auth/register'} role='link' className='font-bold mr-1.5 text-xs text-blue-500 text-opacity-90'>Don't have account? Sing-up</Link>
            </div>
            <InputComponent value={email} maxLength={40} onInput={changedFields} placeholder='your@email.com' type="email" name="email" id="mail_form" />
          </div>
          <div className='w-full md:w-3/5 lg:w-2/5 xl:w-1/4 flex flex-col'>
            <div className='flex mb-1 mx-0.5 items-center justify-between'>
              <div className='flex gap-1 items-center text-center'>
                <LockClosedIcon className='w-4.5 h-4.5 text-slate-400' />
                <LabelComponent htmlFor="pass_form" >Password</LabelComponent>
              </div>
              <Link role='link' className='font-bold mr-1.5 cursor-default text-xs text-blue-500 text-opacity-75'>Forgot your password?</Link>
            </div>
            <div className='flex relative'>
              <InputComponent minLength={8} maxLength={20} classPName={'pr-8'} value={pass} onInput={changedFields} placeholder='RocketFlowBest' type={passType} name="password" id="pass_form"></InputComponent>
              {pass && <button className='absolute p-1 right-3 top-1/2 transform -translate-y-1/2 text-slate-400' onClick={() => passEyeVisibility()} type='button'>{passIsVisible ? (<EyeSlashIcon className=' size-5 '></EyeSlashIcon>) : (<EyeIcon className=' size-5 '></EyeIcon>)}</button>}
            </div>
          </div>
          <div className='w-full md:w-3/5 lg:w-2/5 xl:w-1/4 pl-0.5 pr-0.5 flex items-center'>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" id='section_init' value="" className="sr-only peer" defaultChecked />
              <div className="relative w-9 h-5 bg-slate-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white  after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-500"></div>
              <span className='ml-2 text-sm text-slate-400 font-medium cursor-default' htmlFor="section_init">Keep me signed in.</span>
            </label>
          </div>
          <ButtonComponent disabled={!validEmailAndPass || isBtnDisable}>Sign-in{processingLogin ? (<Spinner></Spinner>) : (<ArrowRightCircleIcon className='size-5 text-current' />)}</ButtonComponent>
        </form>
        <ToastContainer />
      </main>
    </>
  );
}