import { createQuickey } from "@quickey/core";

const quickey = createQuickey()
    .addAction({
        keys: "I > D > K > F > A",
        strict: false,
        delay: 500,
        callback: () => {
            console.log("Key and FULL AMMO!");
        }
    })
    .addAction({
        keys: "I > D > D > Q > D",
        strict: false,
        delay: 500,
        callback: () => {
            console.log("GOD Mode!")
        }
    })
    .addAction({
        keys: "Ctrl > Ctrl",
        strict: true,
        callback: () => {
            console.log(`We are testing the strict mode`);
        }
    })
    .addAction({
        keys: "Ctrl + +",
        strict: true,
        callback: () => {
            console.log(`Give me some plus!`);
        }
    })
    .addAction({
        id: "hello",
        keys: "Ctrl + H",
        strict: true,
        callback: () => {
            console.log("Hello World!")
        }
    });