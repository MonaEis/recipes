import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export function ProfilPage() {
    const { data, isError, isPending } = useQuery({
        queryFn: async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) throw userError;
            if (!user) throw new Error("Kein eingeloggter Benutzer.");

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) throw error;

            return data;
        },
        queryKey: ["profile"],
    });

    if (isPending) return <p>Lade...</p>;
    if (isError) return <p>Fehler beim Laden.</p>;

    return (
        <section className="profil">
             <h2>Dein Profil bei Löffelgrün</h2>
            <div>
                <h2>{data.first_name}</h2>
                <p>{data.last_name}</p>
            </div>
        </section>
    );
}

export default ProfilPage;
