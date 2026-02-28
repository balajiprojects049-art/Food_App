import React from 'react';
import { Row, Col } from 'antd';
import { KPICards } from '../components/dashboard/KPICards';
import { RevenueAnalytics } from '../components/dashboard/RevenueAnalytics';
import { LiveOrdersTable } from '../components/dashboard/LiveOrdersTable';
import { StorePerformance } from '../components/dashboard/StorePerformance';
import { DeliveryPerformance } from '../components/dashboard/DeliveryPerformance';
import { SystemAlerts } from '../components/dashboard/SystemAlerts';
import { MapHeatmap } from '../components/dashboard/MapHeatmap';

export const Dashboard = () => {
    return (
        <div style={{ padding: '0 0px 24px', overflowX: 'hidden' }}>
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24, fontWeight: 600 }}>Overview</h2>

            {/* 1. KPI Summary Cards */}
            <KPICards />

            {/* 2. Revenue Analytics Section */}
            <RevenueAnalytics />

            <Row gutter={[24, 24]}>
                {/* 3. Live Orders Table */}
                <Col xs={24} xl={16}>
                    <LiveOrdersTable />
                </Col>

                {/* 4. Store Performance Widget */}
                <Col xs={24} lg={12} xl={8}>
                    <StorePerformance />
                </Col>

                {/* 7. Map Heatmap Section */}
                <Col xs={24} xl={12}>
                    <MapHeatmap />
                </Col>

                {/* 5. Delivery Performance Panel */}
                <Col xs={24} md={12} xl={6}>
                    <DeliveryPerformance />
                </Col>

                {/* 6. System Alert Panel */}
                <Col xs={24} md={12} xl={6}>
                    <SystemAlerts />
                </Col>
            </Row>
        </div>
    );
};
