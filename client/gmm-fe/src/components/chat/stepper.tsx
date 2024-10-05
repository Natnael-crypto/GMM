import { cn } from "@/lib/utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StepperItem = ({ active, completed, text, icon }: {
    active?: boolean,
    completed?: boolean,
    text: string,
    icon: IconProp
}) => {
    return (
        <div className={cn("py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 z-10", active || completed ? "bg-primary text-primary-foreground" : "bg-[#f7f7f7] text-muted-foreground")}>
            <div className={cn("flex items-center justify-center rounded-full aspect-square p-2",
                active || completed ? "bg-primary-foreground text-primary" : "bg-[#c7c6c7] text-background")}>
                <FontAwesomeIcon className="text-[0.72rem]" icon={icon} />
            </div>
            <span className="text-[0.65rem] font-bold text-nowrap">{text}</span>
        </div>
    );
}