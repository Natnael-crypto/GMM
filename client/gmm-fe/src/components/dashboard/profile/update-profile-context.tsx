'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";

export interface UpdateProfileContextProps {
    onSave: () => void;
    setAutoSave: Dispatch<SetStateAction<boolean>>;
    registerForm: (key: string, form: HTMLFormElement) => void;
}

const UpdateProfileContext = createContext<UpdateProfileContextProps>({
    onSave: () => { },
    setAutoSave: () => { },
    registerForm: (key: string, form: HTMLElement) => { },
});

export const useUpdateProfileContext = () => useContext(UpdateProfileContext);



export const UpdateProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [autoSave, setAutoSave] = useState(true);
    const [displayedForms, setDisplayedForms] = useState<Record<string, HTMLFormElement>>({});

    const registerForm = useRef(function (key: string, form: HTMLFormElement) {
        setDisplayedForms((prev) => {
            return {
                ...prev,
                [key]: form,
            };
        });
    })

    const onSave = () => {
        for (const key in displayedForms) {
            displayedForms[key]?.requestSubmit();
        }
    };

    // useEffect(() => {
    //     if (autoSave) {
    //         const interval = setInterval(onSave, 300000 /* 5 minutes */);

    //         return () => clearInterval(interval);
    //     }
    // }, [displayedForms, autoSave]);


    return <UpdateProfileContext.Provider value={{ onSave, setAutoSave, registerForm: registerForm.current }}>{children}</UpdateProfileContext.Provider>;
}