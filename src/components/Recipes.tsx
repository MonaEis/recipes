import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { NavLink } from "react-router";
import "../styles/recipes.css";

export type Recipe = {
    category_id: string;
    created_at: string;
    description: string;
    id: string;
    imageUrl: string | null;
    instructions: string;
    name: string;
    rating: number | null;
    servings: number;
};

const Recipes = () => {
    const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
    const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [searchRecipe, setSearchRecipe] = useState<string>("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        supabase
            .from("recipes")
            .select("*")
            .order("rating", { ascending: false })
            .limit(3)
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setFavouriteRecipes(result.data);
                }setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true)
        supabase
            .from("recipes")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(3)
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setLatestRecipes(result.data);
                }setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true)
        supabase
            .from("recipes")
            .select("*")
            .ilike("name", `%${searchRecipe}%`)
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    setAllRecipes(result.data);
                    console.log("Test:", result.data);
                }setIsLoading(false);
            });
    }, [searchRecipe]);

    return (
        <article className="recipes">
            <input
                value={searchRecipe}
                onChange={(e) => setSearchRecipe(e.target.value)}
                type="search"
                name="search"
                id="search"
                placeholder="Rezept suchen"
            />
            {isLoading && <p className="info_text">Is Loading...</p>}
            
            {searchRecipe.length > 0 && allRecipes.length > 0 &&(
                <>
                    <h2>Gefundene Rezepte</h2>
                    <section className="latest">
                        {allRecipes.map((recipe) => (
                            <div className="tile">
                                <img
                                    src={recipe.imageUrl?.toString()}
                                    alt={recipe.name}
                                />
                                <div className="tile_text">
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.description}</p>
                                    <NavLink
                                        className="green_btn"
                                        to={`/rezepte/${recipe.id}`}
                                    >
                                        Zum Rezept
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </section>
                </>
            )}

            {searchRecipe.length === 0 && (
                <>
                    <h2>Die beliebtesten Rezepte</h2>
                    <section className="favourites">
                        {favouriteRecipes.map((recipe) => (
                            <div className="tile">
                                <img
                                    src={recipe.imageUrl?.toString()}
                                    alt={recipe.name}
                                />
                                <div className="tile_text">
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.description}</p>
                                    <NavLink
                                        className="green_btn"
                                        to={`/rezepte/${recipe.id}`}
                                    >
                                        Zum Rezept
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </section>
                    <h2>Neueste Rezepte</h2>
                    <section className="latest">
                        {latestRecipes.map((recipe) => (
                            <div className="tile">
                                <img
                                    src={recipe.imageUrl?.toString()}
                                    alt={recipe.name}
                                />
                                <div className="tile_text">
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.description}</p>
                                    <NavLink
                                        className="green_btn"
                                        to={`/rezepte/${recipe.id}`}
                                    >
                                        Zum Rezept
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </section>
                </>
            )}
            {searchRecipe.length > 0 && allRecipes.length === 0 && (
                <p className="info_text">Keine Rezepte gefunden</p>
            )}
        </article>
    );
};

export default Recipes;
