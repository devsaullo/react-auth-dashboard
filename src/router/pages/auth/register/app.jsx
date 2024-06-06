import { ReactSVG } from 'react-svg';
import Logo from '../../../../assets/images/logo.svg';
import { ArrowRightCircleIcon, LockClosedIcon, EnvelopeIcon, UserCircleIcon, ExclamationCircleIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import { InputComponent } from '../../../../components/form/input/input';
import { LabelComponent } from '../../../../components/form/label/label';
import { ButtonComponent } from '../../../../components/form/button/button';
import { useCallback, useEffect, useState } from 'react';
import { RegisterUser, SignOutUser } from '../../../../services/firebase/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../auth.module.css'

export const AuthRegister = () => {
    useEffect(() => {
        document.title = 'Rocket Flow | Register';
    }, []);

    const [uname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passType, setPassType] = useState('password')
    const [passIsVisible, setPassVisible] = useState(false)
    const [isInvalidName, setIsInvalidName] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [isInvalidPass, setIsInvalidPass] = useState(false)
    const [validNameEmailAndPass, setvalidNameEmailAndPass] = useState(false)
    const [hasCheckedTerms, setHasCkeckedTerms] = useState(false)
    const navigate = useNavigate()
    const toastPrms = { position: 'bottom-left', autoClose: 2500, closeButton: false, theme: 'light' }

    const InputChangedValue = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case ('name'):
                setName(value)
                break;
            case ('email'):
                setEmail(value)
                break;
            case ('password'):
                setPass(value)
                break;
            default:
                break;
        }
    }


    const validateForm = useCallback(() => {
        const isValidName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'_-]+$/.test(uname);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPass = /^.{8,}$/.test(pass);
        setIsInvalidName(uname.length > 0 && !isValidName);
        setIsInvalidEmail(email.length > 0 && !isValidEmail);
        setIsInvalidPass(pass.length > 0 && !isValidPass);
        setvalidNameEmailAndPass(isValidName && isValidEmail && isValidPass && hasCheckedTerms);
    }, [uname, email, pass, hasCheckedTerms])

    useEffect(() => {
        validateForm(uname, email, pass)
    }, [uname, email, pass, hasCheckedTerms, validateForm])

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

    const tryRegisterUser = async (e) => {
        try {
            e.preventDefault()
            await RegisterUser(uname, email, pass);
            toast.success("Account created successfully.", toastPrms)
            await SignOutUser();
            setTimeout(() => {
                navigate('/auth/login', { replace: true })
            }, 3500)
        } catch (error) {
            switch (error.code) {
                case ('auth/email-already-in-use'):
                    toast.error("The email is already in use!", toastPrms)
                    break;
                default:
                    break;
            }
        }
    }


    return (
        <>

            <main className="w-full h-screen flex items-center justify-center flex-col text-white bg-blueOcean" >
                <div className='flex w-fit h-fit items-center mb-4 text-slate-300 justify-center flex-col'>
                    <ReactSVG className='w-fit fill-current text-slate-400 mb-1' src={Logo} />
                    <h1 className='text-2xl font-mono font-semibold'>RocketFlow</h1>
                </div>
                <form autoComplete='off' className="w-2/4 my-4 h-fit flex flex-col items-center gap-3" id='form_register' onSubmit={tryRegisterUser} method='post'>
                    <div className='w-2/4 flex flex-col'>
                        <div className='flex mb-1 mx-0.5 items-center justify-between'>
                            <div className='flex gap-1 text-center items-center'>
                                <UserCircleIcon className='w-4.5 h-4.5 text-slate-400' />
                                <LabelComponent htmlFor="name_form">Name</LabelComponent>
                            </div>
                        </div>
                        <InputComponent maxLength={25} classPName={`${isInvalidName ? 'bg-red-900 bg-opacity-60 border-red-800' : 'currentColor'}`} value={uname} onInput={InputChangedValue} placeholder='TheSaulloDev' type="text" name="name" id="name_form" required />
                    </div>
                    <div className=" w-2/4 ml-1 mb-2.5 flex text-xs text-slate-500 rounded-lg font-semibold" role="alert">
                        <ExclamationCircleIcon className={`size-4 transition-colors duration-300 ease-in-out ${isInvalidName ? 'text-red-800' : 'currentColor'}`} />
                        <p className={`ml-1 text-slate-400 transition-colors duration-300 ease-in-out ${isInvalidName ? '!text-red-600' : 'currentColor'}`}>It must contain only: 'a-z, A-Z, À-Ö, Ø-ö, ø-ÿ'.</p>
                    </div>
                    <div className='w-2/4 flex flex-col'>
                        <div className='mx-1 mb-1 flex items-center'>
                            <div className='flex gap-1'>
                                <EnvelopeIcon className='w-4.5 h-4.5 self-end text-slate-400' />
                                <LabelComponent htmlFor="mail_form">Email</LabelComponent>
                            </div>
                        </div>
                        <InputComponent maxLength={40} classPName={`${isInvalidEmail ? 'bg-red-900 bg-opacity-60 border-red-800' : 'currentColor'}`} value={email} onInput={InputChangedValue} placeholder='your@email.com' type="email" name="email" id="mail_form" required />
                    </div>
                    <div className=" w-2/4 ml-1 mb-2.5 flex text-xs text-slate-500 rounded-lg font-semibold" role="alert">
                        <ExclamationCircleIcon className={`size-4 transition-colors duration-300 ease-in-out ${isInvalidEmail ? 'text-red-800' : 'currentColor'}`} />
                        <p className={`ml-1 text-slate-400 transition-colors duration-300 ease-in-out ${isInvalidEmail ? '!text-red-600' : 'currentColor'}`}>It must be in the format: name@email.com, without spaces.</p>
                    </div>
                    <div className='w-2/4 flex flex-col'>
                        <div className='flex mb-1 mx-0.5 items-center justify-between'>
                            <div className='flex gap-1 items-center'>
                                <LockClosedIcon className='w-4.5 h-4.5 text-slate-400' />
                                <LabelComponent htmlFor="pass_form" >Password</LabelComponent>
                            </div>
                        </div>
                        <div className='flex relative'>
                            <InputComponent minLength={8} maxLength={20} classPName={`pr-8 ${isInvalidPass ? 'bg-red-900 bg-opacity-60 border-red-800' : 'currentColor'}`} value={pass} onInput={InputChangedValue} placeholder='RocketFlowBest' type={passType} name="password" id="pass_form" required></InputComponent>
                            {pass && <button className='absolute p-1 right-3 top-1/2 transform -translate-y-1/2 text-slate-400' onClick={() => passEyeVisibility()} type='button'>{passIsVisible ? (<EyeSlashIcon className=' size-5 '></EyeSlashIcon>) : (<EyeIcon className=' size-5 '></EyeIcon>)}</button>}
                        </div>
                    </div>
                    <div className='w-2/4 ml-1 mt-1 flex text-xs  text-slate-500 rounded-lg font-semibold' role="alert">
                        <ExclamationCircleIcon className={`size-4 transition-colors duration-300 ease-in-out ${isInvalidPass ? 'text-red-800' : 'currentColor'}`} />
                        <p className={`ml-1 text-slate-400 transition-colors duration-300 ease-in-out  ${isInvalidPass ? '!text-red-600' : 'currentColor'}`}>It must contain at least 8 characters.</p>
                    </div>
                    <div className='w-2/4 my-2'>
                        <div className='flex items-center ml-1 peer'>
                            <input type="checkbox" name="" id="terms_opt" className='peer size-4 cursor-pointer ' onChange={() => { setHasCkeckedTerms(!hasCheckedTerms) }} checked={hasCheckedTerms} required />
                            <label htmlFor='terms_opt' className='ml-2 text-slate-400 text-sm font-medium'>Do you agree to the <Link className='text-blue-600 hover:underline'>terms of service.</Link></label>
                        </div>
                    </div>
                    <ButtonComponent disabled={!validNameEmailAndPass}>Sign-up<ArrowRightCircleIcon className='size-5 text-current' /></ButtonComponent>
                </form>
                <ToastContainer />
            </main>
        </>
    )
}