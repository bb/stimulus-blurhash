import { Controller } from "@hotwired/stimulus";
import { decode } from "blurhash";

// Connects to data-controller="blurhash"
export class BlurhashController extends Controller {
  declare blurhashValue: string;
  declare backgroundSizeValue: string;
  declare punchValue: number;
  declare xValue: number;
  declare yValue: number;
  static values = {
    blurhash: String,
    backgroundSize: { type: String, default: "100% 100%" },
    punch: { type: Number, default: 1 },
    x: { type: Number, default: 32 },
    y: { type: Number, default: 32 },
  };

  connect() {
    this.draw();
  }

  draw() {
    const width = this.xValue;
    const height = this.yValue;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const pixels = decode(this.blurhashValue, width, height, this.punchValue);
    const drawContext = canvas.getContext("2d")!;
    const imageData = drawContext.createImageData(width, height);
    imageData.data.set(pixels);
    drawContext.putImageData(imageData, 0, 0);

    (this.element as HTMLElement).style.backgroundSize = this.backgroundSizeValue;
    (this.element as HTMLElement).style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  }
}
