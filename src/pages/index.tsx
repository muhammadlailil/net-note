import Auth from "@/libs/Auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Index() {
    const router = useRouter()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        if (form.username && form.password) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [form])
    const handleFormChange = (event: any) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const login = async (e: any) => {
        e.preventDefault()
        if (new Auth().login(form)) {
            router.push('/project')
        } else {
            alert('Wrong way')
        }
    }

    return (
        <>
            <Head>
                <title>Project Note</title>
            </Head>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    <form method="POST" onSubmit={(e) => login(e)}>
                        <div className="text-center mb-5">
                            <h1 className="text-sub-heading font-inter-bold mb-2">Welcome</h1>
                            <p className="text-caption">
                                Hello there! Thank you for trying the experimental of “project note”.
                                Please, contact <a href="https://t.me/alvathoni" className="text-primary underline" target="_blank">@alvathoni</a> to get access.
                            </p>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="" className="text-caption text-dark-grey">Username</label>
                            <input type="text"
                                name="username"
                                value={form.username}
                                onChange={(e) => handleFormChange(e)}
                                className="border rounded-xl mt-2 w-full focus:outline-primary text-sm font-inter-regular px-3 py-2" placeholder="Username ..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-caption text-dark-grey">Password</label>
                            <input type="password"
                                name="password"
                                value={form.password}
                                onChange={(e) => handleFormChange(e)}
                                className="border rounded-xl mt-2 w-full focus:outline-primary text-sm font-inter-regular px-3 py-2" placeholder="Password ..."
                            />
                        </div>
                        <button type="submit"
                            disabled={disable}
                            className="w-full justify-center disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md bg-primary px-4 py-2 text-base font-medium text-white mt-5 shadow-sm">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}