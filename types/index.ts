// Enum for user roles
enum UserRole {
  VIEWER = "VIEWER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

// Enum for KPI access levels
enum KPIAccessLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
}

// New enum for LibraryHighlightType
enum LibraryHighlightType {
  FEATURED = "FEATURED",
  TRENDING = "TRENDING",
}

// New Favorite interface
export interface Favorite {
  id: string;
  userId: string;
  kpiId: string;
  user?: User; // Optional because we might not always need the full User data
  kpi?: KPI; // Optional because we might not always need the full KPI data
  createdAt: Date;
}

// Interface for User
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  department: string;
  adhocAccess: string[]; // Array of AccessRequest IDs
  favorites?: Favorite[]; // New field
  createdAt: Date;
  updatedAt: Date;
}

// Interface for KPI
export interface KPI {
  id: string;
  name: string;
  description: string;
  accessLevel: KPIAccessLevel;
  authorizedRoles: UserRole[];
  authorizedDepartments: string[];
  metricIds: string[]; // IDs of metrics used in this KPI
  visualizations: {
    type: string;
    config: object;
  }[];
  businessQuestions: string[];
  calculations: string;
  affiliateApplicability: string[];
}

// Interface for Department
export interface Department {
  id: string;
  name: string;
  parentDepartment?: string; // For hierarchical structure
}

// Interface for Access Policy
export interface AccessPolicy {
  id: string;
  name: string;
  rules: {
    roles: UserRole[];
    departments: string[];
    kpiAccessLevels: KPIAccessLevel[];
  };
}

// Interface for Access Request
export interface AccessRequest {
  id: string;
  userId: string;
  kpiId: string;
  requestedAt: Date;
  reason: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  reviewedBy?: string;
  reviewedAt?: Date;
  expiresAt: Date; // Expiration date for the access
  lastModified: Date; // Track when the request was last modified
}

// New LibraryHighlight interface
export interface LibraryHighlight {
  id: string;
  kpiId: string;
  kpi?: KPI; // Optional because we might not always need the full KPI data
  type: LibraryHighlightType;
  order: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
