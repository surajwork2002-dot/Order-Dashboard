import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar
} from "recharts";

const RAW_DATA = {
  Myntra: {
    total_booking_qty: 198018, booking_value: 71291385.75,
    total_shipped: 50616, shipping_value: 17101086.95,
    pending_qty: 147402, pending_value: 54190298.80,
    articles: [
      { gender: "Men", article: "Jeans", booking_qty: 65122, booking_val: 24406400, shipped_qty: 6653, shipped_val: 3198123.6, pending_qty: 58469 },
      { gender: "Men", article: "Shirts", booking_qty: 19150, booking_val: 9993500, shipped_qty: 0, shipped_val: 0, pending_qty: 19150 },
      { gender: "Men", article: "Sweatshirt", booking_qty: 16950, booking_val: 3418900, shipped_qty: 0, shipped_val: 0, pending_qty: 16950 },
      { gender: "Men", article: "Trousers", booking_qty: 6200, booking_val: 2718000, shipped_qty: 0, shipped_val: 0, pending_qty: 6200 },
      { gender: "Men", article: "Tshirt", booking_qty: 3362, booking_val: 697555, shipped_qty: 2841, shipped_val: 600461, pending_qty: 521 },
      { gender: "Men", article: "Track Pant", booking_qty: 1481, booking_val: 740500, shipped_qty: 1481, shipped_val: 777525, pending_qty: 0 },
      { gender: "Women", article: "Tops", booking_qty: 37059, booking_val: 12010194, shipped_qty: 9415, shipped_val: 3165320, pending_qty: 27644 },
      { gender: "Women", article: "Tshirt", booking_qty: 21051, booking_val: 4695208, shipped_qty: 21051, shipped_val: 4929968, pending_qty: 0 },
      { gender: "Women", article: "Dresses", booking_qty: 8220, booking_val: 3681155, shipped_qty: 564, shipped_val: 278808, pending_qty: 7656 },
      { gender: "Women", article: "Jeans", booking_qty: 8871, booking_val: 3113433, shipped_qty: 6852, shipped_val: 3277552, pending_qty: 2019 },
      { gender: "Women", article: "Co-Ords", booking_qty: 4986, booking_val: 3393600, shipped_qty: 193, shipped_val: 121590, pending_qty: 4793 },
      { gender: "Women", article: "Trousers", booking_qty: 4000, booking_val: 1707000, shipped_qty: 0, shipped_val: 0, pending_qty: 4000 },
      { gender: "Women", article: "Skirts", booking_qty: 1566, booking_val: 715940, shipped_qty: 1566, shipped_val: 751737, pending_qty: 0 },
    ],
    monthly: [
      { month: "Jun'26", qty: 66452, value: 22198641 },
      { month: "Jul'26", qty: 37696, value: 18437752 },
      { month: "Aug'26", qty: 19881, value: 10982865 },
      { month: "Sep'26", qty: 23441, value: 6586735 },
    ]
  },
  VMM: {
    total_booking_qty: 2456232, booking_value: 313565807.30,
    total_shipped: 670264, shipping_value: 56888658.46,
    pending_qty: 1785968, pending_value: 256677148.84,
    articles: [
      { gender: "Men", article: "Tshirt", booking_qty: 405886, booking_val: 68553377, shipped_qty: 88124, shipped_val: 10050341, pending_qty: 317762 },
      { gender: "Women", article: "Tshirt", booking_qty: 452214, booking_val: 72707890, shipped_qty: 210602, shipped_val: 28622815, pending_qty: 241612 },
      { gender: "Women", article: "Sweatshirt", booking_qty: 156000, booking_val: 33586800, shipped_qty: 0, shipped_val: 0, pending_qty: 156000 },
      { gender: "Kids", article: "VEST", booking_qty: 288000, booking_val: 16704000, shipped_qty: 0, shipped_val: 0, pending_qty: 288000 },
      { gender: "Kids", article: "Bloomer", booking_qty: 240000, booking_val: 6000000, shipped_qty: 129306, shipped_val: 3394282, pending_qty: 110694 },
      { gender: "Men", article: "Jeans", booking_qty: 67000, booking_val: 31875000, shipped_qty: 0, shipped_val: 0, pending_qty: 67000 },
      { gender: "Men", article: "Cargo", booking_qty: 36000, booking_val: 11088000, shipped_qty: 0, shipped_val: 0, pending_qty: 36000 },
      { gender: "Women", article: "Panty", booking_qty: 216000, booking_val: 4752000, shipped_qty: 84395, shipped_val: 1949524, pending_qty: 131605 },
      { gender: "Kids", article: "Tshirt", booking_qty: 120000, booking_val: 11740800, shipped_qty: 0, shipped_val: 0, pending_qty: 120000 },
    ],
    monthly: [
      { month: "Jun'26", qty: 1107668, value: 140205639 },
      { month: "Jul'26", qty: 311500, value: 62900000 },
      { month: "Aug'26", qty: 322800, value: 64225880 },
      { month: "Nov'26", qty: 36000, value: 3636000 },
    ]
  },
  "V-Mart": {
    total_booking_qty: 189193, booking_value: 33100952,
    total_shipped: 89706, shipping_value: 16136349.30,
    pending_qty: 99487, pending_value: 16964602.70,
    articles: [
      { gender: "Men", article: "Tshirt", booking_qty: 138748, booking_val: 19285972, shipped_qty: 78418, shipped_val: 11407201, pending_qty: 60330 },
      { gender: "Men", article: "Jeans", booking_qty: 22076, booking_val: 4415200, shipped_qty: 11038, shipped_val: 4635960, pending_qty: 11038 },
      { gender: "Women", article: "Jeans", booking_qty: 10000, booking_val: 4100000, shipped_qty: 0, shipped_val: 0, pending_qty: 10000 },
      { gender: "Women", article: "Shirts", booking_qty: 10800, booking_val: 2700000, shipped_qty: 0, shipped_val: 0, pending_qty: 10800 },
      { gender: "Women", article: "Dresses", booking_qty: 6107, booking_val: 2198520, shipped_qty: 250, shipped_val: 93187, pending_qty: 5857 },
    ],
    monthly: [
      { month: "Jun'26", qty: 61993, value: 15851266 },
    ]
  },
  Blackberry: {
    total_booking_qty: 3404, booking_value: 1600345,
    total_shipped: 0, shipping_value: 0,
    pending_qty: 3404, pending_value: 1600345,
    articles: [
      { gender: "Men", article: "Shirt", booking_qty: 3404, booking_val: 1600345, shipped_qty: 0, shipped_val: 0, pending_qty: 3404 },
    ],
    monthly: [{ month: "Jun'26", qty: 3404, value: 1600345 }]
  },
  Bewakoof: {
    total_booking_qty: 61980, booking_value: 10616980,
    total_shipped: 0, shipping_value: 0,
    pending_qty: 61980, pending_value: 10616980,
    articles: [
      { gender: "Men", article: "Tshirts", booking_qty: 44480, booking_val: 8034480, shipped_qty: 0, shipped_val: 0, pending_qty: 44480 },
      { gender: "Women", article: "Tshirts", booking_qty: 17500, booking_val: 2582500, shipped_qty: 0, shipped_val: 0, pending_qty: 17500 },
    ],
    monthly: [
      { month: "Aug'26", qty: 24480, value: 0 },
      { month: "Sep'26", qty: 37500, value: 2582500 },
    ]
  }
};

