'use client';

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface UpdateProfileContextProps {
    onSave: () => void;
    isSaving: boolean;
    setSaving: Dispatch<SetStateAction<boolean>>;
    setAutoSave: Dispatch<SetStateAction<boolean>>;
    registerForm: (key: string, form: HTMLFormElement) => void;
}

const UpdateProfileContext = createContext<UpdateProfileContextProps>({
    isSaving: false,
    onSave: () => { },
    setSaving: () => { },
    setAutoSave: () => { },
    registerForm: (key: string, form: HTMLElement) => { },
});

export const useUpdateProfileContext = () => useContext(UpdateProfileContext);



export const UpdateProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [autoSave, setAutoSave] = useState(true);
    const [displayedForms, setDisplayedForms] = useState<Record<string, HTMLFormElement>>({});
    const [isSaving, setSaving] = useState(false);

    const registerForm = useRef(function (key: string, form: HTMLFormElement) {
        setDisplayedForms((prev) => {
            return {
                ...prev,
                [key]: form,
            };
        });
    })

    const onSave = useCallback(() => {
        if (!isSaving) {
            for (const key in displayedForms) {
                displayedForms[key]?.requestSubmit();
            }
        }
    }, [displayedForms, isSaving]);


    useEffect(() => {
        if (autoSave) {
            const interval = setInterval(onSave, 300000 /* 5 minutes */);

            return () => clearInterval(interval);
        }
    }, [displayedForms, autoSave, onSave]);

    return <UpdateProfileContext.Provider value={{ isSaving, setSaving, onSave, setAutoSave, registerForm: registerForm.current }}>{children}</UpdateProfileContext.Provider>;
}