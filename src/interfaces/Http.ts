import { AxiosResponse } from "axios";
import { Config } from "./Config";

export type CustomFetch = (config: Config, handler: (response: AxiosResponse<any, any>) => void) => Promise<void>;
export type SetError = React.Dispatch<any>;
export type SetCurrentUser = (active: {} | null) => void;