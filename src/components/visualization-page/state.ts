export default interface State {
    data: any;
    validator: (data: any) => string;
    speed: number;
    paused: boolean;
};
