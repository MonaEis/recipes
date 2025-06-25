import "../styles/rezept_detail_page.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
// import heartIcon from "../assets/img/heart.svg";
import { useAuthContext } from "../context/auth-context";

type RecipeDetail = {
    category_id: string;
    created_at: string;
    description: string;
    id: string;
    user_id: string;
    imageUrl: string | null;
    instructions: string;
    name: string;
    rating: number | null;
    servings: number;
    ingredients: {
        additional_info?: string | null;
        created_at?: string | null;
        id?: string;
        name?: string;
        quantity?: number | null;
        recipe_id?: string;
        unit?: string | null;
    }[];
    categories: {
        created_at: string;
        id: string;
        name: string;
    };
    recipe_favorites: {
        created_at: string;
        id: string;
        recipe_id: string;
        user_id: string;
    }[];
};

const RezeptDetailPage = () => {
    const id = useParams().id!;
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { session } = useAuthContext();

    // alternative zu usestate:
    // const isFavorite2 = recipe?.recipe_favorites.length ?? 0 > 0;

    useEffect(() => {
        supabase
            .from("recipes")
            .select("*, ingredients(*), categories(*), recipe_favorites(*)")
            .eq("id", id)
            .single()
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setRecipe(result.data);
                    setIsFavorite(result.data.recipe_favorites.length > 0);
                }
            });
    }, [id]);
    // console.log(recipe[0])
    // console.log(recipe[0].ingredients)

    const handleChange = () => {
        navigate("/neuesrezept");
    };

    const handleDelete = () => {
        supabase
            .from("recipes")
            .delete()
            .eq("id", id)
            .then(() => {
                navigate("/rezepte");
            });
    };

    const handleFavorite: React.MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        e.preventDefault();

        if (!session?.user?.id) {
            alert("Du musst eingeloggt sein.");
            return;
        }

        if (isFavorite) {
            const { error } = await supabase
                .from("recipe_favorites")
                .delete()
                .eq("recipe_id", id)
                .eq("user_id", session.user.id);

            if (!error) {
                setIsFavorite(false);
            } else {
                console.error(
                    "Fehler beim Entfernen des Favoriten:",
                    error.message
                );
            }
        } else {
            const { error } = await supabase
                .from("recipe_favorites")
                .insert({ recipe_id: id, user_id: session.user.id });

            if (!error) {
                setIsFavorite(true);
            } else {
                console.error(
                    "Fehler beim Hinzufügen zum Favoriten:",
                    error.message
                );
            }
        }
    };

    return (
        <article className="recipe_detail">
            {recipe === null && <p>Is Loading...</p>}

            {recipe !== null && (
                <div key={recipe.id}>
                    <section className="header">
                        <div className="image-container">
                            <img
                                src={recipe.imageUrl?.toString()}
                                alt={recipe.name}
                            />
                            <h1 className="overlay-text">{recipe.name}</h1>
                        </div>
                    </section>
                    <section className="intro">
                        <h2>
                            ein schönes Rezept aus der Kategorie:{" "}
                            {recipe.categories.name}
                        </h2>
                        <h2>{recipe.rating} Sterne Bewertung</h2>
                    </section>
                    <section className="ingridients">
                        <h2>Zutaten</h2>
                        <ul>
                            {recipe.ingredients.map((ingridient) => (
                                <li key={ingridient.id}>
                                    {ingridient.quantity} {ingridient.unit}{" "}
                                    {ingridient.name}{" "}
                                    <em>{ingridient.additional_info}</em>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="instructions">
                        <h2>Zubereitung</h2>
                        <p>{recipe.instructions}</p>
                    </section>
                    <section className="additional_info">
                        <h2>Das Rezept ist für</h2>
                        <p>{recipe.servings} Portion(en)</p>
                    </section>

                    <section className="buttons">
                        {recipe?.user_id === session?.user?.id && (
                            <div>
                                <button
                                    onClick={handleChange}
                                    className="green_btn"
                                >
                                    Ändern
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="green_btn"
                                >
                                    Löschen
                                </button>
                            </div>
                        )}

                        {isFavorite && (
                            <button
                                className="favoriten_btn_active"
                                onClick={handleFavorite}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-heart-plus-icon lucide-heart-plus"
                                >
                                    <path d="M13.5 19.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5A5.5 5.5 0 0 1 7.5 3c1.76 0 3 .5 4.5 2 1.5-1.5 2.74-2 4.5-2a5.5 5.5 0 0 1 5.402 6.5" />
                                    <path d="M15 15h6" />
                                    <path d="M18 12v6" />
                                </svg>
                            </button>
                        )}
                        {!isFavorite && (
                            <button
                                className="favoriten_btn_inactive"
                                onClick={handleFavorite}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-heart-plus-icon lucide-heart-plus"
                                >
                                    <path d="M13.5 19.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5A5.5 5.5 0 0 1 7.5 3c1.76 0 3 .5 4.5 2 1.5-1.5 2.74-2 4.5-2a5.5 5.5 0 0 1 5.402 6.5" />
                                    <path d="M15 15h6" />
                                    <path d="M18 12v6" />
                                </svg>
                            </button>
                        )}
                    </section>
                </div>
            )}
        </article>
    );
};

export default RezeptDetailPage;
