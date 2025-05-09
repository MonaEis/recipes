import React, { useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/auth-context";
import "../styles/login_page.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);
    const { session, signOut } = useAuthContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = await supabase.auth.signInWithPassword({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });

        if (result.error) {
            console.error(result.error);
            alert("Passwort oder Email falsch");
        } else {
            navigate("/");
        }

        

    };
    return (
        <section className="login_page">
            {!session && (
                <>
                    <h2>Hier können Sie sich anmelden</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            placeholder="Email eingeben"
                            ref={emailRef}
                        />
                        
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Passwort eingeben"
                            ref={passwordRef}
                        />
                        
                        <button type="submit" className="green_btn signin_btn">
                            Anmelden
                        </button>
                        
                        <Link to="#" className="password_link">Passwort vergessen</Link>
                        <p className="signup_link">Du hast keinen Account? <Link to="/signup">Sign up</Link></p>
                    </form>
                </>
            )}
            <div>
                {session && (
                    <div>
                        <h2>Aktuell angemeldet als {session.user.email} </h2>
                        <div onClick={signOut} className="logout_btn">Ausloggen</div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LoginPage;
