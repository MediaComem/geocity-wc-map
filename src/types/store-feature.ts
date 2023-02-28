import { Feature } from "ol";

export default interface StoreFeature {
    id: number;
    type: string;
    feature: Feature;
}