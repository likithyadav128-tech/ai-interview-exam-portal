export interface UserRecord {
  id: string; // UUID
  microsoft_user_id: string;
  microsoft_tenant_id: string;
  email: string;
  display_name: string;
  created_at: string;
  last_login_at: string;
  is_active: boolean;
}

export interface StudentProfileRecord {
  id: string; // UUID
  user_id: string; // references users(id)
  college: string;
  department: string | null;
  branch: string | null;
  graduation_year: number | null;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthenticatedStudentSession {
  user: {
    id: string;
    email: string;
    name: string;
    microsoftUserId: string;
    microsoftTenantId: string;
    profileCompleted: boolean;
    department?: string | null;
    graduationYear?: number | null;
  };
}
