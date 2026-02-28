import React, { useState } from 'react';
import {
    Card, Form, Input, Select, Switch, Button, InputNumber, Upload, ColorPicker,
    Divider, Typography, Space, Tabs, Tag, Row, Col, message, Alert, Tooltip
} from 'antd';
import {
    SaveOutlined, SettingOutlined, AppstoreOutlined, ShopOutlined, BgColorsOutlined,
    GiftOutlined, PhoneOutlined, TeamOutlined, CarOutlined, DashboardOutlined,
    AndroidOutlined, SearchOutlined, BellOutlined, GlobalOutlined, EnvironmentOutlined,
    CreditCardOutlined, MessageOutlined, MailOutlined, BarChartOutlined,
    TranslationOutlined, CodeOutlined, CloudOutlined, ToolOutlined, WarningOutlined,
    UploadOutlined, CheckCircleOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Text, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// ─── Shared styles ─────────────────────────────────────────────────────────────
const useStyles = (isDarkMode) => ({
    page: { display: 'flex', gap: 0, minHeight: '100vh', padding: 0, margin: '-24px' },
    sidebar: {
        width: 210, minWidth: 210, flexShrink: 0,
        background: isDarkMode ? '#141414' : '#fff',
        borderRight: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
        padding: '12px 0',
        overflowY: 'auto',
    },
    content: {
        flex: 1, padding: 24, overflowY: 'auto',
        background: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    sideItem: (active, isDark) => ({
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 16px', cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400,
        color: active ? '#1890ff' : isDark ? '#8c8c8c' : '#595959',
        background: active ? (isDark ? '#111b2e' : '#e6f4ff') : 'transparent',
        borderRight: active ? '3px solid #1890ff' : '3px solid transparent',
        transition: 'all 0.15s', whiteSpace: 'nowrap',
    }),
    card: (isDark) => ({
        borderRadius: 8, border: isDark ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDark ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 16,
    }),
    row: { display: 'flex', alignItems: 'flex-start', gap: 24, padding: '14px 0', borderBottom: '1px solid var(--divider, #f0f0f0)' },
    label: { minWidth: 260, fontWeight: 500, fontSize: 13, paddingTop: 4 },
    hint: { fontSize: 11, color: '#1890ff', marginTop: 4 },
});

const FieldRow = ({ label, hint, children, last }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: '14px 0', borderBottom: last ? 'none' : '1px solid #f0f0f0' }}>
        <div style={{ minWidth: 280, maxWidth: 280 }}>
            <Text style={{ fontWeight: 500, fontSize: 13 }}>{label}</Text>
            {hint && <div style={{ fontSize: 11, color: '#1890ff', marginTop: 2 }}>{hint}</div>}
        </div>
        <div style={{ flex: 1 }}>{children}</div>
    </div>
);

