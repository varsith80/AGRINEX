/**
 * AgriNex Authentication Database & Session Engine
 * Supports Default Demo Accounts + Dynamically Registered Users (localStorage persistence)
 */

const DEFAULT_AGRINEX_ACCOUNTS = {
  farmer: {
    id: "USR_FARMER_001",
    role: "Farmer",
    roleId: "ROLE_FARMER",
    email: "farmer@agrinex.in",
    phone: "9876543210",
    password: "Farmer@123",
    name: "Perumal",
    avatar: "../farmer-module/assets/images/farmer-avatar.jpg",
    location: "Lasalgaon APMC Yard, Nashik, Maharashtra",
    latitude: 20.1472,
    longitude: 74.2255,
    coordinates: [20.1472, 74.2255],
    moduleDir: "farmer-module",
    redirectUrl: "../farmer-module/index.html",
    themeColor: "#15803d"
  },
  buyer: {
    id: "USR_BUYER_001",
    role: "Buyer / Mill",
    roleId: "ROLE_BUYER",
    email: "buyer@agrifoods.com",
    phone: "9841011223",
    password: "Buyer@123",
    name: "Suresh Singhania (AgriFoods Ltd.)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    location: "Vashi APMC Terminal, Navi Mumbai",
    latitude: 19.0760,
    longitude: 73.0076,
    coordinates: [19.0760, 73.0076],
    moduleDir: "buyer-module",
    redirectUrl: "../buyer-module/index.html",
    themeColor: "#2563eb"
  },
  logistics: {
    id: "USR_LOGISTICS_001",
    role: "Logistics Provider",
    roleId: "ROLE_LOGISTICS",
    email: "transit@greenwayslogistics.in",
    phone: "9822099887",
    password: "Logistics@123",
    name: "Karthik Raja (GreenWays Transit)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    location: "Nashik Regional Transport Hub, MH",
    latitude: 19.9975,
    longitude: 73.7898,
    coordinates: [19.9975, 73.7898],
    moduleDir: "logistics-module",
    redirectUrl: "../logistics-module/index.html",
    themeColor: "#7c3aed"
  },
  admin: {
    id: "USR_ADMIN_001",
    role: "Platform Administrator",
    roleId: "ROLE_ADMIN",
    email: "admin@agrinex.gov.in",
    phone: "9000000001",
    password: "Admin@123",
    name: "Dr. A. Venkatesh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    location: "AgriNex HQ, Chennai",
    latitude: 13.0827,
    longitude: 80.2707,
    coordinates: [13.0827, 80.2707],
    moduleDir: "admin-module",
    redirectUrl: "../admin-module/index.html",
    themeColor: "#dc2626"
  }
};

