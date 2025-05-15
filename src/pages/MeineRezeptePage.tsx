import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useAuthContext } from "../context/auth-context";
import "../styles/meine_rezepte_page.css";
const MeineRezeptePage = () => {
    const { session } = useAuthContext();
    
    const { data, isError, isPending } = useQuery({
        queryKey: ["recipe_favorites"],
        queryFn: async () => {
            const result = await supabase
                .from("recipe_favorites")
                .select("*, recipes(*)")
                .eq("user_id", session!.user.id);
                console.log(result.data)
            if (result.error) {
                throw result.error;
            }
            if (result.data) {
                return result.data;
            }
        },
    });
    if (isPending) {
        return "Loading Messages...";
    }

    if (isError) {
        return "Error";
    }

    
    return (
        <article className="recipe_favorites">
            <h2>Meine Rezept Favoriten</h2>
            <section className="favorites">
                {data &&
                    data.map((favorite) => (
                        <div key={favorite.recipe_id} className="tile">
                            <img
                                src={favorite.recipes.imageUrl?.toString()}
                                alt={favorite.recipes.name}
                            />
                            <div className="tile_text">
                                <h4>{favorite.recipes.name}</h4>
                                <p>{favorite.recipes.description}</p>
                                <NavLink
                                    className="green_btn"
                                    to={`/rezepte/${favorite.recipe_id}`}
                                >
                                    Zum Rezept
                                </NavLink>
                            </div>
                        </div>
                    ))}
            </section>
        </article>
    );
};

export default MeineRezeptePage;