const SectionTitle = ({ title }) => (
    <div style={{ padding: '18px 0 12px', marginBottom: 4 }}>
        <Text style={{ fontSize: 12, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Text>
        <div style={{ height: 1, background: '#f0f0f0', marginTop: 8 }} />
    </div>
);

const SaveBtn = ({ onClick }) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" icon={<SaveOutlined />} style={{ borderRadius: 6, paddingLeft: 20, paddingRight: 20 }} onClick={onClick || (() => message.success('Settings saved!'))}>
            Save Settings
        </Button>
    </div>
);

const ToggleRow = ({ label, defaultChecked = false }) => (
    <FieldRow label={label}>
        <Switch defaultChecked={defaultChecked} />
    </FieldRow>
);

// ─── SETTINGS SECTIONS ────────────────────────────────────────────────────────

const GeneralSection = () => (
    <div>
        <SectionTitle title="WEBSITE'S GENERAL SETTINGS" />
        <FieldRow label="Store Name:"><Input defaultValue="Feastigo" /></FieldRow>
        <FieldRow label="Application Time Zone:">
            <Select defaultValue="Asia/Kolkata" style={{ width: '100%' }}>
                <Option value="Asia/Kolkata">(GMT/UTC + 05:30) Kolkata</Option>
                <Option value="Asia/Dubai">(GMT/UTC + 04:00) Dubai</Option>
                <Option value="UTC">(GMT/UTC + 00:00) UTC</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Store Currency:">
            <Select defaultValue="INR" style={{ width: '100%' }}>
                <Option value="INR">INR</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Currency Symbol:"><Input defaultValue="₹" /></FieldRow>
        <FieldRow label="Currency Symbol Alignment">
            <Select defaultValue="Left" style={{ width: '100%' }}>
                <Option value="Left">Left</Option>
                <Option value="Right">Right</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Wallet Name:"><Input defaultValue="Wallet" /></FieldRow>
        <FieldRow label="Minimum Payout for Store in ₹:"><InputNumber defaultValue={0} style={{ width: '100%' }} min={0} /></FieldRow>
        <FieldRow label="Max Time for Accept Order:" hint="Maximum time in minutes after which admin gets notification in the orders page that the store owner has not accepted the order.">
            <InputNumber defaultValue={2} style={{ width: '100%' }} min={1} />
        </FieldRow>
        <FieldRow label="Max Time for Accept Delivery:" hint="Maximum time in minutes after which admin gets notification in the orders page that the delivery guy has not accepted the order.">
            <InputNumber defaultValue={10} style={{ width: '100%' }} min={1} />
        </FieldRow>
        <FieldRow label="Upload Image Quality:">
            <Select defaultValue="Best" style={{ width: '100%' }}>
                <Option value="Best">Best</Option>
                <Option value="Good">Good</Option>
                <Option value="Normal">Normal</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Wait for Awaiting Payment for:" hint="Only for Items upload via Admin and Store Dashboard.">
            <Select defaultValue="15" style={{ width: '100%' }}>
                <Option value="5">5 Minutes</Option>
                <Option value="10">10 Minutes</Option>
                <Option value="15">15 Minutes</Option>
                <Option value="30">30 Minutes</Option>
            </Select>
        </FieldRow>
        <ToggleRow label="Hide Payment Failed Orders" defaultChecked={false} />
        <ToggleRow label="Enable Custom Order ID" defaultChecked={false} />
        <FieldRow label="Order Confirmation Model">
            <Select defaultValue="Restaurant" style={{ width: '100%' }}>
                <Option value="Restaurant">Restaurant</Option>
                <Option value="Admin">Admin</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Order ID Prefix:"><Input defaultValue="OD-" /></FieldRow>
        <FieldRow label="Order ID Suffix:"><Input placeholder="Optional suffix" /></FieldRow>
        <ToggleRow label="Allow Payment Gateway Selection for Store Owners" defaultChecked={false} />
        <FieldRow label="Daily Revenue Target"><InputNumber defaultValue={15000} style={{ width: '100%' }} min={0} /></FieldRow>
        <ToggleRow label="Development Mode" defaultChecked={true} />
    </div>
);

const ModulesSection = () => {
    const toggles = [
        ['Remove Email on OTP Registration', true], ['Show Alternative Number', false],
        ['Enable Meat Category Images', true], ['Enable Auto Size Meat Cate Images', true],
        ['Show Meat Category Name', false], ['Show Promo Sliders Top', true],
        ['Show Price for Two', false], ['Show Filter on Store Categories', true],
        ['Enable Item Approval', true], ['Enable Subscription for Zone', true],
        ['Enable Dunzo', false], ['Enable Master Categories', false],
        ['Enable Master Items', false], ['Enable Addon Drawer', true],
        ['Enable Notification for Admin', true], ['Enable Location Based Category', false],
        ['Show Welcome Message', true], ['Show Customer Name at Home Page', true],
        ['Hide Desktop View', true], ['Enable Auto Disable COD', false],
        ['Enable Single OTP Field', true], ['Enable Horizontal Store View', true],
        ['Enable Platform Fee', true], ['Hide Food Cart Bill Details', true],
    ];
    return (
        <div>
            <SectionTitle title="MODULE SETTINGS" />
            {toggles.map(([label, def], i) => (
                <ToggleRow key={i} label={label} defaultChecked={def} />
            ))}
            <FieldRow label="Auto Disable COD Cancel Order Count:"><InputNumber defaultValue={10000} style={{ width: '100%' }} /></FieldRow>
            <FieldRow label="Homepage Category Style:">
                <Select defaultValue="Style One" style={{ width: '100%' }}>
                    <Option value="Style One">Style One</Option>
                    <Option value="Style Two">Style Two</Option>
                </Select>
            </FieldRow>
            <FieldRow label="Style One Category Type:">
                <Select defaultValue="SLIDE" style={{ width: '100%' }}>
                    <Option value="SLIDE">SLIDE</Option>
                    <Option value="GRID">GRID</Option>
                </Select>
            </FieldRow>
            <FieldRow label="Platform Fee:"><InputNumber defaultValue={7} style={{ width: '100%' }} /></FieldRow>
        </div>
    );
};

const StoreSettingsSection = () => (
    <div>
        <SectionTitle title="STORE SETTINGS" />
        <ToggleRow label="Enable Default Delivery Charge for Store" defaultChecked={true} />
        <FieldRow label="*Delivery Charge Type:">
            <Select defaultValue="Dynamic Charge" style={{ width: '100%' }}>
                <Option value="Dynamic Charge">Dynamic Charge</Option>
                <Option value="Fixed Charge">Fixed Charge</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Delivery Charges:">
            <Row gutter={8}>
                {[['Base Delivery Charge:', 15], ['Base Delivery Distance:', 1], ['Extra Delivery Charge:', 15], ['Extra Delivery Distance:', 1]].map(([l, v]) => (
                    <Col span={6} key={l}>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', display: 'block', marginBottom: 4 }}>{l}</Text>
                        <InputNumber defaultValue={v} style={{ width: '100%' }} size="small" />
                    </Col>
                ))}
            </Row>
            <Text type="secondary" style={{ fontSize: 11, marginTop: 6, display: 'block' }}>Base delivery charges will be applied to the base delivery distance. And for every extra delivery distance, extra delivery charge will be applied.</Text>
        </FieldRow>
        <ToggleRow label="Enable Custom Latitude and Longitude for Store" defaultChecked={false} />
    </div>
);

const DesignSection = () => {
    const uploadBtn = <Button icon={<UploadOutlined />} size="small">Choose File</Button>;
    return (
        <div>
            <SectionTitle title="DESIGN SETTINGS" />
            {[
                ['Logo:', '300x108 - PNG image only'],
                ['Favicon:', '512x512 PNG image only'],
                ['Hero Image:', '992x440'],
                ['Footer Made Image:', '1443x1600'],
            ].map(([l, dim]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${dim}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Input placeholder="No file selected" readOnly style={{ flex: 1 }} />
                        {uploadBtn}
                    </div>
                </FieldRow>
            ))}
            <SectionTitle title="MAIN PAGE SECTION" />
            {[['Main Page Header Section:', '1085x540'], ['Main Page Sub Header Section:', '1085x372']].map(([l, d]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${d}`}>
                    <div style={{ display: 'flex', gap: 12 }}><Input placeholder="No file selected" readOnly style={{ flex: 1 }} />{uploadBtn}</div>
                </FieldRow>
            ))}
            <FieldRow label="Main Page Header Section BG Color:"><Input type="color" defaultValue="#000000" style={{ width: 48, padding: 2, cursor: 'pointer' }} /></FieldRow>
            <FieldRow label="Main Page Header Section Text Color:"><Input type="color" defaultValue="#ffffff" style={{ width: 48, padding: 2, cursor: 'pointer' }} /></FieldRow>
            <SectionTitle title="FOOD HOME PAGE SECTION" />
            {[['Food Header Section:', '1085x540'], ['Food Sub Header Section:', '1085x372']].map(([l, d]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${d}`}>
                    <div style={{ display: 'flex', gap: 12 }}><Input placeholder="No file selected" readOnly style={{ flex: 1 }} />{uploadBtn}</div>
                </FieldRow>
            ))}
            <FieldRow label="Header Section BG Color:"><Input type="color" defaultValue="#000000" style={{ width: 48 }} /></FieldRow>
            <FieldRow label="Header Section Text Color:"><Input type="color" defaultValue="#000000" style={{ width: 48 }} /></FieldRow>
            <SectionTitle title="MEAT PAGE SECTION" />
            {[['Meat Page Header Section:', '1085x540'], ['Meat Page Sub Header Section:', '1085x372']].map(([l, d]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${d}`}>
                    <div style={{ display: 'flex', gap: 12 }}><Input placeholder="No file selected" readOnly style={{ flex: 1 }} />{uploadBtn}</div>
                </FieldRow>
            ))}
            <SectionTitle title="GROCERY HOME PAGE SECTION" />
            {[['Grocery Header Section:', '1085x540'], ['Grocery Sub Header Section:', '1085x372']].map(([l, d]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${d}`}>
                    <div style={{ display: 'flex', gap: 12 }}><Input placeholder="No file selected" readOnly style={{ flex: 1 }} />{uploadBtn}</div>
                </FieldRow>
            ))}
            <SectionTitle title="PICKUP AND DROP PAGE SECTION" />
            {[['Pickup and Drop Page Header Section:', '1085x540'], ['Pickup and Drop Page Sub Header Section:', '1085x372']].map(([l, d]) => (
                <FieldRow key={l} label={l} hint={`Image dimension ${d}`}>
                    <div style={{ display: 'flex', gap: 12 }}><Input placeholder="No file selected" readOnly style={{ flex: 1 }} />{uploadBtn}</div>
                </FieldRow>
            ))}
        </div>
    );
};

