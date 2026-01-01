"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
function Card({ title, amount, children, icon }) {
    return (<div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center gap-3 mb-2">
        {icon ? <div className="text-sky-500">{icon}</div> : null}
        {title ? <div className="text-sm text-slate-500">{title}</div> : null}
      </div>
      {amount !== undefined ? <div className="text-2xl font-semibold text-slate-900 mb-2">{amount} MAD</div> : null}
      <div className="text-sm text-slate-700">{children}</div>
    </div>);
}
//# sourceMappingURL=Card.js.map