import "../styles/profil_page.css";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/auth-context";
import { useRef, useState } from "react";
import { getStorageURL } from "../lib/utils";

const rotateSound = new Audio("/audio/pedro_rotation.mp3");

export function ProfilPage() {
    const navigate = useNavigate();

    const [clickCount, setClickCount] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { session } = useAuthContext();
    console.log(session);

    const { data, isError, isPending, refetch } = useQuery({
        queryFn: async () => {
            if (!session?.user) throw new Error("Kein eingeloggter Benutzer.");

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if (error) throw error;

            return data;
        },
        queryKey: ["profile"],
    });

    if (!session) {
        navigate("/");
    }

    const handleUpload = async (event: React.MouseEvent) => {
        event.preventDefault();
        setImageUpload(null);
        if (!session) {
            console.error("Kein eingeloggter Benutzer.");
            return;
        }

        let imagePath: string | null = null;

        if (imageUpload) {
            const uploadResult = await supabase.storage
                .from("profile-photos")
                .upload(
                    `${session?.user.id}/${crypto.randomUUID()}`,
                    imageUpload,
                    { upsert: true }
                );

            imagePath = uploadResult.data?.fullPath ?? null;
        }

        supabase
            .from("profiles")
            .update({
                first_name: data?.first_name,
                last_name: data?.last_name,
                profilePhoto_url: imagePath,
            })
            .eq("id", session.user.id)
            .then(() => {
                setImageUpload(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Input zurücksetzen
                }
                refetch();
            });
    };

    return (
        <section className="profil">
            <h2>Dein Profil bei Löffelgrün</h2>
            {data && (
                <div>
                    {data.profilePhoto_url && (
                        <div className="profile_photo">
                            <img
                                src={getStorageURL(data.profilePhoto_url)}
                                alt={`Profilbild_${data.id}`}
                                className={isRotating ? "rotate-animation" : ""}
                                onClick={() => {
                                    const newCount = clickCount + 1;
                                    setClickCount(newCount);

                                    if (newCount === 5) {
                                        setIsRotating(false); // Falls noch aktiv, zurücksetzen
                                        void rotateSound.play(); // Audio abspielen
                                    
                                        // Kurze Verzögerung, damit die Klasse entfernt wurde
                                        setTimeout(() => {
                                            setIsRotating(true); // Animation neu starten
                                            setClickCount(0);
                                    
                                            setTimeout(() => {
                                                setIsRotating(false); // Nach 15s wieder aus
                                            }, 15000); // 15 Sekunden = 15000ms
                                        }, 50);
                                    }
                                }}
                            />
                        </div>
                    )}
                    <p>
                        Vorname: <span>{data.first_name}</span>
                    </p>
                    <p>
                        Nachname: <span>{data.last_name}</span>
                    </p>
                    <p>
                        Profil erstellt:{" "}
                        <span>
                            {session?.user.created_at &&
                                new Date(
                                    session.user.created_at
                                ).toLocaleString()}
                        </span>
                    </p>
                    <p>
                        Zuletzt geändert:{" "}
                        <span>
                            {data.updated_at &&
                                new Date(data.updated_at).toLocaleString()}
                        </span>
                    </p>
                    <p>
                        Zuletzt eingeloggt:{" "}
                        <span>
                            {session?.user.last_sign_in_at &&
                                new Date(
                                    session.user.last_sign_in_at
                                ).toLocaleString()}
                        </span>
                    </p>
                    <form className="image_upload">
                        <input
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setImageUpload(file);
                            }}
                        />
                        <button
                            type="submit"
                            className="green_btn"
                            onClick={handleUpload}
                            disabled={!imageUpload}
                        >
                            Upload
                        </button>
                    </form>
                </div>
            )}

            {isPending && <p className="info_text">Is Loading...</p>}
            {isError && (
                <div>
                    <p className="info_text">Leider kaputt...</p>
                    <Link to="/">
                        <button className="green_btn">zurück zu Home</button>
                    </Link>
                </div>
            )}
        </section>
    );
}

export default ProfilPage;
