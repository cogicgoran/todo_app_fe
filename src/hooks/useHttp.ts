import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Config } from '../interfaces/Config';

export function useHttp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if(error) {
            var timerId = setTimeout(() => {
                setError(null);
            },3000);
        }

        return () => timerId && clearTimeout(timerId);
    },[error]);

    async function customFetch(config: Config, handler: (response: AxiosResponse) => void) {
        try {
            setError(null);
            setIsLoading(true);
            const response = await axios(config);
            handler(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, error, setError, customFetch };
}
