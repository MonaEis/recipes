import "../styles/rezept_detail_page.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";

type RecipeDetail = {
    category_id: string;
    created_at: string;
    description: string;
    id: string;
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
    };
};

const RezeptDetailPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeDetail[]>([]);

    useEffect(() => {
        supabase
            .from("recipes")
            .select("*, ingredients(*)")
            .eq("id", id)
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setRecipe(result.data);
                }
            });
    }, [id]);

    return (
        <article className="recipe_detail">
            {recipe.map((recipe) => (
                <>
                    <section className="header">
                        <div className="image-container">
                            <img
                                src={recipe.imageUrl?.toString()}
                                alt={recipe.name}
                            />
                            <h1 className="overlay-text">{recipe.name}</h1>
                        </div>
                    </section>
                    <section className="ingridients">
                        <h2>Zutaten</h2>
                        <ul>
                            {recipe.ingredients.map((ingridient) => (
                                <li>
                                    {ingridient.quantity} {ingridient.unit}{" "}
                                    {ingridient.name}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="instructions">
                        <h2>Zubereitung</h2>
                        <p>{recipe.instructions}</p>
                    </section>
                    <section className="additional_info">
                        <h2>Zusätzliche Informationen</h2>
                        <p>{recipe.ingredients.additional_info}</p>
                    </section>
                </>
            ))}
        </article>
    );
};

export default RezeptDetailPage;
