import {GUI} from "../../../lib/dat.gui.module.js";

export class Gui{
    constructor(ctrl){
        const gui = new GUI();
        const renderer = gui.addFolder("Renderer");
        renderer.addColor(ctrl, "renderClearColor");

        const rectlight = gui.addFolder("RectLight");
        rectlight.add(ctrl,"rectLight_roughness", 0, 1);
        rectlight.add(ctrl,"rectLight_metalness", 0, 1);
        rectlight.add(ctrl,"rectLight_intensity", 0, 5);
        rectlight.addColor(ctrl,"rectLight1_color");
        rectlight.addColor(ctrl,"rectLight2_color");
        rectlight.addColor(ctrl,"rectLight3_color");
        rectlight.add(ctrl,"rectLight_width", 0, 30);
        rectlight.add(ctrl,"rectLight_height", 0, 30);
        rectlight.add(ctrl,"rectLight_helper");
    }
}