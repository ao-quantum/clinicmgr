'use client';

import { redirect } from 'next/navigation';
import { SubmitEvent, useState } from 'react'
import { setCookie } from 'cookies-next/client';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    // const [_cookie, setCookie] = useCookies(['session']);
    
    
    async function submitForm(e: SubmitEvent) {
        e.preventDefault();
        setError('');
        setNotice('');

        const form = new FormData(e.target);

        const email = form.get('email');
        const password = form.get('password');

        setNotice('Logging in...');
        
        const url = new URL('/auth/login', process.env.NEXT_PUBLIC_BACKEND_BASEURL);

        try {
            const res = await fetch(url.href, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();

            console.log(json);

            if (!json?.access_token) {
                setNotice('');
                setError(`An error occured: ${json.message}`);
                return;
            }

            setCookie('session', json.access_token);

            setNotice('Login Success! Sending to home page...');

            setTimeout(() => {
                redirect('/');
            }, 3000)
        } catch (e) {
            setError('An error occured')
            console.error(e);
            return;
        }        

    }

    return (
            <div>
                <h1>Login 2</h1>
                <form method="post" onSubmit={submitForm}>
                    <label htmlFor="email">E-Mail</label>
                    <input type="text" name="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />

                    <input type="submit" value="Submit" />
                </form>
                {notice ? <p>{notice}</p> : ""}
                {error ? <p>{error}</p> : ""}
            </div>
    )
}