const RewardPointsSection = () => (
    <div>
        <SectionTitle title="REWARD POINTS SETTINGS" />
        <ToggleRow label="Enable Reward Points System" defaultChecked={true} />
        <FieldRow label="System Type:">
            <Select defaultValue="Wallet" style={{ width: '100%' }}>
                <Option value="Wallet">Wallet-based</Option>
                <Option value="Coupon">Coupon-based</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Reward Type:">
            <Select defaultValue="Fixed" style={{ width: '100%' }}>
                <Option value="Fixed">Fixed</Option>
                <Option value="Percentage">Percentage</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Minimum Order Value for Reward (₹):"><InputNumber defaultValue={100} style={{ width: '100%' }} min={0} /></FieldRow>
        <FieldRow label="Reward Value:"><InputNumber defaultValue={10} style={{ width: '100%' }} min={0} /></FieldRow>
        <FieldRow label="Points Per Order:"><InputNumber defaultValue={5} style={{ width: '100%' }} min={0} /></FieldRow>
    </div>
);

const VoiceCallSection = () => (
    <div>
        <SectionTitle title="VOICE CALL SETTINGS" />
        <FieldRow label="Provider:">
            <Select defaultValue="Enablex" style={{ width: '100%' }}>
                <Option value="Enablex">Enablex</Option>
                <Option value="Fonada">Fonada</Option>
                <Option value="Twilio">Twilio</Option>
            </Select>
        </FieldRow>
        <FieldRow label="API Key:"><Input.Password placeholder="Enter API Key..." /></FieldRow>
        <FieldRow label="API Secret:"><Input.Password placeholder="Enter API Secret..." /></FieldRow>
        <FieldRow label="From Number:"><Input placeholder="+91xxxxxxxxxx" /></FieldRow>
    </div>
);

