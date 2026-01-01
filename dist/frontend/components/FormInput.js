"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormInput;
const react_1 = require("react");
const input_1 = require("./ui/input");
function FormInput({ label, error, ...props }) {
    return (<label className="block mb-3">
      <div className="text-sm text-slate-600 mb-1">{label}</div>
      <input_1.default {...props}/>
      {error ? <div className="text-xs text-red-600 mt-1">{error}</div> : null}
    </label>);
}
//# sourceMappingURL=FormInput.js.map