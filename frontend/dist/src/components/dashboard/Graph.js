import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
// import { Bar } from "recharts"
const data = [
    {
        name: 'Category 1', uv: 4000, pv: 12000, amt: 2400
    },
    {
        name: 'Category 2', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Category 3', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Category 4', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Category 5', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Category 6', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Category 7', uv: 3490, pv: 4300, amt: 2100,
    }
];
const Graph = () => {
    return (_jsx(ResponsiveContainer, Object.assign({ width: '90%', height: 300 }, { children: _jsxs(BarChart, Object.assign({ data: data }, { children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }, void 0), _jsx(XAxis, { dataKey: "name" }, void 0), _jsx(YAxis, {}, void 0), _jsx(Bar, { dataKey: "pv", fill: "#8884d8" }, void 0), _jsx(Bar, { dataKey: "uv", fill: "#82ca9d" }, void 0)] }), void 0) }), void 0));
};
export default Graph;