const CallMaskingSection = () => (
    <div>
        <SectionTitle title="CALL MASKING SETTINGS" />
        <ToggleRow label="Enable Call Masking for Owner" defaultChecked={false} />
        <ToggleRow label="Enable Call Masking for Customer" defaultChecked={false} />
        <ToggleRow label="Enable Call Masking for Delivery Guy" defaultChecked={false} />
        <FieldRow label="Masking Provider:">
            <Select defaultValue="Enablex" style={{ width: '100%' }}>
                <Option value="Enablex">Enablex</Option>
                <Option value="Fonada">Fonada</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Virtual Number:"><Input placeholder="Virtual masking number..." /></FieldRow>
    </div>
);

const CustomerAppSection = () => (
    <div>
        <SectionTitle title="CUSTOMER APPLICATION SETTINGS" />
        <ToggleRow label="Allow COD on Self Pickup" defaultChecked={true} />
        <FieldRow label="Login Via:">
            <Select defaultValue="OTP" style={{ width: '100%' }}>
                <Option value="OTP">OTP</Option>
                <Option value="Password">Password</Option>
                <Option value="Both">Both</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Minimum Free Delivery Amount (₹):"><InputNumber defaultValue={1000} style={{ width: '100%' }} min={0} /></FieldRow>
        <ToggleRow label="Enable Wallet Top-Up" defaultChecked={true} />
        <FieldRow label="Android App Link:"><Input placeholder="https://play.google.com/store/apps/..." /></FieldRow>
        <FieldRow label="iOS App Link:"><Input placeholder="https://apps.apple.com/..." /></FieldRow>
        <FieldRow label="App Share Text:"><TextArea rows={2} placeholder="Download our food delivery app..." /></FieldRow>
    </div>
);

const ThirdPartySection = () => (
    <div>
        <SectionTitle title="THIRD PARTY DELIVERY SETTINGS" />
        <ToggleRow label="Enable Third Party Delivery" defaultChecked={false} />
        <FieldRow label="Provider:">
            <Select defaultValue="Dunzo" style={{ width: '100%' }}>
                <Option value="Dunzo">Dunzo</Option>
                <Option value="Shadowfax">Shadowfax</Option>
                <Option value="Porter">Porter</Option>
            </Select>
        </FieldRow>
        <FieldRow label="API Key:"><Input.Password placeholder="Third party API key..." /></FieldRow>
        <FieldRow label="Client ID:"><Input placeholder="Client ID..." /></FieldRow>
    </div>
);

const DeliveryAppSection = () => (
    <div>
        <SectionTitle title="DELIVERY APPLICATION SETTINGS" />
        <ToggleRow label="Enable Guy Earnings (Commission-based)" defaultChecked={true} />
        <ToggleRow label="Show Customer Address to Guy" defaultChecked={true} />
        <ToggleRow label="Show Order Addons to Guy" defaultChecked={true} />
        <ToggleRow label="Show Order Prices to Guy" defaultChecked={false} />
        <ToggleRow label="Show Customer Phone to Guy" defaultChecked={true} />
        <FieldRow label="Guy Commission (%):"><InputNumber defaultValue={80} min={0} max={100} style={{ width: '100%' }} /></FieldRow>
    </div>
);

const StoreDashboardSection = () => (
    <div>
        <SectionTitle title="STORE DASHBOARD SETTINGS" />
        <ToggleRow label="Enable Store Dashboard" defaultChecked={true} />
        <ToggleRow label="Allow Store Owner to Add Items" defaultChecked={true} />
        <ToggleRow label="Allow Store Owner to Edit Prices" defaultChecked={true} />
        <ToggleRow label="Show Payout Summary to Owner" defaultChecked={true} />
        <ToggleRow label="Enable Store Owner Notifications" defaultChecked={true} />
    </div>
);

const AndroidAppSection = () => (
    <div>
        <SectionTitle title="ANDROID APPS SETTINGS" />
        <FieldRow label="Customer App Package Name:"><Input placeholder="com.company.customer" /></FieldRow>
        <FieldRow label="Delivery App Package Name:"><Input placeholder="com.company.delivery" /></FieldRow>
        <FieldRow label="Store App Package Name:"><Input placeholder="com.company.store" /></FieldRow>
        <FieldRow label="App Version (Customer):"><Input defaultValue="1.0.0" /></FieldRow>
        <FieldRow label="Force Update:"><Switch defaultChecked={false} /></FieldRow>
        <FieldRow label="Update Message:"><TextArea rows={2} placeholder="A new version is available. Please update." /></FieldRow>
    </div>
);

const SEOSection = () => (
    <div>
        <SectionTitle title="SEO & META SETTINGS" />
        <FieldRow label="Meta Title:"><Input defaultValue="Feastigo - Food Delivery" /></FieldRow>
        <FieldRow label="Meta Description:"><TextArea rows={2} defaultValue="Order food online from your favourite restaurants." /></FieldRow>
        <FieldRow label="Meta Keywords:"><Input placeholder="food, delivery, restaurant..." /></FieldRow>
        <FieldRow label="OG Title:"><Input placeholder="Open Graph Title..." /></FieldRow>
        <FieldRow label="OG Description:"><TextArea rows={2} placeholder="Open Graph Description..." /></FieldRow>
        <FieldRow label="Twitter Card:">
            <Select defaultValue="summary_large_image" style={{ width: '100%' }}>
                <Option value="summary">Summary</Option>
                <Option value="summary_large_image">Summary Large Image</Option>
            </Select>
        </FieldRow>
    </div>
);

