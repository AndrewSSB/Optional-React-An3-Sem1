import { createContext, ReactNode, useContext } from "react"

type AuthProviderProps = {
    children: ReactNode
}

// type AuthProps = {
//     firstName : string,
//     email : string,
//     password : string, 
//     confirmPassword : string,
// }

type AuthContext = {
    checkPassword : (password : string, confirmPassword : string) => boolean;
    register : (firstName: string, email: string, password: string, confirmPassword: string ) => void;
    login : () => void;
}

const AuthContext = createContext({} as AuthContext)

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children} : AuthProviderProps){
    
    function checkPassword(password: string, confirmPassword: string) {
        console.log("CEVa")
        return password !== confirmPassword
    }

    function register(firstName: string, email: string, password: string, confirmPassword: string) {
        if (!firstName || !email || !password || !confirmPassword){
            console.log('all fields must be completed')
            return
        }
        if (checkPassword(password, confirmPassword)){
            console.log('password doesnt match')
            return
        }

        console.log('success')
        return
    }

    function login(){

    }

    return <AuthContext.Provider value={{
        checkPassword,
        register,
        login}}
    >
        {children}
    </AuthContext.Provider>
}