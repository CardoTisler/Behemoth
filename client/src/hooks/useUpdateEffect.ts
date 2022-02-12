import { useEffect, useRef } from "react";

/**
 * Custom hook for implementing useEffect that shouldn't run on the first
 * render of the component
 * @param callback Function that should run when component gets updated
 * @param dependencies<any[]> dependencies that the useEffect should listen
 */
export default function useUpdateEffect(callback: any, dependencies: any[]) {
    const firstRenderRef = useRef(true);
    useEffect( () => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
}
