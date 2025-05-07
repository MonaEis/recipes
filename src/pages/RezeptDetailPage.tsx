import "../styles/rezept_detail_page.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
    }[];
    categories: {
        created_at: string;
        id: string;
        name: string;
    };
};

const RezeptDetailPage = () => {
    const id = useParams().id!;
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeDetail[]>([]);

    useEffect(() => {
        supabase
            .from("recipes")
            .select("*, ingredients(*), categories(*)")
            .eq("id", id)
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setRecipe(result.data);
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

    return (
        <article className="recipe_detail">
            {recipe.map((recipe) => (
                <div key={recipe.id} >
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
                                <li>
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
                        <h2>Zusätzliche Informationen</h2>
                        <p>{recipe.servings} Portionen</p>
                    </section>
                    <section className="buttons">
                        <button onClick={handleChange} className="green_btn">
                            Ändern
                        </button>
                        <button onClick={handleDelete} className="green_btn">
                            Löschen
                        </button>
                    </section>
                </div>
            ))}
        </article>
    );
};

export default RezeptDetailPage;
