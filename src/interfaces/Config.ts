export interface Config{
    url: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    data?:any;
}