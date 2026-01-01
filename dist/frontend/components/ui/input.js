"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
const react_1 = require("react");
function Input({ className = '', ...props }) {
    return (<input className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`} {...props}/>);
}
//# sourceMappingURL=input.js.map