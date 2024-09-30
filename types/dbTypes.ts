// Interface for raw KPI data as stored in the database
export interface KPI {
  id: string;
  name: string;
  description: string;
  accessLevel: string;
  authorizedRoles: string;
  authorizedDepartments: string;
  metricIds: string;
  visualizations: string;
  businessQuestions: string;
  calculations: string;
  affiliateApplicability: string;
  createdAt: string;
  updatedAt: string;
}

export interface Layout {
  id: string;
  name: string;
  userId: string;
  kpiIds: string;
  createdAt: string;
  updatedAt: string;
}
