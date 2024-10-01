export enum UserRole {
  VIEWER = "VIEWER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export enum KPIAccessLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
}

export enum LibraryHighlightType {
  FEATURED = "FEATURED",
  TRENDING = "TRENDING",
}

export interface Favorite {
  id: string;
  userId: string;
  kpiId: string;
  user?: User;
  kpi?: KPI;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  department: string;
  adhocAccess: string[];
  favorites?: Favorite[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  accessLevel: KPIAccessLevel;
  authorizedRoles: UserRole[];
  authorizedDepartments: string[];
  metricIds: string[];
  visualizations: {
    type: string;
    config: object;
  }[];
  businessQuestions: string[];
  calculations: string;
  affiliateApplicability: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  parentDepartment?: string;
}

export interface AccessPolicy {
  id: string;
  name: string;
  rules: {
    roles: UserRole[];
    departments: string[];
    kpiAccessLevels: KPIAccessLevel[];
  };
}

export interface AccessRequest {
  id: string;
  userId: string;
  kpiId: string;
  requestedAt: Date;
  reason: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  reviewedBy?: string;
  reviewedAt?: Date;
  expiresAt: Date;
  lastModified: Date;
}

export interface LibraryHighlight {
  id: string;
  kpiId: string;
  kpi: KPI;
  type: LibraryHighlightType;
  order: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Layout {
  id: string;
  name: string;
  userId: string;
  kpiIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
