export default interface Config {
    params: any[];
    data: () => any;
    validator: (data: any) => string;
}
