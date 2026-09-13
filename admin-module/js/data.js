/**
 * AgriNex Admin & Mandi Governance Module Data
 */

const adminData = {
  profile: {
    name: "Dr. A. Venkatesh",
    role: "Chief Mandi Administrator",
    agency: "AgriNex Governance Board",
    location: "AgriNex HQ, Chennai",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80"
  },
  stats: {
    verifiedFarmers: "14,280",
    registeredBuyers: "850",
    escrowVolume: "₹ 4.85 Cr",
    openDisputes: "3 Cases"
  },
  kycAndEscrowQueue: [
    {
      caseId: "SETTLE-AG902",
      type: "Escrow Release",
      party: "Ramesh Kumar ➔ AgriFoods Ltd.",
      crop: "Tomato (50 Qt)",
      amount: "₹ 62,500",
      proofStatus: "e-PoD Verified",
      riskLevel: "Low Risk",
      status: "Ready for Release",
      statusBadge: "badge-status-open"
    },
    {
      caseId: "KYC-BUYER-104",
      type: "Buyer Onboarding",
      party: "Heritage Agro Mills (Madurai)",
      crop: "GSTIN Verified",
      amount: "Credit: ₹ 50L",
      proofStatus: "FSSAI & Mandi Reg Valid",
      riskLevel: "Approved",
      status: "Pending Approval",
      statusBadge: "badge-status-negotiation"
    },
    {
      caseId: "SETTLE-AG903",
      type: "Escrow Release",
      party: "Murugan Selvam ➔ Global Grains",
      crop: "Onion (30 Qt)",
      amount: "₹ 28,500",
      proofStatus: "e-PoD Verified",
      riskLevel: "Low Risk",
      status: "Ready for Release",
      statusBadge: "badge-status-open"
    }
  ]
};
