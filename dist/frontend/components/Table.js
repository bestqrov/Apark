"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Table;
function Table({ children }) {
    return (<div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>);
}
//# sourceMappingURL=Table.js.map