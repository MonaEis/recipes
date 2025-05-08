// import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, NavLink } from "react-router";
import "../styles/rezepte_page.css";
import { useQuery } from "@tanstack/react-query";

const RezeptePage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["all_recipes"],
        queryFn: async () => {
            const { data, error } = await supabase.from("recipes").select("*");
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
            {isError && <div>
                <p className="info_text">Leider kaputt...</p>
                <Link to="/">
                <button className="green_btn">zurück zu Home</button>
                </Link>
            </div>
            }

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
