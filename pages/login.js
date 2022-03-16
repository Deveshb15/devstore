import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Login = () => {

    const { user, login } = useAuth()
    const router = useRouter()

    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState(null)

    const handleLogin = async(e) => {
        e.preventDefault()

        try {

            await login(data.email, data.password)
            router.push('/dashboard')
        } catch(err) {
            console.log(err)
            setError('User doesn\'t exist')
        }

        // console.log(data)
    }    

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="w-full max-w-xs">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input 
                        onChange={(e) => setData({
                            ...data, 
                            email: e.target.value
                        })} 
                        value={data.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" required />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        onChange={(e) => setData({
                            ...data,
                            password: e.target.value
                        })}
                        value={data.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" required />
                        {error && <p className="text-red-500 text-xs italic">{error}.</p>}
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;LOLOLOL.
                </p>
            </div>
        </div>
    )
}

export default Login