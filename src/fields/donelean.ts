import { FieldTypes } from "sealious";

export default class Donelean extends FieldTypes.Boolean {
    hasDefaultValue = () => true;
    async getDefaultValue() {
        return false;
    }
}
