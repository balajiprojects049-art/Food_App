import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox, Divider, Tooltip } from 'antd';
import {
    UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined,
    CopyOutlined, CheckCircleOutlined, LoginOutlined
} from '@ant-design/icons';
import { useAuth, TEST_CREDENTIALS } from '../context/AuthContext';

// ── Brand colors ─────────────────────────────────────────────────────────────
const BRAND = '#f97316'; // orange
const BRAND_DARK = '#ea6c0a';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        // small artificial delay for UX
        await new Promise(r => setTimeout(r, 600));
        const result = login(values.email, values.password);
        setLoading(false);
        if (result.success) {
            message.success({ content: 'Welcome back! Redirecting…', icon: <CheckCircleOutlined style={{ color: '#52c41a' }} /> });
            setTimeout(() => navigate('/'), 400);
        } else {
            message.error(result.error);
            form.setFields([{ name: 'password', errors: [result.error] }]);
        }
    };

    const fillCredentials = (cred, idx) => {
        form.setFieldsValue({ email: cred.email, password: cred.password });
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Animated background blobs */}
            <div style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', left: '-10%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Grid overlay */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
            }} />

            {/* Main card */}
            <div style={{
                width: '100%', maxWidth: 460,
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.1)',
                overflow: 'hidden',
            }}>

                {/* Top orange gradient bar */}
                <div style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${BRAND}, #a855f7, #6366f1)`,
                }} />

                <div style={{ padding: '40px 40px 36px' }}>

                    {/* Logo + title */}
                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 64, height: 64, borderRadius: 16,
                            background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                            boxShadow: `0 8px 24px rgba(249,115,22,0.4)`,
                            marginBottom: 16,
                            fontSize: 28,
                        }}>
                            🍽️
                        </div>
                        <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>
                            FeastAdmin
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: 14 }}>
                            Sign in to your admin dashboard
                        </div>
                    </div>

                    {/* Login Form */}
                    <Form form={form} layout="vertical" onFinish={handleLogin} requiredMark={false}>

                        {/* Email */}
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' },
                            ]}
                            style={{ marginBottom: 16 }}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: '#64748b', marginRight: 4 }} />}
                                placeholder="admin@feastigo.com"
                                size="large"
                                style={{
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: 10,
                                    color: '#fff',
                                    padding: '12px 14px',
                                    fontSize: 14,
                                }}
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#64748b', marginRight: 4 }} />}
                                placeholder="Enter your password"
                                size="large"
                                iconRender={(visible) => visible
                                    ? <EyeOutlined style={{ color: '#64748b' }} />
                                    : <EyeInvisibleOutlined style={{ color: '#64748b' }} />
                                }
                                style={{
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: 10,
                                    color: '#fff',
                                    padding: '12px 14px',
                                    fontSize: 14,
                                }}
                            />
                        </Form.Item>

                        {/* Remember me + forgot */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <Checkbox
                                checked={rememberMe}
                                onChange={e => setRememberMe(e.target.checked)}
                                style={{ color: '#94a3b8', fontSize: 13 }}
                            >
                                Remember me
                            </Checkbox>
                            <span style={{ color: BRAND, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                                Forgot password?
                            </span>
                        </div>

                        {/* Submit button */}
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                icon={!loading && <LoginOutlined />}
                                style={{
                                    height: 50, borderRadius: 10, fontSize: 15, fontWeight: 600,
                                    background: loading ? 'rgba(249,115,22,0.7)' : `linear-gradient(90deg, ${BRAND}, #ea580c)`,
                                    border: 'none',
                                    boxShadow: `0 4px 20px rgba(249,115,22,0.35)`,
                                    letterSpacing: '0.3px',
                                }}
                            >
                                {loading ? 'Signing In…' : 'Sign In to Dashboard'}
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Divider */}
                    <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#475569', fontSize: 12, margin: '28px 0 24px' }}>
                        TEST CREDENTIALS
                    </Divider>

                    {/* Credential Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {TEST_CREDENTIALS.map((cred, i) => (
                            <div
                                key={i}
                                onClick={() => fillCredentials(cred, i)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '12px 14px',
                                    background: copiedIdx === i ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${copiedIdx === i ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                    borderRadius: 10, cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    if (copiedIdx !== i) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (copiedIdx !== i) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                    }
                                }}
                            >
                                {/* Avatar + info */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 9,
                                        background: ['linear-gradient(135deg,#f97316,#dc2626)', 'linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#06b6d4,#0891b2)'][i],
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.5px',
                                        flexShrink: 0,
                                    }}>
                                        {cred.avatar}
                                    </div>
                                    <div>
                                        <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{cred.name}</div>
                                        <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'monospace' }}>{cred.email}</div>
                                    </div>
                                </div>

                                {/* Role badge + action */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                                        background: ['rgba(249,115,22,0.2)', 'rgba(99,102,241,0.2)', 'rgba(6,182,212,0.2)'][i],
                                        color: ['#fb923c', '#818cf8', '#22d3ee'][i],
                                        border: `1px solid ${['rgba(249,115,22,0.3)', 'rgba(99,102,241,0.3)', 'rgba(6,182,212,0.3)'][i]}`,
                                        textTransform: 'uppercase', letterSpacing: '0.5px',
                                    }}>
                                        {cred.role}
                                    </span>
                                    <div style={{ color: copiedIdx === i ? '#4ade80' : '#475569', fontSize: 14, flexShrink: 0 }}>
                                        {copiedIdx === i ? <CheckCircleOutlined /> : <CopyOutlined />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Password hint */}
                    <div style={{
                        marginTop: 16, padding: '10px 14px',
                        background: 'rgba(99,102,241,0.08)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: 8, textAlign: 'center',
                    }}>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>
                            💡 Click any card above to auto-fill credentials
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '14px 40px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(0,0,0,0.15)',
                    textAlign: 'center',
                }}>
                    <span style={{ color: '#334155', fontSize: 12 }}>
                        © 2026 FeastAdmin · Enterprise Food Delivery Platform · v4.0.0
                    </span>
                </div>
            </div>

            {/* Global input dark-mode styles (injected inline) */}
            <style>{`
        .ant-input-affix-wrapper {
          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-radius: 10px !important;
        }
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focused {
          border-color: rgba(249,115,22,0.6) !important;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.12) !important;
        }
        .ant-input-affix-wrapper .ant-input {
          background: transparent !important;
          color: #fff !important;
          font-size: 14px !important;
        }
        .ant-input-affix-wrapper .ant-input::placeholder { color: #475569 !important; }
        .ant-input-password-icon { color: #64748b !important; }
        .ant-checkbox-wrapper { color: #94a3b8 !important; }
        .ant-checkbox-inner { background: transparent !important; border-color: rgba(255,255,255,0.2) !important; }
        .ant-checkbox-checked .ant-checkbox-inner { background: #f97316 !important; border-color: #f97316 !important; }
        .ant-divider-inner-text { color: #475569 !important; font-size: 11px !important; }
        .ant-form-item-explain-error { color: #f87171 !important; }
      `}</style>
        </div>
    );
};

export default LoginPage;
