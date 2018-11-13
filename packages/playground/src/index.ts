import { createQuickey } from "@quickey/core";
import { create } from "@quickey/ui";
import "./reactRenderer";

createQuickey({
    id: "first",
    title: "Common Shortcuts",
    target: document.querySelector("#container1")
})
    .addAction({
        keys: "I > D > K > F > A",
        description: "All weapons",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("Key and FULL AMMO!", target);
        }
    })
    .addAction({
        keys: "I > D > D > Q > D",
        description: "GOD mode",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("GOD Mode!", target)
        }
    })
    .addAction({
        keys: "Ctrl > Ctrl",
        description: "Save document",
        strict: false,
        callback: (_, target: HTMLElement) => {
            console.log(`We are testing the strict mode`, target);
        }
    })
    .addAction({
        keys: "Ctrl + +",
        description: "Increase text size",
        strict: true,
        callback: (_, target: HTMLElement) => {
            console.log(`Give me some plus!`, target);
        }
    })
    .addAction({
        id: "hello",
        keys: "Ctrl + H",
        description: "Show help",
        strict: true,
        callback: (_, target: HTMLElement) => {
            console.log("Hello World!", target)
        }
    });

createQuickey({
    id: "cheats",
    title: "Cheat Codes"
})
    .addAction({
        keys: "I > D > D > Q > D",
        description: "Invulnerability",
        callback: (_, target: HTMLElement) => {

        }
    })
    .addAction({
        keys: "I > D > K > F > A",
        description: "Full health, ammo, weapons, armor and keys",
        callback: (_, target: HTMLElement) => {

        }
    })
    .addAction({
        keys: "I > D > F > A",
        description: "Full health, ammo, weapons, and armor",
        callback: (_, target: HTMLElement) => {

        }
    })
    .addAction({
        keys: "I > D > D > T",
        description: "Change map detail",
        callback: (_, target: HTMLElement) => {

        }
    })
    .addAction({
        keys: "I > D > C > H > O > P > P > E > R > S",
        description: "Gain chainsaw",
        callback: (_, target: HTMLElement) => {

        }
    })
    .addAction({
        keys: "I > D > C > L > I > P",
        description: "Walk through walls",
        callback: (_, target: HTMLElement) => {

        }
    })

    createQuickey({
        id: "game",
        title: "Game Play"
    })
        .addAction({
            keys: "Ctrl + +",
            description: "Map zoom in",
            callback: (_, target: HTMLElement) => {
    
            }
        })
        .addAction({
            keys: "Ctrl + -",
            description: "Map zoom out",
            callback: (_, target: HTMLElement) => {
    
            }
        })
        .addAction({
            keys: "Ctrl + F1",
            description: "Show help screen",
            callback: (_, target: HTMLElement) => {
    
            }
        })
        .addAction({
            keys: "Ctrl + Q",
            description: "Exit game",
            callback: (_, target: HTMLElement) => {
    
            }
        })


createQuickey({
    id: "second",
    title: "Cheats",
    target: document.querySelector("#container2")
})
    .addAction({
        keys: "I > D > K > F > A",
        description: "All weapons",
        strict: false,
        delay: 500,
        callback: (_, target: HTMLElement) => {
            console.log("Colorize me!!!", target);
            target.classList.toggle("red");
        }
    });


const ui = create({
    el: document.querySelector("#ui"),
    searchBarPlaceholder: "Search shortcut...",
    ids: ["cheats", "game"],
    style: {
        width: 640
    }
});

ui.show();
// ui.hide();