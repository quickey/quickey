import Keyboard from "./Keyboard";
import { IKeyboardInput } from "./interfaces";

const keyboard = new Keyboard(document);

export {
    keyboard,
    Keyboard,
    IKeyboardInput
};