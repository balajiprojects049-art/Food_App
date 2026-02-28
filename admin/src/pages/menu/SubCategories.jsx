import React, { useState } from 'react';
import {
    Card, Row, Col, Button, Space, Typography, Badge, Tag, Modal,
    Form, Input, Select, message, Tooltip, Collapse, Divider, Table, Switch
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, FolderOutlined,
    FolderOpenOutlined, RightOutlined, DownOutlined, AppstoreOutlined,
    DragOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;

const mockData = [
    {
        id: 1, name: 'Biryani', slug: 'biryani', itemCount: 12, status: true,
        children: [
            { id: 11, name: 'Veg Biryani', slug: 'veg-biryani', itemCount: 5, status: true, children: [] },
            { id: 12, name: 'Non-Veg Biryani', slug: 'non-veg-biryani', itemCount: 7, status: true, children: [] },
            { id: 13, name: 'Special Biryani', slug: 'special-biryani', itemCount: 3, status: false, children: [] },
        ]
    },
    {
        id: 2, name: 'Milk Shakes', slug: 'milk-shakes', itemCount: 8, status: true,
        children: [
            { id: 21, name: 'Fruit Shakes', slug: 'fruit-shakes', itemCount: 4, status: true, children: [] },
            { id: 22, name: 'Badam Shakes', slug: 'badam-shakes', itemCount: 2, status: true, children: [] },
        ]
    },
    {
        id: 3, name: 'Ice Creams', slug: 'ice-creams', itemCount: 15, status: true,
        children: [
            { id: 31, name: 'Scoops', slug: 'scoops', itemCount: 6, status: true, children: [] },
            { id: 32, name: 'Sundae', slug: 'sundae', itemCount: 4, status: true, children: [] },
            { id: 33, name: 'Popsicles', slug: 'popsicles', itemCount: 3, status: false, children: [] },
        ]
    },
    {
        id: 4, name: 'Fast Food', slug: 'fast-food', itemCount: 20, status: true,
        children: [
            { id: 41, name: 'Burgers', slug: 'burgers', itemCount: 8, status: true, children: [] },
            { id: 42, name: 'Sandwiches', slug: 'sandwiches', itemCount: 5, status: true, children: [] },
            { id: 43, name: 'Wraps', slug: 'wraps', itemCount: 4, status: true, children: [] },
        ]
    },
];

const SubCategoryRow = ({ cat, level = 0, isDarkMode, onEdit, onDelete, onAddChild }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = cat.children && cat.children.length > 0;
    const indent = level * 32;

    const rowBg = isDarkMode
        ? level === 0 ? '#1f1f1f' : '#262626'
        : level === 0 ? '#fafafa' : '#fff';

    return (
        <>
            <div
                style={{
                    display: 'flex', alignItems: 'center', padding: '10px 16px',
                    marginBottom: 4,
                    background: rowBg,
                    borderRadius: 8,
                    border: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                    marginLeft: indent,
                    transition: 'all 0.2s',
                    cursor: 'default',
                }}
                className="subcategory-row"
            >
                {/* Expand Toggle */}
                <div style={{ width: 20, marginRight: 8, flexShrink: 0 }}>
                    {hasChildren ? (
                        <Button
                            type="text" size="small"
                            icon={expanded ? <DownOutlined style={{ fontSize: 10 }} /> : <RightOutlined style={{ fontSize: 10 }} />}
                            onClick={() => setExpanded(!expanded)}
                            style={{ padding: 0, width: 20, height: 20, minWidth: 0 }}
                        />
                    ) : (
                        <div style={{ width: 20 }} />
                    )}
                </div>

                {/* Folder Icon */}
                <div style={{ marginRight: 10, color: level === 0 ? '#1890ff' : '#8c8c8c', fontSize: 16 }}>
                    {hasChildren ? (expanded ? <FolderOpenOutlined /> : <FolderOutlined />) : <AppstoreOutlined style={{ fontSize: 13 }} />}
                </div>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Space align="center">
                        <Text strong={level === 0} style={{ fontSize: level === 0 ? 14 : 13 }}>{cat.name}</Text>
                        <Tag style={{ fontSize: 11, margin: 0, padding: '0 6px', borderRadius: 2 }}>{cat.slug}</Tag>
                    </Space>
                </div>

                {/* Item Count */}
                <div style={{ width: 110, textAlign: 'center' }}>
                    <Badge
                        count={cat.itemCount}
                        style={{ backgroundColor: '#1890ff', fontSize: 12 }}
                        overflowCount={999}
                    />
                    <Text type="secondary" style={{ fontSize: 11, marginLeft: 6 }}>items</Text>
                </div>

                {/* Status */}
                <div style={{ width: 90, textAlign: 'center' }}>
                    <Tag
                        color={cat.status ? '#52c41a' : '#ff4d4f'}
                        style={{ border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 11 }}
                    >
                        {cat.status ? 'Active' : 'Inactive'}
                    </Tag>
                </div>

                {/* Actions */}
                <Space size={4} style={{ flexShrink: 0 }}>
                    <Tooltip title="Add Sub-Category">
                        <Button
                            type="text" size="small"
                            icon={<PlusOutlined />}
                            onClick={() => onAddChild(cat)}
                            style={{ color: '#1890ff' }}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text" size="small"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(cat)}
                            style={{ color: '#52c41a' }}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text" size="small" danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(cat)}
                        />
                    </Tooltip>
                </Space>
            </div>

            {/* Children */}
            {hasChildren && expanded && cat.children.map(child => (
                <SubCategoryRow
                    key={child.id}
                    cat={child}
                    level={level + 1}
                    isDarkMode={isDarkMode}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                />
            ))}
        </>
    );
};

export const SubCategories = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [parentItem, setParentItem] = useState(null);
    const [form] = Form.useForm();

    const totalCategories = data.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0);
    const totalItems = data.reduce((acc, c) => {
        const childItems = c.children?.reduce((a, ch) => a + ch.itemCount, 0) || 0;
        return acc + c.itemCount + childItems;
    }, 0);

    const handleEdit = (cat) => {
        setEditingItem(cat);
        setParentItem(null);
        form.setFieldsValue({ name: cat.name, slug: cat.slug, status: cat.status });
        setIsModalOpen(true);
    };

    const handleAddChild = (parent) => {
        setEditingItem(null);
        setParentItem(parent);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleDelete = (cat) => {
        Modal.confirm({
            title: `Delete "${cat.name}"?`,
            icon: <ExclamationCircleOutlined />,
            content: cat.children?.length ? `This will also remove ${cat.children.length} sub-categories.` : 'This action cannot be undone.',
            okText: 'Delete', okType: 'danger',
            onOk: () => {
                setData(prev => prev
                    .filter(d => d.id !== cat.id)
                    .map(d => ({ ...d, children: d.children?.filter(c => c.id !== cat.id) || [] }))
                );
                message.success(`"${cat.name}" deleted.`);
            }
        });
    };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingItem) {
                setData(prev => prev.map(d => {
                    if (d.id === editingItem.id) return { ...d, ...vals };
                    return { ...d, children: d.children?.map(c => c.id === editingItem.id ? { ...c, ...vals } : c) || [] };
                }));
                message.success('Category updated!');
            } else {
                const newId = Date.now();
                const newCat = { id: newId, ...vals, itemCount: 0, status: true, children: [] };
                if (parentItem) {
                    setData(prev => prev.map(d =>
                        d.id === parentItem.id
                            ? { ...d, children: [...(d.children || []), newCat] }
                            : d
                    ));
                    message.success(`Sub-category added under "${parentItem.name}"`);
                } else {
                    setData(prev => [...prev, newCat]);
                    message.success('Root category created!');
                }
            }
            setIsModalOpen(false);
        });
    };

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>Sub Categories</Title>
                    <Text type="secondary">Manage hierarchical category structure with drag & drop support</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); setParentItem(null); form.resetFields(); setIsModalOpen(true); }}>
                    Add Root Category
                </Button>
            </div>

            {/* Stats Row */}
            <Row gutter={16} style={{ marginBottom: 20 }}>
                {[
                    { label: 'Total Categories', value: totalCategories, color: '#1890ff' },
                    { label: 'Root Categories', value: data.length, color: '#722ed1' },
                    { label: 'Total Items Mapped', value: totalItems, color: '#52c41a' },
                    { label: 'Inactive Categories', value: data.filter(d => !d.status).length, color: '#ff4d4f' },
                ].map(stat => (
                    <Col xs={12} sm={6} key={stat.label}>
                        <Card style={cardBg} bodyStyle={{ padding: '14px 18px' }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>{stat.label}</Text>
                            <div style={{ fontSize: 24, fontWeight: 700, color: stat.color, marginTop: 4 }}>{stat.value}</div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Tree Table */}
            <Card style={cardBg} bodyStyle={{ padding: '0 20px 20px' }}>
                {/* Column Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', padding: '12px 16px',
                    borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                    marginBottom: 8
                }}>
                    <div style={{ width: 20, marginRight: 8 }} />
                    <div style={{ width: 10, marginRight: 10 }} />
                    <Text type="secondary" style={{ flex: 1, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Category Name / Slug</Text>
                    <Text type="secondary" style={{ width: 110, textAlign: 'center', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Items</Text>
                    <Text type="secondary" style={{ width: 90, textAlign: 'center', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Status</Text>
                    <Text type="secondary" style={{ width: 100, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</Text>
                </div>

                <div style={{ paddingTop: 4 }}>
                    {data.map(cat => (
                        <SubCategoryRow
                            key={cat.id}
                            cat={cat}
                            level={0}
                            isDarkMode={isDarkMode}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAddChild={handleAddChild}
                        />
                    ))}
                </div>
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={
                    <Space>
                        <FolderOutlined style={{ color: '#1890ff' }} />
                        <Text strong>
                            {editingItem ? `Edit: ${editingItem.name}` : parentItem ? `Add Sub-Category under "${parentItem?.name}"` : 'Add Root Category'}
                        </Text>
                    </Space>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText={editingItem ? 'Update' : 'Create'}
                width={520}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item label="Category Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                        <Input
                            placeholder="e.g. Veg Biryani"
                            onChange={e => {
                                const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                form.setFieldsValue({ slug });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Slug (auto-generated)" name="slug">
                        <Input placeholder="e.g. veg-biryani" />
                    </Form.Item>
                    {!parentItem && (
                        <Form.Item label="Parent Category (optional)" name="parent">
                            <Select allowClear placeholder="None — creates as root">
                                {data.map(d => <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    )}
                    <Form.Item label="Status" name="status" valuePropName="checked" initialValue={true}>
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                </Form>
            </Modal>

            <style>{`
        .subcategory-row:hover {
          border-color: #1890ff !important;
          box-shadow: 0 0 0 1px #1890ff22;
        }
      `}</style>
        </div>
    );
};
