/**
 * AgriNex Logistics & Fleet Module Data
 */

const logisticsData = {
  profile: {
    name: "Karthik Raja",
    company: "GreenWays Transit & Fleet",
    role: "Fleet Logistics Director",
    location: "Salem Regional Hub, TN",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
  },
  stats: {
    activeFleet: "18 Trucks",
    inTransitConsignments: "4 Orders",
    onTimeRate: "99.2%",
    freightEarnings: "₹ 3,42,800"
  },
  consignments: [
    {
      orderId: "ORD-AG12345",
      crop: "Tomato - 50 Qt",
      image: "../farmer-module/assets/images/tomato.jpg",
      farmer: "Ramesh Kumar (Erode)",
      buyer: "AgriFoods Ltd. (Coimbatore)",
      vehicleNo: "TN-33-AX-8920 (Mini Truck)",
      driver: "M. Saravanan",
      gpsMilestone: "Milestone 2/3: Perundurai Highway",
      status: "In Transit",
      statusBadge: "badge-status-transit"
    },
    {
      orderId: "ORD-AG12346",
      crop: "Paddy - 100 Qt",
      image: "../farmer-module/assets/images/paddy.jpg",
      farmer: "P. Rangarajan (Thanjavur)",
      buyer: "Fresh Mart Wholesale (Trichy)",
      vehicleNo: "TN-45-CZ-4100 (Tractor 80Qt)",
      driver: "K. Elango",
      gpsMilestone: "Milestone 1/3: Loading at Mandi Yard",
      status: "Dispatched",
      statusBadge: "badge-status-dispatched"
    },
    {
      orderId: "ORD-AG12347",
      crop: "Onion - 30 Qt",
      image: "../farmer-module/assets/images/onion.jpg",
      farmer: "Murugan Selvam (Dindigul)",
      buyer: "Global Grains Depot (Madurai)",
      vehicleNo: "TN-57-B-6055 (Pickup 4x4)",
      driver: "S. Manikandan",
      gpsMilestone: "Delivered & e-PoD Confirmed",
      status: "Settled",
      statusBadge: "badge-status-open"
    }
  ]
};