const PushNotificationsSection = () => (
    <div>
        <SectionTitle title="PUSH NOTIFICATIONS (FIREBASE)" />
        <Alert message="Configure Firebase to enable push notifications for customers, store owners, and delivery guys." type="info" showIcon style={{ marginBottom: 16, borderRadius: 6 }} />
        {[
            ['Firebase Sender ID:', 'Firebase Sender ID...'],
            ['Firebase Server Key:', 'Firebase Server Key...'],
            ['Firebase Project ID:', 'Firebase Project ID...'],
            ['Firebase API Key:', 'Firebase API Key...'],
            ['Firebase Auth Domain:', 'your-project.firebaseapp.com'],
            ['Firebase Messaging Sender ID:', 'Messaging Sender ID...'],
        ].map(([l, p]) => (
            <FieldRow key={l} label={l}><Input.Password placeholder={p} /></FieldRow>
        ))}
    </div>
);

const SocialLoginSection = () => (
    <div>
        <SectionTitle title="SOCIAL LOGIN SETTINGS" />
        <FieldRow label="Facebook App ID:"><Input placeholder="Facebook App ID..." /></FieldRow>
        <FieldRow label="Facebook Login Button Text:"><Input defaultValue="Continue with Facebook" /></FieldRow>
        <FieldRow label="Google Client ID:"><Input placeholder="Google OAuth Client ID..." /></FieldRow>
        <FieldRow label="Google Login Button Text:"><Input defaultValue="Continue with Google" /></FieldRow>
        <ToggleRow label="Enable Facebook Login" defaultChecked={false} />
        <ToggleRow label="Enable Google Login" defaultChecked={false} />
    </div>
);

const GoogleMapsSection = () => (
    <div>
        <SectionTitle title="GOOGLE MAPS SETTINGS" />
        <FieldRow label="Google Maps API Key:" hint="Used for store location, delivery radius, and address search.">
            <Input.Password placeholder="AIzaSy..." />
        </FieldRow>
        <FieldRow label="Distance Type:">
            <Select defaultValue="Google" style={{ width: '100%' }}>
                <Option value="Google">Google (Road Distance)</Option>
                <Option value="Direct">Direct (Straight Line)</Option>
            </Select>
        </FieldRow>
        <ToggleRow label="Allow Store Owner to Set Radius" defaultChecked={true} />
    </div>
);

const PaymentGatewaysSection = () => {
    const gateways = [
        { name: 'COD (Cash on Delivery)', enabled: true, hasKeys: false },
        { name: 'Razorpay', enabled: true, hasKeys: true },
        { name: 'Stripe', enabled: false, hasKeys: true },
        { name: 'PayPal', enabled: false, hasKeys: true },
        { name: 'PayStack', enabled: false, hasKeys: true },
        { name: 'Flutterwave', enabled: false, hasKeys: true },
        { name: 'Khalti', enabled: false, hasKeys: true },
        { name: 'SSLCommerz', enabled: false, hasKeys: true },
        { name: 'Instamojo', enabled: false, hasKeys: true },
        { name: 'PayMongo', enabled: false, hasKeys: true },
        { name: 'Wallet', enabled: true, hasKeys: false },
        { name: 'Bank Transfer', enabled: false, hasKeys: true },
        { name: 'Midtrans', enabled: false, hasKeys: true },
    ];
    return (
        <div>
            <SectionTitle title="PAYMENT GATEWAYS" />
            {gateways.map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <Text style={{ fontWeight: 500 }}>{g.name}</Text>
                    <Space>
                        {g.hasKeys && <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<SettingOutlined />}>Configure</Button>}
                        <Switch defaultChecked={g.enabled} />
                        <Tag style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, color: g.enabled ? '#237804' : '#8c8c8c', background: g.enabled ? '#f6ffed' : '#f5f5f5', border: `1px solid ${g.enabled ? '#73d13d' : '#d9d9d9'}` }}>{g.enabled ? 'ON' : 'OFF'}</Tag>
                    </Space>
                </div>
            ))}
        </div>
    );
};

const SMSSection = () => (
    <div>
        <SectionTitle title="SMS SETTINGS" />
        <FieldRow label="SMS Provider:">
            <Select defaultValue="Twilio" style={{ width: '100%' }}>
                <Option value="Twilio">Twilio</Option>
                <Option value="MSG91">MSG91</Option>
                <Option value="Textlocal">Textlocal</Option>
                <Option value="Fast2SMS">Fast2SMS</Option>
            </Select>
        </FieldRow>
        <FieldRow label="Account SID / API Key:"><Input.Password placeholder="Account SID or API Key..." /></FieldRow>
        <FieldRow label="Auth Token / API Secret:"><Input.Password placeholder="Auth Token or API Secret..." /></FieldRow>
        <FieldRow label="From Number / Sender ID:"><Input placeholder="+1234567890 or FSTIGO" /></FieldRow>
        <ToggleRow label="Enable OTP via SMS" defaultChecked={true} />
        <ToggleRow label="Enable Order Status SMS" defaultChecked={false} />
    </div>
);

