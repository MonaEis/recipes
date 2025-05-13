import { supabase } from "../lib/supabaseClient";
import { Link, NavLink } from "react-router";
import "../styles/rezepte_page.css";
import { useQuery } from "@tanstack/react-query";

const RezeptePage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["all_recipes"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("recipes")
                .select("*, recipe_favorites(*)");
            if (error) {
                throw new Error(error.message);
            }
            if (data) {
                return data;
            }
        },
    });

    return (
        <article className="all_recipes">
            {isLoading && <p className="info_text">Is Loading...</p>}
            {isError && (
                <div>
                    <p className="info_text">Leider kaputt...</p>
                    <Link to="/">
                        <button className="green_btn">zurück zu Home</button>
                    </Link>
                </div>
            )}

            {!isLoading && data && (
                <>
                    <h2>Alle Rezepte auf einen Blick</h2>
                    <section className="recipe">
                        {data.map((recipe) => (
                            <div key={recipe.id} className="tile">
                                <img
                                    src={recipe.imageUrl?.toString()}
                                    alt={recipe.name}
                                />
                                <div className="tile_text">
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.description}</p>
                                    <div className="buttons">
                                        <NavLink
                                            className="green_btn"
                                            to={`/rezepte/${recipe.id}`}
                                        >
                                            Zum Rezept
                                        </NavLink>
                                        {recipe.recipe_favorites.length > 0 && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-heart-icon lucide-heart"
                                            >
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </>
            )}
        </article>
    );
};

export default RezeptePage;

// const RezeptePage = () => {
//     const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         setIsLoading(true);
//         supabase
//             .from("recipes")
//             .select("*")
//             .then((result) => {
//                 console.log(result.data);
//                 if (result.data) {
//                     setAllRecipes(result.data);
//                     console.log("Test:", result.data);
//                 }
//                 setIsLoading(false);
//             });
//     }, []);

//     return (
//         <article className="all_recipes">
//             {isLoading && <p className="info_text">Is Loading...</p>}

//             {!isLoading && (
//                 <>
//                     <h2>Alle Rezepte auf einen Blick</h2>
//                     <section className="recipe">
//                         {allRecipes.map((recipe) => (
//                             <div className="tile">
//                                 <img
//                                     src={recipe.imageUrl?.toString()}
//                                     alt={recipe.name}
//                                 />
//                                 <div className="tile_text">
//                                     <h4>{recipe.name}</h4>
//                                     <p>{recipe.description}</p>
//                                     <NavLink
//                                         className="green_btn"
//                                         to={`/rezepte/${recipe.id}`}
//                                     >
//                                         Zum Rezept
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         ))}
//                     </section>
//                 </>
//             )}
//         </article>
//     );
// };

// export default RezeptePage;
