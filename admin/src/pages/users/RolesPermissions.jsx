import React, { useState } from 'react';
import {
    Card, Row, Col, Table, Button, Space, Typography, Tag, Switch,
    Modal, Form, Input, InputNumber, Select, message, Tooltip, Badge,
    Divider, Popconfirm
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, SafetyOutlined,
    CheckOutlined, CloseOutlined, ExclamationCircleOutlined,
    LockOutlined, TeamOutlined, CrownOutlined, UserOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockRoles, ALL_MODULES } from './usersData';

const { Text, Title } = Typography;
const { Option } = Select;

const ACTIONS = ['View', 'Create', 'Edit', 'Delete', 'Export'];

const RoleCard = ({ role, isDarkMode, onEdit, onDelete }) => {
    const cardBg = isDarkMode ? '#1f1f1f' : '#fff';
    return (
        <Card
            size="small"
            style={{ borderRadius: 8, border: `2px solid ${role.color}22`, background: cardBg, marginBottom: 12 }}
            hoverable
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Space direction="vertical" size={4}>
                    <Space>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: role.color }} />
                        <Text strong style={{ fontSize: 15 }}>{role.name}</Text>
                    </Space>
                    <Space wrap size={4}>
                        {role.permissions.map(p => (
                            <Tag key={p} style={{ fontSize: 11, background: `${role.color}15`, border: `1px solid ${role.color}40`, color: role.color, borderRadius: 3 }}>{p}</Tag>
                        ))}
                    </Space>
                    <Space size={16}>
                        <Text type="secondary" style={{ fontSize: 12 }}><TeamOutlined /> {role.usersCount} users</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}><LockOutlined /> {role.sessionTime} min session</Text>
                    </Space>
                </Space>
                <Space direction="vertical" size={4} style={{ alignItems: 'flex-end' }}>
                    <Button size="small" onClick={() => onEdit(role)} style={{ borderRadius: 4 }} icon={<EditOutlined />}>Edit</Button>
                    <Popconfirm title={`Delete role "${role.name}"?`} okText="Delete" okType="danger" onConfirm={() => onDelete(role.id)}>
                        <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            </div>
        </Card>
    );
};

export const RolesPermissions = () => {
    const { isDarkMode } = useTheme();
    const [roles, setRoles] = useState(mockRoles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState(mockRoles[0]);
    const [form] = Form.useForm();

    const openEdit = (role) => { setEditingRole(role); form.setFieldsValue({ ...role, permissions: role.permissions }); setIsModalOpen(true); };
    const openAdd = () => { setEditingRole(null); form.resetFields(); setIsModalOpen(true); };
    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingRole) {
                setRoles(prev => prev.map(r => r.id === editingRole.id ? { ...r, ...vals } : r));
                message.success('Role updated!');
            } else {
                const id = Math.max(...roles.map(r => r.id)) + 1;
                setRoles(prev => [...prev, { key: String(id), id, usersCount: 0, ...vals }]);
                message.success('Role created!');
            }
            setIsModalOpen(false);
        });
    };

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    // Permission matrix for selected role
    const permMatrix = ALL_MODULES.map(mod => ({
        key: mod, module: mod,
        view: true, create: mod !== 'Dashboard', edit: mod !== 'Dashboard', delete: mod !== 'Dashboard' && mod !== 'Reports', export: true
    }));

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Roles & Permissions</Text>
                    <Badge count={roles.length} style={{ backgroundColor: '#722ed1' }} />
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} style={{ background: '#722ed1', borderColor: '#722ed1' }}>Create New Role</Button>
            </div>

            <Row gutter={20}>
                {/* Left: Role cards */}
                <Col xs={24} md={8}>
                    <Card style={cardBg} title={<Space><CrownOutlined style={{ color: '#722ed1' }} /><Text strong>All Roles</Text></Space>} bodyStyle={{ padding: '16px' }}>
                        {roles.map(role => (
                            <RoleCard key={role.id} role={role} isDarkMode={isDarkMode}
                                onEdit={r => { setSelectedRole(r); openEdit(r); }}
                                onDelete={id => { setRoles(prev => prev.filter(r => r.id !== id)); message.success('Role deleted.'); }}
                            />
                        ))}
                    </Card>
                </Col>

                {/* Right: Permission matrix */}
                <Col xs={24} md={16}>
                    <Card style={cardBg} title={
                        <Space>
                            <SafetyOutlined style={{ color: '#1890ff' }} />
                            <Text strong>Permission Matrix</Text>
                            {selectedRole && <Tag style={{ color: selectedRole.color, background: `${selectedRole.color}15`, border: `1px solid ${selectedRole.color}40`, borderRadius: 4 }}>{selectedRole.name}</Tag>}
                        </Space>
                    }>
                        <Text type="secondary" style={{ fontSize: 12, marginBottom: 12, display: 'block' }}>
                            Click on a role card on the left to edit its granular permissions.
                        </Text>
                        <Table
                            dataSource={permMatrix}
                            pagination={false}
                            size="small"
                            scroll={{ x: 500 }}
                            columns={[
                                { title: 'Module', dataIndex: 'module', key: 'module', render: m => <Text strong style={{ fontSize: 13 }}>{m}</Text> },
                                ...ACTIONS.map(action => ({
                                    title: action, key: action.toLowerCase(), width: 80,
                                    render: (_, row) => {
                                        const allowed = row[action.toLowerCase()];
                                        return allowed
                                            ? <CheckOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                                            : <CloseOutlined style={{ color: '#d9d9d9', fontSize: 14 }} />;
                                    }
                                }))
                            ]}
                        />

                        <Divider />
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form layout="vertical">
                                    <Form.Item label="Session Timeout (minutes)"><InputNumber defaultValue={60} min={5} max={1440} style={{ width: '100%' }} /></Form.Item>
                                </Form>
                            </Col>
                            <Col span={12}>
                                <Form layout="vertical">
                                    <Form.Item label="IP Whitelist (leave empty for all)"><Input placeholder="e.g. 192.168.1.1, 10.0.0.1" /></Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        <Button type="primary" style={{ background: '#722ed1', borderColor: '#722ed1' }}>Save Permissions</Button>
                    </Card>
                </Col>
            </Row>

            {/* Add/Edit Role Modal */}
            <Modal
                title={<Space><CrownOutlined style={{ color: '#722ed1' }} /><Text strong>{editingRole ? 'Edit Role' : 'Create New Role'}</Text></Space>}
                open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSave} width={560}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item label="Role Name" name="name" rules={[{ required: true }]}><Input placeholder="e.g. Content Manager" /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Color" name="color" rules={[{ required: true }]}><Input type="color" /></Form.Item></Col>
                        <Col span={12}><Form.Item label="Session Timeout (mins)" name="sessionTime"><InputNumber min={5} max={1440} style={{ width: '100%' }} /></Form.Item></Col>
                    </Row>
                    <Form.Item label="Module Permissions" name="permissions">
                        <Select mode="multiple" placeholder="Select modules this role can access">
                            {ALL_MODULES.map(m => <Option key={m} value={m}>{m}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="IP Whitelist (optional)" name="ipWhitelist">
                        <Select mode="tags" placeholder="Add allowed IPs or leave blank for all" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