const EmailSection = () => (
    <div>
        <SectionTitle title="EMAIL SETTINGS" />
        <FieldRow label="SMTP Host:"><Input defaultValue="smtp.gmail.com" /></FieldRow>
        <FieldRow label="SMTP Port:"><InputNumber defaultValue={587} style={{ width: '100%' }} /></FieldRow>
        <FieldRow label="SMTP Username:"><Input placeholder="your@email.com" /></FieldRow>
        <FieldRow label="SMTP Password:"><Input.Password placeholder="SMTP password..." /></FieldRow>
        <FieldRow label="From Name:"><Input defaultValue="Feastigo" /></FieldRow>
        <FieldRow label="From Email:"><Input defaultValue="no-reply@feastigo.com" /></FieldRow>
        <FieldRow label="Encryption:">
            <Select defaultValue="tls" style={{ width: '100%' }}>
                <Option value="tls">TLS</Option>
                <Option value="ssl">SSL</Option>
                <Option value="none">None</Option>
            </Select>
        </FieldRow>
        <ToggleRow label="Enable Order Confirmation Email" defaultChecked={true} />
    </div>
);

const GoogleAnalyticsSection = () => (
    <div>
        <SectionTitle title="GOOGLE ANALYTICS" />
        <FieldRow label="Google Analytics Tracking ID:"><Input placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X" /></FieldRow>
        <ToggleRow label="Enable Google Analytics" defaultChecked={false} />
    </div>
);

const MetaPixelSection = () => (
    <div>
        <SectionTitle title="META PIXEL (FACEBOOK)" />
        <FieldRow label="Meta Pixel ID:"><Input placeholder="Facebook Pixel ID..." /></FieldRow>
        <ToggleRow label="Enable Meta Pixel Tracking" defaultChecked={false} />
    </div>
);

const TaxSection = () => (
    <div>
        <SectionTitle title="TAX SETTINGS" />
        <ToggleRow label="Enable Tax System" defaultChecked={false} />
        <FieldRow label="Tax Name:"><Input defaultValue="GST" /></FieldRow>
        <FieldRow label="Tax Percentage (%):"><InputNumber defaultValue={5} min={0} max={100} style={{ width: '100%' }} /></FieldRow>
        <FieldRow label="Tax Type:">
            <Select defaultValue="Inclusive" style={{ width: '100%' }}>
                <Option value="Inclusive">Inclusive (included in price)</Option>
                <Option value="Exclusive">Exclusive (added on top)</Option>
            </Select>
        </FieldRow>
    </div>
);

const TranslationsSection = () => (
    <div>
        <SectionTitle title="TRANSLATIONS" />
        <Alert message="Manage language translations for your platform. English is active by default." type="info" showIcon style={{ marginBottom: 16, borderRadius: 6 }} />
        {[
            { lang: 'English', code: 'en', active: true },
            { lang: 'Hindi', code: 'hi', active: false },
            { lang: 'Arabic', code: 'ar', active: false },
            { lang: 'Telugu', code: 'te', active: false },
        ].map((l, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                    <Tag style={{ borderRadius: 3, fontFamily: 'monospace', fontSize: 11 }}>{l.code.toUpperCase()}</Tag>
                    <Text style={{ fontWeight: 500 }}>{l.lang}</Text>
                    {l.active && <Tag color="green" style={{ borderRadius: 3, fontSize: 11 }}>Active</Tag>}
                </Space>
                <Space>
                    <Button size="small" style={{ borderRadius: 4 }}>Manage</Button>
                    <Switch defaultChecked={l.active} size="small" />
                </Space>
            </div>
        ))}
    </div>
);

const CustomCSSSection = () => (
    <div>
        <SectionTitle title="CUSTOM CSS" />
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>Add custom CSS to override the platform's default styles. Be careful with this section.</Text>
        <TextArea rows={14} placeholder={`/* Add your custom CSS here */\n.header {\n  background: #000;\n}`} style={{ fontFamily: 'monospace', fontSize: 12 }} />
    </div>
);

const CacheSection = () => (
    <div>
        <SectionTitle title="CACHE SETTINGS" />
        <div style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Text style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Platform Version</Text>
            <Tag style={{ borderRadius: 3, fontWeight: 700, fontSize: 13, color: '#531dab', background: '#f9f0ff', border: '1px solid #d3adf7' }}>v4.0.0</Tag>
        </div>
        <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Text style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Force Clear App Cache</Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>Force the customer app to clear its cache on next launch.</Text>
            <Button type="primary" ghost style={{ borderRadius: 6 }}>Force Clear Cache</Button>
        </div>
        <div style={{ padding: '16px 0' }}>
            <Text style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Clear Server Cache</Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>Clear the server-side cache to reflect latest changes.</Text>
            <Button style={{ borderRadius: 6 }}>Clear Server Cache</Button>
        </div>
    </div>
);

