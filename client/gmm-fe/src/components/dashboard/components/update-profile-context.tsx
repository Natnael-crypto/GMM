'use client';

import React, { useEffect } from "react";

export interface UpdateProfileContextProps {
    onSave: () => void;
    setAutoSave: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayedForms: React.Dispatch<React.SetStateAction<HTMLFormElement[]>>;
}

const UpdateProfileContext = React.createContext<UpdateProfileContextProps>({
    onSave: () => { },
    setAutoSave: () => { },
    setDisplayedForms: () => { },
});

export const useUpdateProfileContext = () => React.useContext(UpdateProfileContext);

export const UpdateProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [autoSave, setAutoSave] = React.useState(true);
    const [displayedForms, setDisplayedForms] = React.useState<HTMLFormElement[]>([]);

    useEffect(() => {
        if (autoSave) {
            const interval = setInterval(() => {
                displayedForms.forEach((form) => {
                    form.requestSubmit();
                });
            }, 300000 /* 5 minutes */);

            return () => clearInterval(interval);
        }
    }, [displayedForms, autoSave]);

    const onSave = () => {
        displayedForms.forEach((form) => {
            form.requestSubmit();
        });
    };

    console.log('hellow', displayedForms)
    return <UpdateProfileContext.Provider value={{ onSave, setAutoSave, setDisplayedForms }}>{children}</UpdateProfileContext.Provider>;
}