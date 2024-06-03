import { ReactSVG } from 'react-svg';
import Logo from '../../../../assets/images/logo.svg'
import { ArrowRightCircleIcon, LockClosedIcon, EnvelopeIcon, EyeIcon } from '@heroicons/react/20/solid';
import { InputComponent } from '../../../../components/form/input/input';
import { LabelComponent } from '../../../../components/form/label/label';
import { ButtonComponent } from '../../../../components/form/button/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthUser } from '../../../../provider/context';
import { SignInUser } from '../../../../services/firebase/hooks';
import { ToastContainer, toast } from 'react-toastify';

export const AuthLogin = () => {
  const { user, loading } = useAuthUser();
  const [processingLogin, setProcessingLogin] = useState(false);
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [validEmailAndPass, setValidEmailAndPass] = useState(false)
  const navigate = useNavigate()
  const toastOptions = { position: 'bottom-left', autoClose: 2500, closeButton: false, theme: 'light', pauseOnHover: true }

  if (!loading && user && !processingLogin) {
    navigate('/', { replace: true })
  }

  useEffect(() => {
    document.title = 'Rocket Flow | Login';
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
  };

  const passEyeVisibility = () => {
    
  }

  const SubmitForm = async (e) => {
    try {
      e.preventDefault()
      setProcessingLogin(true);
      await SignInUser(email, pass);
      toast.success('Successfully logged in.', toastOptions)
      toast.loading('Redirecting you...', toastOptions)
      setTimeout(() => {
        navigate('/', { replace: true })
        setProcessingLogin(false)
      }, 3500)
    } catch (error) {
      setPass('')
      setProcessingLogin(false)
      switch (error.code) {
        case ('auth/invalid-credential'):
          toast.error('The credentials provided are invalid!', toastOptions)
          break;
        case ('auth/invalid-email'):
          toast.warn("You didn't enter a valid email.", toastOptions)
          break;
        case ('auth/missing-password'):
          toast.warn("You didn't enter your password.", toastOptions)
          break;
        case ('auth/too-many-requests'):
          toast.warning("You have made too many requests, please try again later.", toastOptions)
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
        <div className='flex w-fit h-fit items-center mb-4 text-slate-300 justify-center flex-col'>
          <div style={{ width: '300px', height: '100px' }}>
            <ReactSVG role='img' className='w-full h-full fill-current text-slate-400 mb-1' src={Logo} />
          </div>
          <h1 className='text-2xl font-mono font-semibold'>RocketFlow</h1>
        </div>
        <form autoComplete='off' className="w-2/4 my-4 h-fit flex flex-col items-center gap-5" onSubmit={SubmitForm} method='post'>
          <div className='w-2/4 flex flex-col'>
            <div className='flex mb-1 mx-0.5 items-center justify-between'>
              <div className='flex gap-1 items-center'>
                <EnvelopeIcon className='w-4.5 h-4.5 text-slate-400' />
                <LabelComponent htmlFor="mail_form" >Email</LabelComponent>
              </div>
              <Link to={'/auth/register'} role='link' className='font-bold mr-1.5 text-xs text-blue-600 text-opacity-90'>Don't have account? Sing-up</Link>
            </div>
            <InputComponent value={email} maxLength={40} onInput={changedFields} placeholder='your@email.com' type="email" name="email" id="mail_form" />
          </div>
          <div className='w-2/4 flex flex-col'>
            <div className='flex mb-1 mx-0.5 items-center justify-between'>
              <div className='flex gap-1 items-center text-center'>
                <LockClosedIcon className='w-4.5 h-4.5 text-slate-400' />
                <LabelComponent htmlFor="pass_form" >Password</LabelComponent>
              </div>
              <Link to={'/auth/recover-pass'} role='link' className='font-bold mr-1.5 text-xs text-blue-600  text-opacity-90'>Forgot your password?</Link>
            </div>
            <div className='flex relative'>
              <InputComponent minLength={8} maxLength={20} classPName={'pr-8'} value={pass} onInput={changedFields} placeholder='RocketFlowBest' type="password" name="password" id="pass_form"></InputComponent>
              <button className='absolute p-1 right-3 top-1/2 transform -translate-y-1/2 text-slate-400' onClick={passEyeVisibility} type='button'><EyeIcon className=' size-5 '></EyeIcon></button>
            </div>
          </div>
          <div className='w-2/4 pl-0.5 pr-0.5 flex items-center'>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" id='section_init' value="" className="sr-only peer" defaultChecked />
              <div className="relative w-9 h-5 bg-slate-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white  after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-500"></div>
              <span className='ml-2 text-sm text-slate-400 font-medium cursor-default' htmlFor="section_init">Keep me signed in.</span>
            </label>
          </div>
          <ButtonComponent disabled={!validEmailAndPass}>Sign-in<ArrowRightCircleIcon className='size-5 text-current' /></ButtonComponent>
        </form>
      </main>
      <ToastContainer />

    </>
  );
}