import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { UserRecord, StudentProfileRecord } from "./types";
import { BRANDING_CONFIG } from "@/config/branding";

// In-memory fallback store for local development without active Supabase database
const inMemoryUsers: Map<string, UserRecord & { profile: StudentProfileRecord }> = new Map();

interface FindOrCreateStudentInput {
  microsoftUserId: string;
  microsoftTenantId: string;
  email: string;
  displayName: string;
}

interface StudentUserResult {
  user: UserRecord;
  profile: StudentProfileRecord;
  isNewUser: boolean;
}

export async function findOrCreateStudentUser({
  microsoftUserId,
  microsoftTenantId,
  email,
  displayName,
}: FindOrCreateStudentInput): Promise<StudentUserResult> {
  const compositeKey = `${microsoftUserId}_${microsoftTenantId}`;

  // If Supabase is configured, use live PostgreSQL database
  if (isSupabaseConfigured && supabase) {
    // 1. Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("microsoft_user_id", microsoftUserId)
      .eq("microsoft_tenant_id", microsoftTenantId)
      .maybeSingle();

    if (findError) {
      console.error("[Database] Error querying users table:", findError);
    }

    if (existingUser) {
      // Returning user -> Update last login timestamp
      const now = new Date().toISOString();
      await supabase
        .from("users")
        .update({ last_login_at: now, display_name: displayName })
        .eq("id", existingUser.id);

      // Fetch student profile
      const { data: profile } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", existingUser.id)
        .maybeSingle();

      return {
        user: { ...existingUser, last_login_at: now, display_name: displayName },
        profile: profile || {
          id: existingUser.id,
          user_id: existingUser.id,
          college: BRANDING_CONFIG.collegeName,
          department: null,
          branch: null,
          graduation_year: null,
          profile_completed: false,
          created_at: existingUser.created_at,
          updated_at: now,
        },
        isNewUser: false,
      };
    }

    // New student -> Insert into users table
    const { data: newUser, error: insertUserError } = await supabase
      .from("users")
      .insert({
        microsoft_user_id: microsoftUserId,
        microsoft_tenant_id: microsoftTenantId,
        email: email.toLowerCase(),
        display_name: displayName,
        is_active: true,
      })
      .select()
      .single();

    if (insertUserError || !newUser) {
      console.error("[Database] Error creating user record:", insertUserError);
      throw new Error("Could not initialize student account in database.");
    }

    // Insert initial student profile record (profile_completed = false)
    const { data: newProfile, error: insertProfileError } = await supabase
      .from("student_profiles")
      .insert({
        user_id: newUser.id,
        college: BRANDING_CONFIG.collegeName,
        profile_completed: false,
      })
      .select()
      .single();

    if (insertProfileError || !newProfile) {
      console.error("[Database] Error creating profile record:", insertProfileError);
    }

    return {
      user: newUser,
      profile: newProfile || {
        id: newUser.id,
        user_id: newUser.id,
        college: BRANDING_CONFIG.collegeName,
        department: null,
        branch: null,
        graduation_year: null,
        profile_completed: false,
        created_at: newUser.created_at,
        updated_at: newUser.created_at,
      },
      isNewUser: true,
    };
  }

  // Fallback: Local Development In-Memory Persistence
  const existing = inMemoryUsers.get(compositeKey);
  const now = new Date().toISOString();

  if (existing) {
    existing.last_login_at = now;
    existing.display_name = displayName;
    return {
      user: existing,
      profile: existing.profile,
      isNewUser: false,
    };
  }

  const generatedUserId = `usr_${Math.random().toString(36).substring(2, 11)}`;
  const newUser: UserRecord = {
    id: generatedUserId,
    microsoft_user_id: microsoftUserId,
    microsoft_tenant_id: microsoftTenantId,
    email: email.toLowerCase(),
    display_name: displayName,
    created_at: now,
    last_login_at: now,
    is_active: true,
  };

  const newProfile: StudentProfileRecord = {
    id: `prof_${Math.random().toString(36).substring(2, 11)}`,
    user_id: generatedUserId,
    college: BRANDING_CONFIG.collegeName,
    department: null,
    branch: null,
    graduation_year: null,
    profile_completed: false,
    created_at: now,
    updated_at: now,
  };

  inMemoryUsers.set(compositeKey, { ...newUser, profile: newProfile });

  return {
    user: newUser,
    profile: newProfile,
    isNewUser: true,
  };
}

export async function markStudentProfileCompleted(userId: string, updates: Partial<StudentProfileRecord>) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("student_profiles")
      .update({
        ...updates,
        profile_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("[Database] Error updating student profile:", error);
      throw error;
    }
    return data;
  }

  // In-memory fallback
  for (const item of inMemoryUsers.values()) {
    if (item.id === userId) {
      item.profile.profile_completed = true;
      if (updates.department) item.profile.department = updates.department;
      if (updates.branch) item.profile.branch = updates.branch;
      if (updates.graduation_year) item.profile.graduation_year = updates.graduation_year;
      item.profile.updated_at = new Date().toISOString();
      return item.profile;
    }
  }

  return null;
}
