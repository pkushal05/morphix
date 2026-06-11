import { useEffect, useRef } from "react";

interface WorkSpaceTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export default function WorkSpaceTextarea({
    className = "",
    ...props
}: WorkSpaceTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

    }, [props.value]);

    return (
        <div className="w-full relative group">
            <textarea
                ref={textareaRef}
                className={`w-full bg-stone-900/30 text-stone-200 text-sm  border border-stone-900 rounded px-3 py-2 placeholder-stone-700 outline-none hover:border-stone-800/80 focus:border-emerald-500/40 focus:bg-stone-900/50 transition-colors resize-none leading-relaxed max-h-38 ${className}`}
                {...props}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-emerald-400 transition-all duration-300 group-focus-within:w-[98%]" />
        </div>
    );
}