const FixUpdateSection = () => (
    <div>
        <SectionTitle title="FIX UPDATE ISSUES" />
        <Alert message="Use these tools if something breaks after a platform update." type="warning" showIcon style={{ marginBottom: 16, borderRadius: 6 }} />
        {[
            { title: 'Run Database Migrations', desc: 'Run pending database migrations to update schema.', btn: 'Run Migrations', color: '#1890ff' },
            { title: 'Fix CORS Issues', desc: 'Clear CORS configuration and regenerate.', btn: 'Fix CORS', color: '#d46b08' },
            { title: 'Rebuild Search Indexes', desc: 'Rebuild Elasticsearch/search indexes for items.', btn: 'Rebuild Indexes', color: '#237804' },
            { title: 'Sync Permissions', desc: 'Sync all role permissions to latest defaults.', btn: 'Sync Permissions', color: '#722ed1' },
        ].map((u, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Text style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>{u.title}</Text>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 10 }}>{u.desc}</Text>
                <Button style={{ borderRadius: 4, borderColor: u.color, color: u.color }} onClick={() => message.success(`${u.title} completed!`)}>{u.btn}</Button>
            </div>
        ))}
    </div>
);

const AdvancedSection = () => (
    <div>
        <SectionTitle title="ADVANCED SETTINGS" />
        <Alert
            message="⚠️ DANGER ZONE"
            description="The actions below are irreversible. They will permanently delete data from your platform. Only use if absolutely necessary."
            type="error" showIcon
            style={{ marginBottom: 20, borderRadius: 6 }}
        />
        <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Text strong style={{ display: 'block', color: '#cf1322', marginBottom: 4 }}>Clean Everything</Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>Wipe ALL platform data (orders, stores, users, items) except Admin account, Zones, and Translations. This cannot be undone.</Text>
            <Button danger type="primary" icon={<DeleteOutlined />} style={{ borderRadius: 6 }}
                onClick={() => Modal.confirm ? message.error('This action is restricted.') : message.error('This action is restricted.')}>
                Clean Everything
            </Button>
        </div>
        <div style={{ padding: '16px 0' }}>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>Reset to Default Settings</Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>Reset all settings to their factory defaults. Your data will be preserved.</Text>
            <Button danger ghost style={{ borderRadius: 6 }}>Reset Settings</Button>
        </div>
    </div>
);

// ─── SIDEBAR CONFIG with colors ───────────────────────────────────────────────
const SECTIONS = [
    { key: 'general', label: 'General', icon: <SettingOutlined />, color: '#1890ff', component: <GeneralSection /> },
    { key: 'modules', label: 'Modules', icon: <AppstoreOutlined />, color: '#722ed1', component: <ModulesSection /> },
    { key: 'store', label: 'Store Settings', icon: <ShopOutlined />, color: '#13c2c2', component: <StoreSettingsSection /> },
    { key: 'design', label: 'Design', icon: <BgColorsOutlined />, color: '#eb2f96', component: <DesignSection /> },
    { key: 'rewards', label: 'Reward Points', icon: <GiftOutlined />, color: '#faad14', component: <RewardPointsSection /> },
    { key: 'voice', label: 'Voice Call Settings', icon: <PhoneOutlined />, color: '#52c41a', component: <VoiceCallSection /> },
    { key: 'masking', label: 'Call Masking Settings', icon: <PhoneOutlined />, color: '#a0d911', component: <CallMaskingSection /> },
    { key: 'customer', label: 'Customer Application', icon: <TeamOutlined />, color: '#1890ff', component: <CustomerAppSection /> },
    { key: 'thirdparty', label: 'Third Party Delivery', icon: <CarOutlined />, color: '#d46b08', component: <ThirdPartySection /> },
    { key: 'delivery', label: 'Delivery Application', icon: <CarOutlined />, color: '#fa541c', component: <DeliveryAppSection /> },
    { key: 'storedash', label: 'Store Dashboard', icon: <DashboardOutlined />, color: '#13c2c2', component: <StoreDashboardSection /> },
    { key: 'android', label: 'Android Apps Settings', icon: <AndroidOutlined />, color: '#52c41a', component: <AndroidAppSection /> },
    { key: 'seo', label: 'SEO', icon: <SearchOutlined />, color: '#1890ff', component: <SEOSection /> },
    { key: 'push', label: 'Push Notifications', icon: <BellOutlined />, color: '#faad14', component: <PushNotificationsSection /> },
    { key: 'social', label: 'Social Login', icon: <GlobalOutlined />, color: '#722ed1', component: <SocialLoginSection /> },
    { key: 'maps', label: 'Google Maps', icon: <EnvironmentOutlined />, color: '#13c2c2', component: <GoogleMapsSection /> },
    { key: 'payment', label: 'Payment Gateways', icon: <CreditCardOutlined />, color: '#237804', component: <PaymentGatewaysSection /> },
    { key: 'sms', label: 'SMS Settings', icon: <MessageOutlined />, color: '#1890ff', component: <SMSSection /> },
    { key: 'email', label: 'Email Settings', icon: <MailOutlined />, color: '#eb2f96', component: <EmailSection /> },
    { key: 'analytics', label: 'Google Analytics', icon: <BarChartOutlined />, color: '#fa541c', component: <GoogleAnalyticsSection /> },
    { key: 'pixel', label: 'Meta Pixel', icon: <BarChartOutlined />, color: '#1677ff', component: <MetaPixelSection /> },
    { key: 'tax', label: 'Tax Settings', icon: <SettingOutlined />, color: '#d46b08', component: <TaxSection /> },
    { key: 'translations', label: 'Translations', icon: <TranslationOutlined />, color: '#13c2c2', component: <TranslationsSection /> },
    { key: 'css', label: 'Custom CSS', icon: <CodeOutlined />, color: '#722ed1', component: <CustomCSSSection /> },
    { key: 'cache', label: 'Cache Settings', icon: <CloudOutlined />, color: '#1890ff', component: <CacheSection /> },
    { key: 'fix', label: 'Fix Update Issues', icon: <ToolOutlined />, color: '#d46b08', component: <FixUpdateSection /> },
    { key: 'advanced', label: 'Advanced Settings', icon: <WarningOutlined />, color: '#cf1322', component: <AdvancedSection /> },
];

