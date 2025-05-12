import "../styles/profil_page.css";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/auth-context";

export function ProfilPage() {

    const { session } = useAuthContext();
    console.log(session)

    const navigate = useNavigate();

    const { data, isError, isPending } = useQuery({
        queryFn: async () => {
            // const {
            //     data: { user },
            //     error: userError,
            // } = await supabase.auth.getUser();

            // if (userError) throw userError;
            if (!session?.user) throw new Error("Kein eingeloggter Benutzer.");

            const { data, error} = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if (error) throw error;

            return data;
        },
        queryKey: ["profile"],
    });

    // if (isPending) return <p>Lade...</p>;
    // if (isError) return <p>Fehler beim Laden.</p>;
    if(!session) {
        navigate("/");
    }


    return (
        <section className="profil">
            <h2>Dein Profil bei Löffelgrün</h2>
            {data && <div>
                <p>Vorname: <span>{data.first_name}</span></p>
                <p>Nachname: <span>{data.last_name}</span></p>
                <p>
                    Profil erstellt: <span>{session?.user.created_at && new Date(session.user.created_at).toLocaleString()}</span>
                    
                </p>
                <p>
                    Zuletzt geändert: <span>{data.updated_at && new Date(data.updated_at).toLocaleString()}</span>
                    
                </p>
                <p>
                    Zuletzt eingeloggt: <span>{session?.user.last_sign_in_at && new Date(session.user.last_sign_in_at).toLocaleString()}</span>
                    
                </p>
            </div>}

            {isPending && <p className="info_text">Is Loading...</p>}
            {isError && <div>
                <p className="info_text">Leider kaputt...</p>
                <Link to="/">
                <button className="green_btn">zurück zu Home</button>
                </Link>
            </div>
            }
            
            
        </section>
    );
}

export default ProfilPage;
