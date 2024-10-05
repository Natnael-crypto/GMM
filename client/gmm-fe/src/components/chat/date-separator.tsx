
export default function DateSeparator({ date }: { date: string }) {
    return (
        <div className="text-xs text-muted-foreground w-full text-center py-3" key={date}>{date}</div>
    )
}