const BUYERS = Object.keys(RAW_DATA);
const COLORS = ["#00C6FF", "#FF6B6B", "#FFD93D", "#6BCB77", "#A855F7"];
const BUYER_COLORS = { Myntra: "#FF3CAC", VMM: "#00C6FF", "V-Mart": "#FFD93D", Blackberry: "#6BCB77", Bewakoof: "#FF6B6B" };

const fmt = (n) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)}Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;
const fmtQty = (n) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n?.toLocaleString("en-IN");

const KPICard = ({ label, value, sub, color, icon }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`,
    borderRadius: 16, padding: "20px 24px", flex: 1, minWidth: 160,
    boxShadow: `0 0 30px ${color}15`, position: "relative", overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: -10, right: -10, fontSize: 64, opacity: 0.06 }}>{icon}</div>
    <div style={{ color: "#aaa", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{label}</div>
    <div style={{ color, fontSize: 26, fontWeight: 800, fontFamily: "'Space Mono', monospace" }}>{value}</div>
    {sub && <div style={{ color: "#666", fontSize: 12, marginTop: 6 }}>{sub}</div>}
    <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: 2, marginTop: 16 }} />
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "12px 16px" }}>
      <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 13 }}>{p.name}: {typeof p.value === "number" && p.value > 10000 ? fmt(p.value) : fmtQty(p.value)}</div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [selectedBuyer, setSelectedBuyer] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");

  const data = useMemo(() => {
    const buyers = selectedBuyer === "All" ? BUYERS : [selectedBuyer];
    const totalBookingQty = buyers.reduce((s, b) => s + RAW_DATA[b].total_booking_qty, 0);
    const totalBookingVal = buyers.reduce((s, b) => s + RAW_DATA[b].booking_value, 0);
    const totalShipped = buyers.reduce((s, b) => s + RAW_DATA[b].total_shipped, 0);
    const totalShippedVal = buyers.reduce((s, b) => s + RAW_DATA[b].shipping_value, 0);
    const totalPending = buyers.reduce((s, b) => s + RAW_DATA[b].pending_qty, 0);
    const totalPendingVal = buyers.reduce((s, b) => s + RAW_DATA[b].pending_value, 0);
    const shipRate = ((totalShipped / totalBookingQty) * 100).toFixed(1);

    const buyerBar = BUYERS.map(b => ({
      name: b, Booking: RAW_DATA[b].total_booking_qty,
      Shipped: RAW_DATA[b].total_shipped, Pending: RAW_DATA[b].pending_qty
    }));

    const buyerVal = BUYERS.map(b => ({
      name: b, "Booking Value": RAW_DATA[b].booking_value,
      "Shipped Value": RAW_DATA[b].shipping_value, "Pending Value": RAW_DATA[b].pending_value
    }));

    const pieShip = [
      { name: "Shipped", value: totalShipped, color: "#6BCB77" },
      { name: "Pending", value: totalPending, color: "#FF6B6B" }
    ];

    const allArticles = buyers.flatMap(b => RAW_DATA[b].articles.map(a => ({ ...a, buyer: b })));
    const articleMap = {};
    allArticles.forEach(a => {
      const k = a.article;
      if (!articleMap[k]) articleMap[k] = { article: k, booking: 0, shipped: 0, pending: 0 };
      articleMap[k].booking += a.booking_qty;
      articleMap[k].shipped += a.shipped_qty;
      articleMap[k].pending += a.pending_qty;
    });
    const topArticles = Object.values(articleMap).sort((a, b) => b.booking - a.booking).slice(0, 8);

    const genderMap = {};
    allArticles.forEach(a => {
      const g = a.gender;
      if (!genderMap[g]) genderMap[g] = { name: g, value: 0 };
      genderMap[g].value += a.booking_qty;
    });
    const genderPie = Object.values(genderMap);

    const monthMap = {};
    buyers.forEach(b => {
      RAW_DATA[b].monthly.forEach(m => {
        if (!monthMap[m.month]) monthMap[m.month] = { month: m.month, qty: 0, value: 0 };
        monthMap[m.month].qty += m.qty;
        monthMap[m.month].value += m.value;
      });
    });
    const monthOrder = ["Jun'26", "Jul'26", "Aug'26", "Sep'26", "Oct'26", "Nov'26", "Dec'26"];
    const monthly = monthOrder.filter(m => monthMap[m]).map(m => monthMap[m]);

    return { totalBookingQty, totalBookingVal, totalShipped, totalShippedVal, totalPending, totalPendingVal, shipRate, buyerBar, buyerVal, pieShip, topArticles, genderPie, monthly };
  }, [selectedBuyer]);

  const tabs = ["overview", "quantity", "value", "articles"];

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d1a", color: "#e0e0e0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "24px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 8, height: 36, background: "linear-gradient(180deg,#00C6FF,#FF3CAC)", borderRadius: 4 }} />
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
              Order Booking vs Shipped
            </h1>
          </div>
          <div style={{ color: "#666", fontSize: 13, marginLeft: 20 }}>FY 2026–27 · Status as on 31st May '26</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {["All", ...BUYERS].map(b => (
            <button key={b} onClick={() => setSelectedBuyer(b)} style={{
              padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: selectedBuyer === b ? (BUYER_COLORS[b] || "#00C6FF") : "rgba(255,255,255,0.06)",
              color: selectedBuyer === b ? "#fff" : "#aaa",
              boxShadow: selectedBuyer === b ? `0 0 20px ${BUYER_COLORS[b] || "#00C6FF"}55` : "none",
              transition: "all 0.2s"
            }}>{b}</button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        <KPICard label="Total Booking Qty" value={fmtQty(data.totalBookingQty)} sub={fmt(data.totalBookingVal)} color="#00C6FF" icon="📦" />
        <KPICard label="Total Shipped Qty" value={fmtQty(data.totalShipped)} sub={fmt(data.totalShippedVal)} color="#6BCB77" icon="🚚" />
        <KPICard label="Pending to Ship" value={fmtQty(data.totalPending)} sub={fmt(data.totalPendingVal)} color="#FF6B6B" icon="⏳" />
        <KPICard label="Shipment Rate" value={`${data.shipRate}%`} sub="Qty dispatched" color="#FFD93D" icon="📊" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
            background: activeTab === t ? "rgba(0,198,255,0.15)" : "transparent",
            color: activeTab === t ? "#00C6FF" : "#666", fontWeight: 600, fontSize: 13,
            textTransform: "capitalize", transition: "all 0.2s",
            borderBottom: activeTab === t ? "2px solid #00C6FF" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Pie - Shipment Status */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>📦 Shipment Status (Qty)</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data.pieShip} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {data.pieShip.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtQty(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie - Gender Split */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>👥 Booking by Gender</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data.genderPie} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {data.genderPie.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtQty(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222", gridColumn: "1/-1" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>📅 Monthly Pending Dispatch Schedule</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} />
                <YAxis tickFormatter={fmtQty} tick={{ fill: "#888", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="qty" name="Qty" fill="#00C6FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quantity Tab */}
      {activeTab === "quantity" && (
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>📊 Booking vs Shipped vs Pending — by Buyer (Qty)</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.buyerBar} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} />
                <YAxis tickFormatter={fmtQty} tick={{ fill: "#888", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#aaa", fontSize: 13 }} />
                <Bar dataKey="Booking" fill="#00C6FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Shipped" fill="#6BCB77" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pending" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Buyer Summary Table */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>🗂️ Buyer-wise Summary Table</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333" }}>
                  {["Buyer", "Booking Qty", "Shipped Qty", "Pending Qty", "Ship Rate"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "right", color: "#888", fontWeight: 600, firstChild: { textAlign: "left" } }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BUYERS.map((b, i) => {
                  const d = RAW_DATA[b];
                  const rate = d.total_booking_qty > 0 ? ((d.total_shipped / d.total_booking_qty) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={b} style={{ borderBottom: "1px solid #1a1a1a", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td style={{ padding: "12px", color: BUYER_COLORS[b], fontWeight: 700 }}>{b}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#00C6FF" }}>{fmtQty(d.total_booking_qty)}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#6BCB77" }}>{fmtQty(d.total_shipped)}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#FF6B6B" }}>{fmtQty(d.pending_qty)}</td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <span style={{ background: parseFloat(rate) > 50 ? "#6BCB7733" : "#FF6B6B33", color: parseFloat(rate) > 50 ? "#6BCB77" : "#FF6B6B", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{rate}%</span>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: "2px solid #333", fontWeight: 800 }}>
                  <td style={{ padding: "12px", color: "#fff" }}>TOTAL</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#00C6FF" }}>{fmtQty(2908827)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#6BCB77" }}>{fmtQty(810586)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#FF6B6B" }}>{fmtQty(2098241)}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <span style={{ background: "#FFD93D33", color: "#FFD93D", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>27.9%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Value Tab */}
      {activeTab === "value" && (
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>💰 Booking vs Shipped vs Pending Value — by Buyer</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.buyerVal} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} />
                <YAxis tickFormatter={fmt} tick={{ fill: "#888", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#aaa", fontSize: 13 }} />
                <Bar dataKey="Booking Value" fill="#00C6FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Shipped Value" fill="#6BCB77" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pending Value" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>💸 Value Breakdown Table</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333" }}>
                  {["Buyer", "Booking Value", "Shipped Value", "Pending Value", "% Pending"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "right", color: "#888", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BUYERS.map((b, i) => {
                  const d = RAW_DATA[b];
                  const pct = d.booking_value > 0 ? ((d.pending_value / d.booking_value) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={b} style={{ borderBottom: "1px solid #1a1a1a", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td style={{ padding: "12px", color: BUYER_COLORS[b], fontWeight: 700 }}>{b}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#00C6FF" }}>{fmt(d.booking_value)}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#6BCB77" }}>{fmt(d.shipping_value)}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#FF6B6B" }}>{fmt(d.pending_value)}</td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                          <div style={{ width: 60, height: 6, background: "#1a1a1a", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: "#FF6B6B", borderRadius: 3 }} />
                          </div>
                          <span style={{ color: "#aaa", fontSize: 12 }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: "2px solid #333", fontWeight: 800 }}>
                  <td style={{ padding: "12px", color: "#fff" }}>TOTAL</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#00C6FF" }}>{fmt(430175470)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#6BCB77" }}>{fmt(90126094)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#FF6B6B" }}>{fmt(340049375)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#aaa" }}>79.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Articles Tab */}
      {activeTab === "articles" && (
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid #222" }}>
            <div style={{ fontWeight: 700, marginBottom: 16, color: "#fff" }}>🧥 Top Articles — Booking vs Shipped vs Pending</div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data.topArticles} layout="vertical" barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                <XAxis type="number" tickFormatter={fmtQty} tick={{ fill: "#888", fontSize: 11 }} />
                <YAxis type="category" dataKey="article" width={100} tick={{ fill: "#aaa", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#aaa", fontSize: 13 }} />
                <Bar dataKey="booking" name="Booking" fill="#00C6FF" radius={[0, 4, 4, 0]} />
                <Bar dataKey="shipped" name="Shipped" fill="#6BCB77" radius={[0, 4, 4, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#FF6B6B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 28, textAlign: "center", color: "#444", fontSize: 12 }}>
        MYD & VMM Booking v/s Shipping Status · FY 2026–27 · Data as on 31st May 2026
      </div>
    </div>
  );
}
