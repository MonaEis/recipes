import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router";
import "../styles/neues_rezept_page.css";

const NeuesRezeptPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [servings, setServings] = useState("");
    const [instructions, setInstructions] = useState("");
    const [category, setCategory] = useState("");
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log({
            name,
            description,
            servings,
            instructions,
            category_id: category,
        });

        if (
            name.trim().length === 0 ||
            description.trim().length === 0 ||
            servings.trim().length === 0 ||
            instructions.trim().length === 0 ||
            !category
        ) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        setIsPending(true);
        supabase
            .from("recipes")
            .insert([
                {
                    name,
                    description,
                    servings: parseInt(servings),
                    instructions,
                    category_id: category,
                },
            ])
            .select("id")
            .single()
            .then((result) => {
                console.log("DATA", result);
                setIsPending(false);
                if (result.data) {
                    const data = result.data;

                    setName("");
                    setDescription("");
                    setServings("");
                    setInstructions("");
                    setCategory("");
                    navigate(`/rezepte/${data.id}`);
                }
            });
    };

    return (
        <section className="neues_rezept">
            <h2>Neues Rezept erstellen</h2>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Rezeptname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    <option value="" defaultValue="Mittagessen" disabled hidden>
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
                <button
                    className="green_btn"
                    disabled={isPending}
                    onClick={handleSubmit}
                    type="submit"
                >
                    Speichern
                </button>
            </form>
        </section>
    );
};

export default NeuesRezeptPage;
