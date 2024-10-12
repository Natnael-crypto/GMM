import { useUpdateProfileContext } from './update-profile-context';

export default function Banner() {
    const { isAutoSaveEnabled } = useUpdateProfileContext();

    return (
        <div className="bg-muted text-muted-foreground flex flex-col items-center justify-center p-4 text-sm rounded-se-3xl rounded-es-3xl">
            <p>
                To access each section of your profile, simply click any of the
                buttons above.
            </p>
            {isAutoSaveEnabled && <p>
                Please note that your profile is auto saved by default every 5
                minutes.
            </p>}
        </div>
    )
}