// ─── MAIN SETTINGS PAGE ────────────────────────────────────────────────────────
const Settings = () => {
    const { isDarkMode } = useTheme();
    const [activeKey, setActiveKey] = useState('general');
    const [hoverKey, setHoverKey] = useState(null);
    const activeSection = SECTIONS.find(s => s.key === activeKey);

    return (
        <div style={{ margin: '-24px', display: 'flex', minHeight: 'calc(100vh - 64px)' }}>

            {/* ── Left Sidebar ── */}
            <div style={{
                width: 220, minWidth: 220, flexShrink: 0,
                background: isDarkMode ? '#141414' : '#fff',
                borderRight: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                overflowY: 'auto',
                paddingTop: 8, paddingBottom: 16,
            }}>
                {/* Sidebar header */}
                <div style={{
                    padding: '12px 16px 10px',
                    borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                    marginBottom: 8,
                }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Settings Menu
                    </Text>
                </div>

                {SECTIONS.map((s, idx) => {
                    const isActive = activeKey === s.key;
                    const isHover = hoverKey === s.key;
                    return (
                        <div
                            key={s.key}
                            onClick={() => setActiveKey(s.key)}
                            onMouseEnter={() => setHoverKey(s.key)}
                            onMouseLeave={() => setHoverKey(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '9px 16px 9px 12px',
                                cursor: 'pointer',
                                borderLeft: isActive ? `3px solid ${s.color}` : '3px solid transparent',
                                background: isActive
                                    ? isDarkMode ? `${s.color}18` : `${s.color}12`
                                    : isHover
                                        ? isDarkMode ? '#ffffff08' : '#f5f5f5'
                                        : 'transparent',
                                transition: 'all 0.15s ease',
                                borderRadius: '0 6px 6px 0',
                                marginRight: 8,
                                marginBottom: 1,
                            }}
                        >
                            {/* Colored icon badge */}
                            <div style={{
                                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                                background: isActive ? s.color : isDarkMode ? '#262626' : '#f5f5f5',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 13,
                                color: isActive ? '#fff' : s.color,
                                transition: 'all 0.15s ease',
                                boxShadow: isActive ? `0 2px 6px ${s.color}55` : 'none',
                            }}>
                                {s.icon}
                            </div>

                            {/* Label */}
                            <Text style={{
                                fontSize: 13,
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? s.color : isDarkMode ? '#bfbfbf' : '#434343',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                transition: 'color 0.15s',
                                lineHeight: 1.3,
                            }}>
                                {s.label}
                            </Text>
                        </div>
                    );
                })}
            </div>

            {/* ── Right Content ── */}
            <div style={{
                flex: 1, overflowY: 'auto',
                padding: 24,
                background: isDarkMode ? '#1a1a1a' : '#f5f5f5',
            }}>
                {/* Page title */}
                <Text style={{ fontWeight: 700, fontSize: 20, display: 'block', marginBottom: 20 }}>
                    SETTINGS
                </Text>

                <Card
                    style={{
                        borderRadius: 8,
                        border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
                        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                    bodyStyle={{ padding: '24px 28px' }}
                >
                    {/* Section header strip */}
                    {activeSection && (
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
                            paddingBottom: 16, borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                        }}>
                            <Space>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                                    background: activeSection?.color || '#1890ff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 16, color: '#fff',
                                    boxShadow: `0 3px 8px ${activeSection?.color}55`,
                                }}>
                                    {activeSection?.icon}
                                </div>
                                <div>
                                    <Text style={{ fontSize: 15, fontWeight: 700, display: 'block' }}>{activeSection?.label}</Text>
                                    <Text type="secondary" style={{ fontSize: 11 }}>Manage {activeSection?.label?.toLowerCase()} configuration</Text>
                                </div>
                            </Space>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                style={{ borderRadius: 6, background: activeSection?.color, borderColor: activeSection?.color }}
                                onClick={() => message.success('Settings saved!')}
                            >
                                Save Settings
                            </Button>
                        </div>
                    )}

                    {/* Section content */}
                    {activeSection?.component}

                    {/* Save button bottom */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingTop: 16, borderTop: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0' }}>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            style={{ borderRadius: 6, background: activeSection?.color, borderColor: activeSection?.color }}
                            onClick={() => message.success('Settings saved!')}
                        >
                            Save Settings
                        </Button>
                    </div>
                </Card>

                <div style={{ textAlign: 'center', padding: '12px 0', color: '#8c8c8c', fontSize: 12 }}>v4.0.0</div>
            </div>
        </div>
    );
};

export default Settings;