class AgriNexAuth {
  /**
   * Great-Circle Haversine distance formula between two Latitude & Longitude coordinates in km
   * No GPS hardware dependency - pure spherical trigonometry
   */
  static calculateHaversineDistance(coord1, coord2) {
    if (!coord1 || !coord2) return 0;
    const c1 = Array.isArray(coord1) ? coord1 : [coord1.latitude || coord1.lat, coord1.longitude || coord1.lng];
    const c2 = Array.isArray(coord2) ? coord2 : [coord2.latitude || coord2.lat, coord2.longitude || coord2.lng];
    const R = 6371; // Earth's mean radius in km
    const dLat = (c2[0] - c1[0]) * Math.PI / 180;
    const dLon = (c2[1] - c1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  }

  /**
   * Fetch all registered accounts (built-in demo accounts + dynamically registered ones)
   */
  static getAllAccounts() {
    let localUsers = [];
    try {
      const stored = localStorage.getItem("agrinex_registered_users");
      if (stored) {
        localUsers = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error loading registered users", e);
    }

    const all = { ...DEFAULT_AGRINEX_ACCOUNTS };
    localUsers.forEach(u => {
      all[u.id || u.email] = u;
    });
    return all;
  }

  /**
   * Register a new user account with exact Latitude & Longitude coordinates
   */
  static register(userData) {
    const { roleKey, name, email, phone, password, location, businessName, latitude, longitude } = userData;
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPhone = phone ? phone.trim().replace(/[^0-9]/g, "") : "";

    if (!cleanEmail || !password || !name) {
      return { success: false, message: "Please fill in all required fields (Name, Email, Password)." };
    }

    const allAccounts = this.getAllAccounts();
    // Check if email or phone already exists
    for (const acc of Object.values(allAccounts)) {
      if (acc.email && acc.email.toLowerCase() === cleanEmail) {
        return { success: false, message: "An account with this email address already exists. Please login instead." };
      }
      if (cleanPhone && acc.phone && acc.phone.replace(/[^0-9]/g, "") === cleanPhone) {
        return { success: false, message: "An account with this phone number already exists." };
      }
    }

    const roleMap = {
      farmer: { role: "Farmer", roleId: "ROLE_FARMER", moduleDir: "farmer-module", themeColor: "#15803d", defaultAvatar: "../farmer-module/assets/images/farmer-avatar.jpg", defaultLat: 20.1472, defaultLng: 74.2255 },
      buyer: { role: "Buyer / Mill", roleId: "ROLE_BUYER", moduleDir: "buyer-module", themeColor: "#2563eb", defaultAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80", defaultLat: 19.0760, defaultLng: 73.0076 },
      logistics: { role: "Logistics Provider", roleId: "ROLE_LOGISTICS", moduleDir: "logistics-module", themeColor: "#7c3aed", defaultAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80", defaultLat: 19.9975, defaultLng: 73.7898 },
      admin: { role: "Platform Administrator", roleId: "ROLE_ADMIN", moduleDir: "admin-module", themeColor: "#dc2626", defaultAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80", defaultLat: 13.0827, defaultLng: 80.2707 }
    };

    const roleMeta = roleMap[roleKey] || roleMap.farmer;
    const isRoot = !window.location.pathname.includes("login_details");
    const targetRedirect = isRoot ? `${roleMeta.moduleDir}/index.html` : `../${roleMeta.moduleDir}/index.html`;

    const finalLat = (latitude !== undefined && latitude !== null && !isNaN(parseFloat(latitude))) ? parseFloat(latitude) : roleMeta.defaultLat;
    const finalLng = (longitude !== undefined && longitude !== null && !isNaN(parseFloat(longitude))) ? parseFloat(longitude) : roleMeta.defaultLng;

    const newUser = {
      id: `USR_${roleKey.toUpperCase()}_${Date.now()}`,
      role: roleMeta.role,
      roleId: roleMeta.roleId,
      email: cleanEmail,
      phone: cleanPhone || phone,
      password: password,
      name: businessName ? `${name} (${businessName})` : name,
      avatar: roleMeta.defaultAvatar,
      location: location || "Lasalgaon APMC Yard, Nashik, Maharashtra",
      latitude: finalLat,
      longitude: finalLng,
      coordinates: [finalLat, finalLng],
      calculationMethod: "Haversine Spherical Geodesic (Latitude & Longitude Coordinates)",
      moduleDir: roleMeta.moduleDir,
      redirectUrl: targetRedirect,
      themeColor: roleMeta.themeColor,
      isRegistered: true,
      registeredAt: new Date().toISOString()
    };

    try {
      let localUsers = [];
      const stored = localStorage.getItem("agrinex_registered_users");
      if (stored) localUsers = JSON.parse(stored);
      localUsers.push(newUser);
      localStorage.setItem("agrinex_registered_users", JSON.stringify(localUsers));
    } catch (e) {
      console.error("Failed to persist user in localStorage", e);
    }

    // Automatically create active session
    const session = {
      user: newUser,
      token: `AGX_AUTH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem("agrinex_active_session", JSON.stringify(session));
    localStorage.setItem("agrinex_token", session.token);
    localStorage.setItem("agrinex_user", JSON.stringify(session.user));
    sessionStorage.setItem("agrinex_token", session.token);
    sessionStorage.setItem("agrinex_user", JSON.stringify(session.user));

    return {
      success: true,
      user: newUser,
      redirectUrl: targetRedirect,
      message: "Account created successfully! Redirecting to your dashboard..."
    };
  }

  /**
   * Authenticate with email/phone and password
   */
  static login(identifier, password, targetRole = null) {
    identifier = (identifier || "").trim().toLowerCase();
    const cleanIdDigits = identifier.replace(/[^0-9]/g, "");
    const allAccounts = this.getAllAccounts();
    
    for (const [key, acc] of Object.entries(allAccounts)) {
      if (targetRole) {
        const matchesRole = (acc.roleId && acc.roleId.toLowerCase().includes(targetRole.toLowerCase())) || 
                            (acc.moduleDir && acc.moduleDir.includes(targetRole)) ||
                            (key === targetRole) ||
                            (targetRole === 'admin' && (acc.roleId === 'ROLE_ADMIN' || acc.moduleDir === 'admin-module'));
        if (!matchesRole) continue;
      }

      const matchesEmail = acc.email && acc.email.toLowerCase() === identifier;
      const matchesPhone = acc.phone && (acc.phone === identifier || (cleanIdDigits && acc.phone.replace(/[^0-9]/g, "") === cleanIdDigits));
      
      if ((matchesEmail || matchesPhone) && acc.password === password) {
        const isRoot = !window.location.pathname.includes("login_details");
        const redirect = isRoot ? `${acc.moduleDir}/index.html` : (acc.redirectUrl || `../${acc.moduleDir}/index.html`);
        
        const session = {
          user: acc,
          token: `AGX_AUTH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("agrinex_active_session", JSON.stringify(session));
        localStorage.setItem("agrinex_token", session.token);
        localStorage.setItem("agrinex_user", JSON.stringify(session.user));
        sessionStorage.setItem("agrinex_token", session.token);
        sessionStorage.setItem("agrinex_user", JSON.stringify(session.user));
        return { success: true, user: acc, redirectUrl: redirect };
      }
    }

    return {
      success: false,
      message: "Invalid email/phone or password. You can also use the One-Click Demo button above."
    };
  }

  /**
   * One-click demo login for any role
   */
  static quickLogin(roleKey) {
    const acc = DEFAULT_AGRINEX_ACCOUNTS[roleKey] || this.getAllAccounts()[roleKey];
    if (acc) {
      const session = {
        user: acc,
        token: `AGX_DEMO_${Date.now()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem("agrinex_active_session", JSON.stringify(session));
      localStorage.setItem("agrinex_token", session.token);
      localStorage.setItem("agrinex_user", JSON.stringify(session.user));
      sessionStorage.setItem("agrinex_token", session.token);
      sessionStorage.setItem("agrinex_user", JSON.stringify(session.user));
      const isRoot = !window.location.pathname.includes("login_details");
      const targetPath = isRoot ? `${acc.moduleDir}/index.html` : (acc.redirectUrl || `../${acc.moduleDir}/index.html`);
      window.location.href = targetPath;
    }
  }

  static getActiveSession() {
    const data = localStorage.getItem("agrinex_active_session");
    return data ? JSON.parse(data) : null;
  }

  static logout() {
    localStorage.removeItem("agrinex_active_session");
    localStorage.removeItem("agrinex_token");
    localStorage.removeItem("agrinex_user");
    sessionStorage.removeItem("agrinex_token");
    sessionStorage.removeItem("agrinex_user");
    const isInsideLogin = window.location.pathname.includes("login_details");
    const isRoot = window.location.pathname.endsWith("index.html") && !isInsideLogin;
    window.location.href = isInsideLogin ? "../index.html" : (isRoot ? "index.html" : "../index.html");
  }
}

// Global exposure
window.AgriNexAuth = AgriNexAuth;
window.AGRINEX_ACCOUNTS = DEFAULT_AGRINEX_ACCOUNTS;

