'use client';

import Link from 'next/link';
import { Package, Eye, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { ROUTES } from '@/lib/constants';

// Mock orders data
const mockOrders = [
  {
    id: 1,
    orderNumber: '#ORD-1234',
    status: 'delivered',
    total: 299.99,
    items: [
      { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 89.99 },
      { name: 'Smart Watch Series 8', quantity: 1, price: 199.99 },
    ],
    createdAt: '2024-01-15T10:30:00Z',
    deliveredAt: '2024-01-18T14:20:00Z',
    shippingAddress: '123 Main St, City, State 12345',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 2,
    orderNumber: '#ORD-1235',
    status: 'processing',
    total: 79.99,
    items: [
      { name: 'Minimalist Desk Lamp', quantity: 1, price: 79.99 },
    ],
    createdAt: '2024-01-18T09:15:00Z',
    shippingAddress: '123 Main St, City, State 12345',
  },
  {
    id: 3,
    orderNumber: '#ORD-1236',
    status: 'shipped',
    total: 149.99,
    items: [
      { name: 'Luxury Leather Wallet', quantity: 1, price: 149.99 },
    ],
    createdAt: '2024-01-20T16:45:00Z',
    shippedAt: '2024-01-21T10:30:00Z',
    shippingAddress: '123 Main St, City, State 12345',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 4,
    orderNumber: '#ORD-1237',
    status: 'cancelled',
    total: 29.99,
    items: [
      { name: 'Organic Cotton T-Shirt', quantity: 1, price: 29.99 },
    ],
    createdAt: '2024-01-12T14:20:00Z',
    cancelledAt: '2024-01-13T09:10:00Z',
    shippingAddress: '123 Main St, City, State 12345',
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'processing':
        return '⏳';
      case 'shipped':
        return '🚚';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">
          Track and manage your orders
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-400 mx-auto mb-8" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-8">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : "You haven't placed any orders yet"
            }
          </p>
          <Link href={ROUTES.PRODUCTS}>
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{getStatusIcon(order.status)}</span>
                      <span>{order.orderNumber}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="text-lg font-semibold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <strong>Shipping Address:</strong>
                    <p>{order.shippingAddress}</p>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <strong>Tracking Number:</strong>
                      <p className="font-mono">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>

                {/* Status Timeline */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Ordered: {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {order.status !== 'cancelled' && (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            ['shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span>Shipped: {order.shippedAt ? new Date(order.shippedAt).toLocaleDateString() : 'Pending'}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span>Delivered: {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'Pending'}</span>
                        </div>
                      </>
                    )}
                    
                    {order.cancelledAt && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Cancelled: {new Date(order.cancelledAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link href={ROUTES.ORDER_DETAILS(order.id)}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  
                  {order.trackingNumber && (
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}