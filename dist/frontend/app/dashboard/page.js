"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const recharts_1 = require("recharts");
const Card_1 = require("../../components/Card");
const lucide_react_1 = require("lucide-react");
const hooks_1 = require("../../lib/hooks");
function DashboardPage() {
    const { data, isLoading } = (0, hooks_1.useDashboard)();
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card_1.default title="Total Revenue" amount={data.totalRevenue} icon={<lucide_react_1.DollarSign size={20}/>}/>
        <Card_1.default title="Total Charges" amount={data.totalCharges} icon={<lucide_react_1.Wallet size={20}/>}/>
        <Card_1.default title="Total Profit" amount={data.totalProfit} icon={<lucide_react_1.TrendingUp size={20}/>}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card_1.default title="Revenue per Month">
          <div className="h-72">
            <recharts_1.ResponsiveContainer>
              <recharts_1.LineChart data={data.monthlyRevenue}>
                <recharts_1.Line type="monotone" dataKey="total" stroke="#0ea5a4" strokeWidth={2}/>
                <recharts_1.CartesianGrid stroke="#f1f5f9"/>
                <recharts_1.XAxis dataKey="month"/>
                <recharts_1.YAxis />
                <recharts_1.Tooltip />
              </recharts_1.LineChart>
            </recharts_1.ResponsiveContainer>
          </div>
        </Card_1.default>

        <Card_1.default title="Profit per Month">
          <div className="h-72">
            <recharts_1.ResponsiveContainer>
              <recharts_1.LineChart data={data.monthlyCharges.map((c, i) => ({ month: c.month, total: (data.monthlyRevenue[i]?.total || 0) - c.total }))}>
                <recharts_1.Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2}/>
                <recharts_1.CartesianGrid stroke="#f1f5f9"/>
                <recharts_1.XAxis dataKey="month"/>
                <recharts_1.YAxis />
                <recharts_1.Tooltip />
              </recharts_1.LineChart>
            </recharts_1.ResponsiveContainer>
          </div>
        </Card_1.default>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map