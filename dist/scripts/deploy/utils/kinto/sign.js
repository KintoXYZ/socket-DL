"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signature_1 = require("./signature");
const main = async () => {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: npx ts-node sign.ts <privateKey>");
        process.exit(1);
    }
    const privateKey = args[0];
    await (0, signature_1.sign)(privateKey);
};
main();
