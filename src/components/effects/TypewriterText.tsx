import { useState, useEffect } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "span" | "div";
    speed?: number;
    cursor?: boolean;
}

const TypewriterText = ({
    text,
    className = "",
    as: Tag = "span",
    speed = 100,
    cursor = true,
}: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setDisplayedText("");
        setIsTyping(true);
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <Tag className={`${className} inline-block`}>
            {displayedText}
            {cursor && (
                <span
                    className={`inline-block w-[0.5em] h-[1em] bg-neon-cyan/50 ml-1 align-bottom ${isTyping ? "animate-pulse" : "animate-blink"
                        }`}
                    aria-hidden="true"
                >
                    &nbsp;
                </span>
            )}
        </Tag>
    );
};

export default TypewriterText;
