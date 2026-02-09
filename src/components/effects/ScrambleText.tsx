import { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "span" | "div";
    scrambleSpeed?: number;
    revealSpeed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&import { useEffect, useState, useRef } from 'react'";

const ScrambleText = ({
    text,
    className = "",
    as: Tag = "span",
    scrambleSpeed = 50,
    revealSpeed = 100
}: ScrambleTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        // Keep spaces as spaces
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setIsScrambling(false);
            }

            iteration += 1 / 6; // Slow down the reveal
        }, 60);
    };

    // Auto start on mount and periodically
    useEffect(() => {
        startScramble();

        // Periodically re-scramble
        const periodicInterval = setInterval(() => {
            startScramble();
        }, 5000);

        return () => {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            clearInterval(periodicInterval);
        };
    }, [text]);

    return (
        <Tag
            className={`${className} inline-block`}
            onMouseEnter={startScramble}
        >
            {displayText}
        </Tag>
    );
};

export default ScrambleText;
