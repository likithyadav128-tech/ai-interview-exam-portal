-- ==============================================================================
-- AI Placement Prep — University Database Schema (PostgreSQL / Supabase)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Stores authenticated Microsoft Entra ID identities)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    microsoft_user_id VARCHAR(255) NOT NULL,
    microsoft_tenant_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Composite unique constraint ensuring identity uniqueness per Microsoft tenant
    CONSTRAINT uq_microsoft_user_tenant UNIQUE (microsoft_user_id, microsoft_tenant_id)
);

-- Index for fast user lookup during Microsoft OAuth callbacks
CREATE INDEX IF NOT EXISTS idx_users_microsoft_lookup 
ON public.users(microsoft_user_id, microsoft_tenant_id);

CREATE INDEX IF NOT EXISTS idx_users_email 
ON public.users(email);


-- 2. Student Profiles Table (Stores academic details & onboarding state)
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    college VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    branch VARCHAR(100),
    graduation_year INT,
    profile_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- One profile per user
    CONSTRAINT uq_student_profiles_user UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_student_profiles_user 
ON public.student_profiles(user_id);


-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Helper Trigger for updated_at on student_profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_student_profiles_updated_at ON public.student_profiles;
CREATE TRIGGER trg_student_profiles_updated_at
    BEFORE UPDATE ON public.student_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
