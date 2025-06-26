import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router";
import "../styles/neues_rezept_page.css";
import { produce } from "immer";
import { useAuthContext } from "../context/auth-context";
import { useParams } from "react-router";
import { useEffect } from "react";

const NeuesRezeptPage = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [servings, setServings] = useState("");
    const [instructions, setInstructions] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPending, setIsPending] = useState(false);
    const { session } = useAuthContext();

    console.log(id);

    type Ingredient = {
        name: string;
        quantity: string;
        unit: string;
        additionalInfo: string;
    };
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const handleAddIngredientClick = () => {
        const emptyIngredient = {
            name: "",
            quantity: "",
            unit: "",
            additionalInfo: "",
        };
        // * wir verwenden hier die arrow syntax, da wir auf dem bestehenden state aufbauen
        setIngredients((oldIngredients) => [
            ...oldIngredients,
            emptyIngredient,
        ]);
    };

    const handleDeleteIngredientClick = (index: number) => {
        setIngredients((oldIngredients) =>
            oldIngredients.filter((_, i) => i !== index)
        );
    };

    const updateIngredients = async () => {
        if (!id) {
            console.warn(
                "Kein Rezept-ID vorhanden – Zutaten können nicht aktualisiert werden."
            );
            return;
        }

        //* alte ingredients Löschen
        const { error: deleteError } = await supabase
            .from("ingredients")
            .delete()
            .eq("recipe_id", id);
        if (deleteError) {
            console.error(
                "Fehler beim Löschen der alten Zutaten:",
                deleteError
            );
            return;
        }

        if (ingredients.length === 0) {
            console.log("Keine neuen Zutaten zum Einfügen.");
            return;
        }

        //* neue ingredients einfügen
        const preparedIngredients = ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            additional_info: ingredient.additionalInfo,
            recipe_id: id,
        }));

        const { error: insertError } = await supabase
            .from("ingredients")
            .insert(preparedIngredients);

        if (insertError) {
            console.error(
                "Fehler beim Einfügen der neuen Zutaten:",
                insertError
            );
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log({
            name,
            description,
            servings,
            instructions,
            category_id: category,
            imageUrl,
        });

        if (
            name.trim().length === 0 ||
            description.trim().length === 0 ||
            servings.trim().length === 0 ||
            instructions.trim().length === 0 ||
            imageUrl.trim().length === 0 ||
            !category
        ) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }
        setIsPending(true);

        if (id) {
            //*Update von Daten
            const { error: updateError } = await supabase
                .from("recipes")
                .update({
                    name,
                    description,
                    servings: parseInt(servings),
                    instructions,
                    category_id: category,
                    imageUrl,
                })
                .eq("id", id);

            if (updateError) {
                console.error(updateError);
                return;
            }
            await updateIngredients();
            navigate(`/rezepte/${id}`);
        } else {
            supabase
                .from("recipes")
                .insert([
                    {
                        name,
                        description,
                        servings: parseInt(servings),
                        instructions,
                        category_id: category,
                        imageUrl,
                        user_id: session!.user.id,
                    },
                ])
                .select("id")
                .single()
                .then((result) => {
                    console.log("DATA", result);
                    setIsPending(false);
                    if (result.data) {
                        const recipeId = result.data.id;
                        // * AB HIER HABEN WIR DIE FRISCH ERSTELLE RECIPE ID

                        const preparedIngredients = ingredients.map(
                            (ingredient) => ({
                                name: ingredient.name,
                                quantity: ingredient.quantity,
                                unit: ingredient.unit,
                                additional_info: ingredient.additionalInfo,
                                recipe_id: recipeId,
                            })
                        );

                        supabase
                            .from("ingredients")
                            .insert(preparedIngredients)
                            .then((response) => {
                                if (response.error) {
                                    console.error(response.error);

                                    // delete recipe if ingredient insertion fails
                                    supabase
                                        .from("recipes")
                                        .delete()
                                        .eq("id", recipeId);
                                } else {
                                    navigate(`/rezepte/${recipeId}`);
                                }
                            });
                    }
                });
        }
    };

    useEffect(() => {
        console.log(`Aktuelle ID aus Params: ${id}`);

        if (!id) return;

        const isValidUUID =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                id
            );
        if (!isValidUUID) return;

        const fetchRecipe = async () => {
            const { data, error } = await supabase
                .from("recipes")
                .select("*, ingredients(*)")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Fehler beim Laden:", error);
                alert("Fehler beim Laden des Rezepts.");
                return;
            }

            if (data) {
                setName(data.name || "");
                setDescription(data.description || "");
                setImageUrl(data.imageUrl || "");
                setInstructions(data.instructions || "");
                setServings(data.servings?.toString() || "");
                setCategory(data.category_id || "");

                setIngredients(
                    (data.ingredients || []).map((ingredient) => ({
                        name: ingredient.name || "",
                        quantity: ingredient.quantity?.toString() || "",
                        unit: ingredient.unit || "",
                        additionalInfo: ingredient.additional_info || "",
                    }))
                );
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <section className="neues_rezept">
            <h2>{id ? "Rezept bearbeiten" : "Neues Rezept erstellen"}</h2>
            <form>
                <section>
                    <input
                        type="text"
                        name="name"
                        placeholder="Rezeptname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="ImageUrl"
                        placeholder="URL zum Bild"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <br />
                    <textarea
                        name="description"
                        placeholder="Beschreibung"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <input
                        type="number"
                        name="servings"
                        placeholder="Anzahl der Portionen"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                    />
                    <br />
                    <textarea
                        name="instruction"
                        placeholder="Anleitung"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                    <br />
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option
                            value=""
                            defaultValue="Mittagessen"
                            disabled
                            hidden
                        >
                            Kategorie wählen
                        </option>
                        <option value="127bd0ef-0679-4f84-a9e6-02428f77ed2b">
                            Snack
                        </option>
                        <option value="44d4e364-8bcb-4175-9d0b-2a6825b7a889">
                            Dessert
                        </option>
                        <option value="5324189d-0a3d-4dd0-83cb-69e10d0e4de4">
                            Abendessen
                        </option>
                        <option value="67d38576-fdbb-4025-a46a-62eb0b262084">
                            Mittagessen
                        </option>
                        <option value="cf38b579-0599-4ae0-9d9b-9be0216b19ba">
                            Frühstück
                        </option>
                    </select>
                    <br />
                </section>

                <section>
                    <h3>Zutaten</h3>
                    <div className="neues_rezept__ingredients">
                        {ingredients.map((ingredient, ingredientIndex) => {
                            return (
                                <div className="neues_rezept__ingredient_inputs"
                        
                                    key={ingredientIndex}
                                >
                                    <div className="neues_rezept__ingredient">
                                        <input
                                        type="text"
                                        name="ingredientname"
                                        placeholder="Name der Zutat"
                                        value={ingredient.name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const newIngredient = {
                                                ...ingredient,
                                                name: value,
                                            };
                                            const newIngredients = [
                                                ...ingredients,
                                            ];
                                            newIngredients[ingredientIndex] =
                                                newIngredient;
                                            setIngredients(newIngredients);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="ingredientquantity"
                                        placeholder="Menge"
                                        value={ingredient.quantity}
                                        onChange={(e) => {
                                            setIngredients((oldIngredients) => {
                                                const newIngredients = [
                                                    ...oldIngredients,
                                                ];
                                                newIngredients[
                                                    ingredientIndex
                                                ] = {
                                                    ...ingredient,
                                                    quantity: e.target.value,
                                                };
                                                return newIngredients;
                                            });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="ingredientunit"
                                        placeholder="Einheit (Gramm, Stk., TL ...)"
                                        value={ingredient.unit}
                                        onChange={(e) => {
                                            const newIngredients = produce(
                                                ingredients,
                                                (draft) => {
                                                    draft[
                                                        ingredientIndex
                                                    ].unit = e.target.value;
                                                }
                                            );

                                            setIngredients(newIngredients);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="ingredientinfo"
                                        placeholder="Zusatzinfos"
                                        value={ingredient.additionalInfo}
                                        onChange={(e) => {
                                            setIngredients((oldIngredients) =>
                                                produce(
                                                    oldIngredients,
                                                    (draft) => {
                                                        draft[
                                                            ingredientIndex
                                                        ].additionalInfo =
                                                            e.target.value;
                                                    }
                                                )
                                            );
                                        }}
                                    />
                                    </div>
                                    
                                    

                                    <button
                                        className="green_btn delete_btn"
                                        type="button"
                                        onClick={() =>
                                            handleDeleteIngredientClick(
                                                ingredientIndex
                                            )
                                        }
                                    >
                                        Zutat löschen
                                    </button>
                                    
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="buttons">
                    <button
                        className="green_btn"
                        onClick={handleAddIngredientClick}
                        type="button"
                    >
                        Zutat hinzufügen
                    </button>

                    <button
                        className="green_btn"
                        disabled={isPending}
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Speichern
                    </button>
                </section>
            </form>
        </section>
    );
};

export default NeuesRezeptPage;
