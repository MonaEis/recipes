// import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { NavLink } from "react-router";
import "../styles/rezepte_page.css";
import { useQuery } from "@tanstack/react-query";

const RezeptePage = () => {


    const { data, isLoading, isError } = useQuery({
        queryKey: ["all_recipes"],
        queryFn: () =>
            supabase
                .from("recipes")
                .select("*")
                .then((result) => {
                    console.log(result.data);
                    if (result.data) {
                        return result.data;
                    } else {
                        throw result.error;
                    }
                }),
    });

    return (
        <article className="all_recipes">
            {isLoading && <p className="info_text">Is Loading...</p>}
            {isError && <p className="info_text">Leider kaputt...</p>}

            {!isLoading && (
                <>
                    <h2>Alle Rezepte auf einen Blick</h2>
                    <section className="recipe">
                        {data.map((recipe) => (
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
