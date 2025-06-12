import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div 
    style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '20px',
      marginTop: '76px'

    }}>
      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div style={{
          maxWidth: '1200px'
        }}>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {[
              { title: 'Total Sales', value: '$24,780', change: '+12.5%', icon: 'fa-dollar-sign', color: '#007bff' },
              { title: 'Total Orders', value: '1,482', change: '+8.2%', icon: 'fa-shopping-bag', color: '#28a745' },
              { title: 'New Customers', value: '382', change: '+5.7%', icon: 'fa-users', color: '#17a2b8' },
              { title: 'Conversion Rate', value: '3.6%', change: '+1.2%', icon: 'fa-chart-line', color: '#ffc107' }
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '14px',
                    margin: '0 0 8px 0',
                    fontWeight: '500'
                  }}>{stat.title}</p>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                    color: '#212529'
                  }}>{stat.value}</h3>
                  <p style={{
                    color: '#28a745',
                    fontSize: '12px',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    <i className="fas fa-arrow-up" style={{ marginRight: '4px' }}></i>
                    {stat.change} from last month
                  </p>
                </div>
                <div style={{
                  backgroundColor: stat.color,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <i className={`fas ${stat.icon}`} style={{ fontSize: '18px' }}></i>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sales Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#212529',
                margin: '0'
              }}>Sales Analytics</h2>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>Weekly</button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#f8f9fa',
                  color: '#6c757d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>Monthly</button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#f8f9fa',
                  color: '#6c757d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>Yearly</button>
              </div>
            </div>
            <div style={{
              height: '300px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#6c757d'
            }}>
              <i className="fas fa-chart-bar" style={{ fontSize: '48px', marginBottom: '12px' }}></i>
              <p style={{ margin: '0', fontSize: '16px' }}>Sales chart will be displayed here</p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '30px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#212529',
                    margin: '0'
                  }}>Recent Orders</h2>
                  <button style={{
                    color: '#007bff',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}>View All</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6c757d',
                          textTransform: 'uppercase'
                        }}>Order ID</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6c757d',
                          textTransform: 'uppercase'
                        }}>Customer</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6c757d',
                          textTransform: 'uppercase'
                        }}>Product</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6c757d',
                          textTransform: 'uppercase'
                        }}>Amount</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6c757d',
                          textTransform: 'uppercase'
                        }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: '#ORD-7895', customer: 'Emma Wilson', product: 'Silk Blouse', amount: '$79.99', status: 'Delivered' },
                        { id: '#ORD-7894', customer: 'Michael Brown', product: 'Casual Blazer', amount: '$89.99', status: 'Processing' },
                        { id: '#ORD-7893', customer: 'Sophia Davis', product: 'Summer Dress', amount: '$69.99', status: 'Shipped' },
                        { id: '#ORD-7892', customer: 'James Johnson', product: 'Leather Jacket', amount: '$129.99', status: 'Pending' },
                        { id: '#ORD-7891', customer: 'Olivia Smith', product: 'Slim Fit Jeans', amount: '$59.99', status: 'Delivered' }
                      ].map((order, index) => (
                        <tr key={index} style={{
                          borderBottom: index < 4 ? '1px solid #f8f9fa' : 'none'
                        }}>
                          <td style={{
                            padding: '16px 8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#212529'
                          }}>{order.id}</td>
                          <td style={{
                            padding: '16px 8px',
                            fontSize: '14px',
                            color: '#6c757d'
                          }}>{order.customer}</td>
                          <td style={{
                            padding: '16px 8px',
                            fontSize: '14px',
                            color: '#6c757d'
                          }}>{order.product}</td>
                          <td style={{
                            padding: '16px 8px',
                            fontSize: '14px',
                            color: '#6c757d'
                          }}>{order.amount}</td>
                          <td style={{ padding: '16px 8px' }}>
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600',
                              backgroundColor: 
                                order.status === 'Delivered' ? '#d4edda' :
                                order.status === 'Processing' ? '#d1ecf1' :
                                order.status === 'Shipped' ? '#fff3cd' : '#f8d7da',
                              color:
                                order.status === 'Delivered' ? '#155724' :
                                order.status === 'Processing' ? '#0c5460' :
                                order.status === 'Shipped' ? '#856404' : '#721c24'
                            }}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#212529',
                    margin: '0'
                  }}>Recent Activity</h2>
                  <button style={{
                    color: '#007bff',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}>View All</button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {[
                    { action: 'New order placed', user: 'Emma Wilson', time: '2 hours ago', icon: 'fa-shopping-bag', color: '#007bff' },
                    { action: 'Product uploaded', user: 'Admin', time: '4 hours ago', icon: 'fa-upload', color: '#28a745' },
                    { action: 'Customer registered', user: 'Michael Brown', time: '5 hours ago', icon: 'fa-user-plus', color: '#17a2b8' },
                    { action: 'Payment received', user: 'Sophia Davis', time: '1 day ago', icon: 'fa-credit-card', color: '#ffc107' },
                    { action: 'Inventory updated', user: 'Admin', time: '1 day ago', icon: 'fa-box', color: '#dc3545' }
                  ].map((activity, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        backgroundColor: activity.color,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <i className={`fas ${activity.icon}`} style={{ fontSize: '12px' }}></i>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#212529',
                          margin: '0 0 4px 0'
                        }}>{activity.action}</p>
                        <p style={{
                          fontSize: '12px',
                          color: '#6c757d',
                          margin: '0 0 2px 0'
                        }}>by {activity.user}</p>
                        <p style={{
                          fontSize: '11px',
                          color: '#adb5bd',
                          margin: '0'
                        }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* FontAwesome Icons */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default AdminDashboard;