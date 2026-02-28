import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Select, Space, Typography,
    DatePicker, Tag, Tooltip, Row, Col, Statistic, Divider
} from 'antd';
import {
    SearchOutlined, PrinterOutlined, DownloadOutlined,
    CarOutlined, ShopOutlined, FileTextOutlined, BarChartOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockDeliveryReports, mockStoreWiseOrders, mockTopItems } from './reportsData';

const { Text, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// ─── Delivery Guys Report ──────────────────────────────────────────────────────
export const DeliveryGuyReport = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState([]);
    const [searched, setSearched] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 20,
    };

    const handleSubmit = () => {
        setData(mockDeliveryReports);
        setSearched(true);
    };

    const amtCol = (val, color = '#262626') => (
        <Text strong style={{ color, whiteSpace: 'nowrap' }}>₹ {val.toLocaleString()}</Text>
    );

    const columns = [
        { title: 'User', dataIndex: 'user', key: 'user', render: t => <Text style={{ fontWeight: 600, color: '#1890ff', whiteSpace: 'nowrap' }}>{t}</Text>, fixed: 'left', width: 130 },
        { title: 'Total Distance', dataIndex: 'distance', key: 'distance', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Delivery Count', dataIndex: 'deliveryCount', key: 'deliveryCount', sorter: (a, b) => a.deliveryCount - b.deliveryCount, render: v => <Tag style={{ borderRadius: 3, fontWeight: 700, color: '#531dab', background: '#f9f0ff', border: '1px solid #d3adf7' }}>{v}</Tag> },
        { title: 'Total Order Value', dataIndex: 'orderValue', key: 'orderValue', sorter: (a, b) => a.orderValue - b.orderValue, render: v => amtCol(v) },
        { title: 'Total COD', dataIndex: 'cod', key: 'cod', render: v => amtCol(v, '#d46b08') },
        { title: 'Delivery Charge (Customer)', dataIndex: 'chargeFromCustomer', key: 'chargeFromCustomer', render: v => amtCol(v) },
        { title: 'Tip (Customer)', dataIndex: 'tipFromCustomer', key: 'tipFromCustomer', render: v => amtCol(v, '#237804') },
        { title: 'Delivery Charges', dataIndex: 'deliveryCharge', key: 'deliveryCharge', render: v => amtCol(v) },
        { title: 'Delivery Tips', dataIndex: 'deliveryTip', key: 'deliveryTip', render: v => amtCol(v, '#237804') },
        { title: 'Total Earnings', dataIndex: 'totalEarnings', key: 'totalEarnings', sorter: (a, b) => a.totalEarnings - b.totalEarnings, render: v => amtCol(v, '#237804'), fixed: 'right' },
        { title: 'Date', dataIndex: 'date', key: 'date', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
    ];

    // Summary cards
    const totalEarnings = data.reduce((s, r) => s + r.totalEarnings, 0);
    const totalOrders = data.reduce((s, r) => s + r.deliveryCount, 0);
    const totalCOD = data.reduce((s, r) => s + r.cod, 0);

    return (
        <div style={{ paddingBottom: 24 }}>
            <Space align="center" style={{ marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${isDarkMode ? '#595959' : '#d9d9d9'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CarOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                </div>
                <Title level={4} style={{ margin: 0 }}>Delivery Guys Orders Report</Title>
            </Space>

            {/* Filter Card */}
            <Card style={cardBg} bodyStyle={{ padding: 24 }}>
                <Row gutter={16} align="middle">
                    <Col flex="1">
                        <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>From</Text>
                        <DatePicker style={{ width: '100%' }} placeholder="From Date" format="MM/DD/YYYY" />
                    </Col>
                    <Col flex="1">
                        <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>To</Text>
                        <DatePicker style={{ width: '100%' }} placeholder="To Date" format="MM/DD/YYYY" />
                    </Col>
                    <Col style={{ paddingTop: 28 }}>
                        <Button type="primary" onClick={handleSubmit} style={{ borderRadius: 6, paddingLeft: 24, paddingRight: 24 }}>Submit</Button>
                    </Col>
                </Row>
            </Card>

            {/* Summary KPI Strip */}
            {searched && (
                <Row gutter={12} style={{ marginBottom: 20 }}>
                    {[
                        { label: 'Total Deliveries', value: totalOrders, suffix: ' orders', color: '#1890ff' },
                        { label: 'Total Earnings', value: `₹ ${totalEarnings.toLocaleString()}`, color: '#237804' },
                        { label: 'Total COD Collected', value: `₹ ${totalCOD.toLocaleString()}`, color: '#d46b08' },
                        { label: 'Active Riders', value: data.length, color: '#722ed1' },
                    ].map((s, i) => (
                        <Col key={i} xs={12} sm={6}>
                            <Card style={{ ...cardBg, marginBottom: 0 }} bodyStyle={{ padding: '14px 18px' }}>
                                <Text type="secondary" style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>{s.label}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</Text>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Data Table */}
            {searched && (
                <Card style={{ ...cardBg, marginBottom: 0 }} bodyStyle={{ padding: '0 20px 20px' }}>
                    <div style={{ paddingTop: 16, marginBottom: 12, display: 'flex', justifyContent: 'flex-end' }}>
                        <Space>
                            <Button icon={<PrinterOutlined />}>Print</Button>
                            <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                        </Space>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 10, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </Card>
            )}
        </div>
    );
};

// ─── Store-Wise Order Report ───────────────────────────────────────────────────
export const StoreWiseReport = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockStoreWiseOrders);
    const [storeFilter, setStoreFilter] = useState(null);
    const [orderTypeFilter, setOrderTypeFilter] = useState(null);
    const [pageSize, setPageSize] = useState(50);

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
    };

    const filtered = data.filter(d => {
        if (storeFilter && d.storeName !== storeFilter) return false;
        if (orderTypeFilter && d.orderType !== orderTypeFilter) return false;
        return true;
    });

    const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text>, fixed: 'left', width: 110 },
        {
            title: 'Order ID', dataIndex: 'orderId', key: 'orderId',
            render: t => <Text style={{ color: '#1890ff', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer' }}>{t}</Text>,
            width: 190,
        },
        { title: 'Zone', dataIndex: 'zone', key: 'zone', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Store Name', dataIndex: 'storeName', key: 'storeName', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Customer Phone', dataIndex: 'customerPhone', key: 'customerPhone', render: t => <Text style={{ fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Delivery Guy', dataIndex: 'deliveryGuy', key: 'deliveryGuy', render: t => <Text style={{ color: '#722ed1', fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Order Type', dataIndex: 'orderType', key: 'orderType',
            render: t => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: t === 'Delivery' ? '#096dd9' : '#237804', background: t === 'Delivery' ? '#e6f4ff' : '#f6ffed', border: `1px solid ${t === 'Delivery' ? '#91caff' : '#73d13d'}` }}>{t}</Tag>
        },
        {
            title: 'Delivery Type', dataIndex: 'deliveryType', key: 'deliveryType',
            render: t => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#d46b08', background: '#fff7e6', border: '1px solid #ffd591' }}>{t}</Tag>
        },
        { title: 'Distance', dataIndex: 'distance', key: 'distance', render: t => <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <Space align="center" style={{ marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${isDarkMode ? '#595959' : '#d9d9d9'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShopOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                </div>
                <Title level={4} style={{ margin: 0 }}>Store-Wise Order Report</Title>
            </Space>

            {/* Filter Bar */}
            <Card style={{ ...cardBg, marginBottom: 16 }} bodyStyle={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                    <Select placeholder="Select Store" allowClear style={{ width: 200 }} onChange={setStoreFilter}>
                        <Option value="Cool & Spicy">Cool &amp; Spicy</Option>
                        <Option value="Rever">Rever</Option>
                        <Option value="Middle Class Fast Foods">Middle Class Fast Foods</Option>
                        <Option value="Buchi Biryani">Buchi Biryani</Option>
                        <Option value="Star Biryani">Star Biryani</Option>
                        <Option value="Andhra Dairy">Andhra Dairy</Option>
                        <Option value="Koli HUT FIVE STAR">Koli HUT FIVE STAR</Option>
                    </Select>
                    <Input placeholder="Payment Mode" style={{ width: 160 }} />
                    <Select placeholder="Select Order Type" allowClear style={{ width: 180 }} onChange={setOrderTypeFilter}>
                        <Option value="Delivery">Delivery</Option>
                        <Option value="Self Pickup">Self Pickup</Option>
                    </Select>
                    <Space align="center">
                        <Text style={{ fontSize: 13 }}>From</Text>
                        <DatePicker style={{ width: 140 }} format="MM/DD/YYYY" />
                        <Text style={{ fontSize: 13 }}>To</Text>
                        <DatePicker style={{ width: 140 }} format="MM/DD/YYYY" />
                    </Space>
                    <Select defaultValue={50} style={{ width: 80 }} onChange={setPageSize}>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                    </Select>
                    <Button type="primary" icon={<SearchOutlined />} style={{ borderRadius: 6 }} />
                </div>
                <Space style={{ marginTop: 10 }}>
                    <Button icon={<PrinterOutlined />} style={{ borderRadius: 4 }} />
                    <Button icon={<DownloadOutlined />} style={{ borderRadius: 4 }} />
                </Space>
            </Card>

            {/* Table with dark header matching Feastigo */}
            <Card style={{ ...cardBg, overflow: 'hidden' }} bodyStyle={{ padding: 0 }}>
                <Table
                    columns={columns}
                    dataSource={filtered}
                    pagination={{ pageSize, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                    scroll={{ x: 'max-content' }}
                    rowHoverable
                    size="middle"
                    components={{
                        header: {
                            cell: (props) => (
                                <th {...props} style={{ ...props.style, background: isDarkMode ? '#1f1f1f' : '#37474f', color: '#fff', fontWeight: 600, borderColor: '#455a64', whiteSpace: 'nowrap' }} />
                            )
                        }
                    }}
                />
            </Card>
        </div>
    );
};

// ─── Most Sold Items Report ────────────────────────────────────────────────────
export const MostSoldItemsReport = () => {
    const { isDarkMode } = useTheme();
    const [storeFilter, setStoreFilter] = useState(null);
    const [timeRange, setTimeRange] = useState('This Week');

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
    };

    const total = mockTopItems.reduce((s, i) => s + i.salesCount, 0);

    // SVG Donut Chart
    const DonutChart = () => {
        const cx = 160, cy = 160, r = 110, innerR = 65;
        const circumference = 2 * Math.PI * r;
        let offset = 0;
        const segments = mockTopItems.map(item => {
            const pct = item.salesCount / total;
            const dash = pct * circumference;
            const gap = circumference - dash;
            const seg = { ...item, dash, gap, offset, pct };
            offset += dash;
            return seg;
        });

        return (
            <svg width="320" height="320" viewBox="0 0 320 320">
                {segments.map((seg, i) => (
                    <circle key={i}
                        cx={cx} cy={cy} r={r}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={innerR - 10}
                        strokeDasharray={`${seg.dash} ${seg.gap}`}
                        strokeDashoffset={-seg.offset}
                        transform={`rotate(-90 ${cx} ${cy})`}
                        style={{ transition: 'stroke-dasharray 0.3s ease' }}
                    />
                ))}
                {/* Center label */}
                <text x={cx} y={cy - 8} textAnchor="middle" fill={isDarkMode ? '#fff' : '#262626'} fontSize="13" fontWeight="600">Top 10</text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill={isDarkMode ? '#8c8c8c' : '#595959'} fontSize="11">Most Sold</text>
                <text x={cx} y={cy + 26} textAnchor="middle" fill={isDarkMode ? '#8c8c8c' : '#595959'} fontSize="11">{total.toLocaleString()} units</text>

                {/* Labels with lines */}
                {segments.slice(0, 5).map((seg, i) => {
                    const angle = (-(seg.offset + seg.dash / 2) / circumference) * 2 * Math.PI - Math.PI / 2;
                    const lx = cx + (r + 30) * Math.cos(angle);
                    const ly = cy + (r + 30) * Math.sin(angle);
                    const tx = cx + (r + 55) * Math.cos(angle);
                    const ty = cy + (r + 55) * Math.sin(angle);
                    return (
                        <g key={i}>
                            <line x1={cx + r * Math.cos(angle)} y1={cy + r * Math.sin(angle)} x2={lx} y2={ly} stroke={seg.color} strokeWidth="1" />
                            <text x={tx} y={ty} textAnchor={tx > cx ? 'start' : 'end'} fill={seg.color} fontSize="9" fontWeight="600">{seg.itemName.length > 10 ? seg.itemName.slice(0, 10) + '…' : seg.itemName}</text>
                        </g>
                    );
                })}
            </svg>
        );
    };

    const columns = [
        {
            title: 'Item Name', dataIndex: 'itemName', key: 'itemName',
            render: (t, r) => (
                <Space>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                    <Text style={{ color: '#1890ff', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t}</Text>
                </Space>
            )
        },
        {
            title: 'Sales Count', dataIndex: 'salesCount', key: 'salesCount', sorter: (a, b) => a.salesCount - b.salesCount,
            render: v => <Text strong style={{ whiteSpace: 'nowrap' }}>{v.toLocaleString()}</Text>
        },
        {
            title: 'Net. Amount', dataIndex: 'netAmount', key: 'netAmount', sorter: (a, b) => a.netAmount - b.netAmount,
            render: v => <Text strong style={{ color: '#237804', whiteSpace: 'nowrap' }}>₹ {v.toLocaleString()}</Text>
        },
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Header + Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Space align="center">
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${isDarkMode ? '#595959' : '#d9d9d9'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BarChartOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Most Sold Items</Title>
                </Space>
                <Space>
                    <Select placeholder="Select Store..." allowClear style={{ width: 180 }} onChange={setStoreFilter}>
                        <Option value="Cool & Spicy">Cool &amp; Spicy</Option>
                        <Option value="Rever">Rever</Option>
                        <Option value="Middle Class Fast Foods">Middle Class Fast Foods</Option>
                        <Option value="Star Biryani">Star Biryani</Option>
                    </Select>
                    <Select value={timeRange} onChange={setTimeRange} style={{ width: 150 }}>
                        <Option value="Today">Today</Option>
                        <Option value="This Week">This Week</Option>
                        <Option value="This Month">This Month</Option>
                        <Option value="This Over All">This Over All</Option>
                    </Select>
                    <Button type="primary" icon={<SearchOutlined />} style={{ borderRadius: 6 }} />
                </Space>
            </div>

            {/* Two-column layout — Table left, Chart right */}
            <Row gutter={20}>
                <Col xs={24} lg={12}>
                    <Card style={cardBg} bodyStyle={{ padding: 24 }}>
                        <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 16 }}>Top 10 Most sold items</Text>
                        <Table
                            columns={columns}
                            dataSource={mockTopItems}
                            pagination={false}
                            size="middle"
                            rowHoverable
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card style={cardBg} bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#1890ff', display: 'block', marginBottom: 4, textAlign: 'center' }}>Overview Of Most Sold Items</Text>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 20, textAlign: 'center' }}>Of all orders till 2026-02-28</Text>
                        <DonutChart />
                        {/* Legend */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                            {mockTopItems.map((item, i) => (
                                <Space key={i} size={4}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                                    <Text style={{ fontSize: 11, color: isDarkMode ? '#8c8c8c' : '#595959', whiteSpace: 'nowrap' }}>{item.itemName}</Text>
                                </Space>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
