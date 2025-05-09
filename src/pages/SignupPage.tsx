import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import "../styles/signup_page.css";
import { Link } from "react-router";

export function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        // const supabase = createClient();
        e.preventDefault();
        setError(null);

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            setSuccess(true);
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : "An error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup_page">
            {success ? (
                <section>
                    <div>
                        <h2 >
                            Danke für deine Anmeldung!
                        </h2>
                        <p>
                            Überprüfe dein Postfach und bestätige deine E-Mail
                        </p>
                    </div>
                    <div>
                        <p>
                        Du hast dich erfolgreich registriert. Bitte überprüfe deine E-Mails, um dein Konto zu bestätigen, bevor du dich einloggst.
                        </p>
                    </div>
                </section>
            ) : (
                <section>
                    <article>
                        <h2>Sign up</h2>
                        <p>Lege ein neues Konto an</p>
                    </article>
                    <div>
                        <form onSubmit={handleSignUp}>
                            <div>
                                <div>
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <div>
                                        {/* <label htmlFor="password">
                                            Passwort
                                        </label> */}
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder="Passwort"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <div>
                                        {/* <label htmlFor="repeat-password">
                                            Passwort wiederholen
                                        </label> */}
                                    </div>
                                    <input
                                        id="repeat-password"
                                        type="password"
                                        required
                                        placeholder="Passwort wiederholen"
                                        value={repeatPassword}
                                        onChange={(e) =>
                                            setRepeatPassword(e.target.value)
                                        }
                                    />
                                </div>
                                {error && (
                                    <p className="error">
                                        {error}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="green_btn"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Creating an account..."
                                        : "Sign up"}
                                </button>
                            </div>
                            <div className="login_link">
                                Du hast schon einen Account?{" "}
                                <Link
                                    to="/login"
                
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </div>
    );
}
