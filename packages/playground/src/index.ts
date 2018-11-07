import { createQuickey } from "@quickey/core";
import "./reactRenderer";

createQuickey({
    target: document.querySelector("#container1")
})
    .addAction({
        keys: "I > D > K > F > A",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("Key and FULL AMMO!", target);
        }
    })
    .addAction({
        keys: "I > D > D > Q > D",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("GOD Mode!", target)
        }
    })
    .addAction({
        keys: "Ctrl > Ctrl",
        strict: false,
        callback: (_, target: HTMLElement) => {
            console.log(`We are testing the strict mode`, target);
        }
    })
    .addAction({
        keys: "Ctrl + +",
        strict: true,
        callback: (_, target: HTMLElement) => {
            console.log(`Give me some plus!`, target);
        }
    })
    .addAction({
        id: "hello",
        keys: "Ctrl + H",
        strict: true,
        callback: (_, target: HTMLElement) => {
            console.log("Hello World!", target)
        }
    });

createQuickey({
    target: document.querySelector("#container2")
})
    .addAction({
        keys: "I > D > K > F > A",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("Colorize me!!!", target);
            target.classList.toggle("red");
        }
    });