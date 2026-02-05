import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Auth = () => {

    const[mode , setMode] = useState("signup")
    const{register , formState : {errors} , handleSubmit} = useForm()
    const{signUp , login} = useAuth()
    const[error , setError] = useState(null)
    const navigate = useNavigate()

    function onSubmit(data){
        setError(null)
        let res;
        if(mode === "signup"){
            res = signUp(data.email , data.password);

        }
        else{
            res = login(data.email , data.password);
        }
        if(res.success){
            navigate("/")
        }
        else{
            setError(res.error);
        }
        
    }
  return (
    <div className='page'>
        <div className='container'>
            <div className="auth-container">

                
              
                <h1 className='page-title'>
                    {mode === "signup" ? 'Sign Up' : "Login"}
                </h1>

                <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                    {error && <div className='error-message'>{error}</div>}
                    <div className='form-group'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type="email" className='form-input' id='email'
                            {...register("email" , {required : "Email is required"})}
                        />
                        {errors.email && <span className='form-error'>{errors.email.message}</span>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input
                            {...register("password" , {required : "Password is required" ,
                                minLength : {
                                    value : 6,
                                    message : 'Password must have 6 characters'
                                } , 
                                maxLength : {
                                    value : 12,
                                    message : 'Password must less than 12 characters'
                                }
                            })}
                            type="password" className='form-input' id='password'
                        />
                        {errors.password && <span className='form-error'>{errors.password.message}</span>}
                    </div>

                    <button type='submit' className='btn btn-primary btn-large'>{mode === "signup" ? 'Sign Up' : "Login"}</button>
                </form>

                <div className="auth-switch">
                    {mode === "signup" ? (
                        <p>Already have an account? <button type="button" onClick={()=>setMode("login")} className='auth-link'>Login</button></p>
                         
                    ) : (
                        <p>Don't have an account? <button type="button" onClick={()=>setMode("signup")} className='auth-link'>Sign Up</button></p>
                    )}
                   
                </div>
            </div>
        </div>
    </div>
  )
}



export default Auth