import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";


const RegisterUser = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
            updateProfile(newUser.user, { displayName: name || 'Unknown' });
        })
    } catch (error) {
        throw error
    }
}

const SignInUser = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error('Erro ao fazer o login', error);
        throw error
    }
}

const SignOutUser = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error('Não foi possivel deslogar...', error)
        throw error
    }
}


export { RegisterUser, SignInUser, SignOutUser };