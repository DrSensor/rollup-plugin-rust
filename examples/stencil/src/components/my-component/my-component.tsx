import { Component, Prop } from "@stencil/core";
import wasm from "./lib.rs";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  @Prop()
  a: number;
  @Prop()
  b: number;

  render() {
    return <div>Hello, World! I'm {wasm.exports.add(this.a, this.b)}</div>;
  }
}
