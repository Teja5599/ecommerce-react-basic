import { createContext, useState } from "react";

export const AuthContext = createContext(null)

export default function AuthProvider({children}){

    const [user , setUser] = useState(localStorage.getItem("currentuser") ? {email : localStorage.getItem("currentuser")} : null)

    function signUp(email , password){
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        if(users.find(u => u.email === email)){
            return {success : false , error : "user already exists"};
        }
        
        const newUser = {email , password}
        users.push(newUser)
        localStorage.setItem("users" , JSON.stringify(users))
        localStorage.setItem("currentuser" , email)

        setUser({email})

        return {success : true}
    }

    function login(email , password){
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const user = users.find((u) => u.email === email && u.password === password)
        if(!user){
            return {success : false , error : "Invalid user or password"}
        }

        localStorage.setItem('currentuser' , email)
        setUser({email})

        return {success : true}
    }


    function logout(){
        localStorage.removeItem("currentuser")
        setUser(null)
    }
    return <AuthContext.Provider value={{signUp , user , logout , login}}>{children}</AuthContext.Provider>
}