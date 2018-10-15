import { TestWindow } from "@stencil/core/testing";
import { MyComponent } from "./my-component";

describe("my-component", () => {
  it("should build", () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe("rendering", () => {
    let element: HTMLMyComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MyComponent],
        html: "<my-component></my-component>"
      });
    });

    it("should work without parameters", () => {
      expect(element.textContent.trim()).toEqual("Hello, World! I'm 0");
    });

    it("should work with both `a` and `b`", async () => {
      element.a = 1;
      element.b = 2;
      await testWindow.flush();
      expect(element.textContent.trim()).toEqual("Hello, World! I'm 3");
    });
  });
});
