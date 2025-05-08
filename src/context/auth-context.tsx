import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

type AuthContext = {
    session: Session | null;
    signOut: () => void;
};

const authContext = createContext<AuthContext>(null!);

export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // hier kommt die Session die wir von Supabase erhalten rein
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then((result) => {
            console.log(result);
            if (result.data) {
                setSession(result.data.session);
            } else {
                setSession(null);
            }
        });

        const listener = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.data.subscription.unsubscribe();
        };
    }, []);

    const signOut = () => {
        supabase.auth.signOut();
    };

    return (
        <authContext.Provider value={{ signOut, session }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuthContext = () => {
    const value = useContext(authContext);
    if (!value) {
        console.error("Heyyy, no authContext provided");
    }
    return value;
};
