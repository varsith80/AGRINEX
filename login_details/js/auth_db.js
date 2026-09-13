/**
 * AgriNex Authentication Database & Session Engine
 */

const AGRINEX_ACCOUNTS = {
  farmer: {
    role: "Farmer",
    roleId: "ROLE_FARMER",
    email: "farmer@agrinex.in",
    phone: "9876543210",
    password: "Farmer@123",
    name: "Ramesh Kumar",
    avatar: "../farmer-module/assets/images/farmer-avatar.jpg",
    location: "Erode, Tamil Nadu",
    redirectUrl: "../farmer-module/index.html",
    themeColor: "#15803d"
  },
  buyer: {
    role: "Buyer / Mill",
    roleId: "ROLE_BUYER",
    email: "buyer@agrifoods.com",
    phone: "9841011223",
    password: "Buyer@123",
    name: "Suresh Singhania (AgriFoods Ltd.)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    location: "Coimbatore, Tamil Nadu",
    redirectUrl: "../farmer-module/index.html?role=buyer",
    themeColor: "#2563eb"
  },
  logistics: {
    role: "Logistics Provider",
    roleId: "ROLE_LOGISTICS",
    email: "transit@greenwayslogistics.in",
    phone: "9822099887",
    password: "Logistics@123",
    name: "Karthik Raja (GreenWays Transit)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    location: "Salem Regional Hub, TN",
    redirectUrl: "../farmer-module/index.html?role=logistics",
    themeColor: "#7c3aed"
  },
  admin: {
    role: "Platform Administrator",
    roleId: "ROLE_ADMIN",
    email: "admin@agrinex.gov.in",
    phone: "9000000001",
    password: "Admin@123",
    name: "Dr. A. Venkatesh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    location: "AgriNex HQ, Chennai",
    redirectUrl: "../farmer-module/index.html?role=admin",
    themeColor: "#dc2626"
  }
};

class AgriNexAuth {
  static login(identifier, password, targetRole = null) {
    identifier = identifier.trim().toLowerCase();
    
    // Check across accounts
    for (const [key, acc] of Object.entries(AGRINEX_ACCOUNTS)) {
      if (targetRole && key !== targetRole) continue;

      const matchesEmail = acc.email.toLowerCase() === identifier;
      const matchesPhone = acc.phone === identifier;
      
      if ((matchesEmail || matchesPhone) && acc.password === password) {
        const session = {
          user: acc,
          token: `AGX_AUTH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("agrinex_active_session", JSON.stringify(session));
        return { success: true, user: acc, redirectUrl: acc.redirectUrl };
      }
    }

    return {
      success: false,
      message: "Invalid credentials. Please check your email/phone and password."
    };
  }

  static quickLogin(roleKey) {
    const acc = AGRINEX_ACCOUNTS[roleKey];
    if (acc) {
      const session = {
        user: acc,
        token: `AGX_DEMO_${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem("agrinex_active_session", JSON.stringify(session));
      window.location.href = acc.redirectUrl;
    }
  }

  static getActiveSession() {
    const data = localStorage.getItem("agrinex_active_session");
    return data ? JSON.parse(data) : null;
  }

  static logout() {
    localStorage.removeItem("agrinex_active_session");
    window.location.href = "../index.html";
  }
}
