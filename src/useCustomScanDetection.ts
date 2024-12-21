import { useCallback, useEffect, useRef } from "react";

interface BufferCharacter {
    time: number;
    char: string;
}

interface Config {
    timeToEvaluate?: number;
    averageWaitTime?: number;
    startCharacter?: Array<number>;
    endCharacter?: Array<number>;
    onComplete: (code: string) => void;
    onError?: (error: string) => void;
    minLength?: number;
    ignoreIfFocusOn?: Node;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    container?: HTMLElement | Document;
    validateCode?: (code: string) => boolean;
}

const useCustomScanDetection = ({
    timeToEvaluate = 100,
    averageWaitTime = 50,
    startCharacter = [],
    endCharacter = [13], // Default to Enter key
    onComplete,
    onError,
    minLength = 1,
    ignoreIfFocusOn,
    stopPropagation = false,
    preventDefault = false,
    container = document,
    validateCode,
}: Config) => {
    const buffer = useRef<Array<BufferCharacter>>([]);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const clearBuffer = () => {
        buffer.current = [];
    };

    const evaluateBuffer = useCallback(() => {
        if (timeout.current) clearTimeout(timeout.current);

        const sum = buffer.current
            .map(({ time }, index, arr) => (index > 0 ? time - arr[index - 1].time : 0))
            .slice(1)
            .reduce((total, delta) => total + delta, 0);

        const avg = sum / (buffer.current.length - 1);
        const code = buffer.current
            .slice(startCharacter.length > 0 ? 1 : 0)
            .map(({ char }) => char)
            .join("");

        const isValid =
            avg <= averageWaitTime &&
            buffer.current.slice(startCharacter.length > 0 ? 1 : 0).length >= minLength &&
            (!validateCode || validateCode(code));

        if (isValid) {
            onComplete(code);
        } else if (onError) {
            onError(code);
        }

        clearBuffer();
    }, [averageWaitTime, minLength, onComplete, onError, startCharacter, validateCode]);

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.currentTarget === ignoreIfFocusOn) {
                return;
            }

            if (endCharacter.includes(event.keyCode)) {
                evaluateBuffer();
                return;
            }

            if (
                buffer.current.length > 0 ||
                startCharacter.includes(event.keyCode) ||
                startCharacter.length === 0
            ) {
                if (timeout.current) clearTimeout(timeout.current);
                timeout.current = setTimeout(evaluateBuffer, timeToEvaluate);
                buffer.current.push({ time: performance.now(), char: event.key });
            }

            if (stopPropagation) {
                event.stopPropagation();
            }

            if (preventDefault) {
                event.preventDefault();
            }
        },
        [evaluateBuffer, ignoreIfFocusOn, startCharacter, endCharacter, stopPropagation, preventDefault, timeToEvaluate]
    );

    useEffect(() => {
        container.addEventListener("keydown", onKeyDown as EventListener);
        return () => {
            container.removeEventListener("keydown", onKeyDown as EventListener);
        };
    }, [container, onKeyDown]);

    useEffect(() => {
        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);
};

export default useCustomScanDetection;
