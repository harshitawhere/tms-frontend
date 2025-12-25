const shipments = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  shipmentNumber: `SHP-${1000 + i}`,
  origin: ['New York, NY', 'Los Angeles, CA', 'Houston, TX', 'Chicago, IL'][i % 4],
  destination: ['Miami, FL', 'Seattle, WA', 'Denver, CO', 'Boston, MA'][i % 4],
  status: ['In Transit', 'Delivered', 'Pending', 'Delayed'][i % 4],
  carrier: ['Carrier A', 'Carrier B', 'Carrier C'][i % 3],
  weight: `${(Math.random() * 1000 + 50).toFixed(0)} kg`,
  eta: `2025-12-${10 + (i % 20)}`,
  priority: ['Low', 'Medium', 'High'][i % 3],
  notes: `Sample note for shipment ${i + 1}`,
  assignedEmployee: i % 3 === 0 ? 'emp' : 'all'
}));

export default shipments;
