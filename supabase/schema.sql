-- ====================================================================
-- STITCHCRAFT DATABASE DDL MIGRATION (Supabase / PostgreSQL)
-- Phase 1 Foundation
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Authentication profile linking)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PATTERNS TABLE (Domain Content & Seed Data)
CREATE TABLE IF NOT EXISTS patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(150) NOT NULL,
  difficulty VARCHAR(30) CHECK (difficulty IN ('Beginner', 'Advanced Beginner', 'Intermediate', 'Advanced')),
  yarn_weight VARCHAR(50) NOT NULL,
  recommended_hook VARCHAR(10) NOT NULL,
  recommended_eye_size VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL,
  instructions JSONB NOT NULL,
  video_url TEXT NOT NULL,
  image_urls TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. USER_PROJECTS TABLE (Primary CRUD Entity with Dynamic JSON map)
CREATE TABLE IF NOT EXISTS user_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id) ON DELETE SET NULL,
  project_name VARCHAR(150) NOT NULL,
  target_yarn VARCHAR(50) NOT NULL,
  target_hook VARCHAR(10) NOT NULL,
  target_eye_size VARCHAR(10) NOT NULL,
  -- Schema: {"part_name": {"current_row": 0, "total_rows": 15, "completed": false}}
  part_progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  overall_completion INT DEFAULT 0 CHECK (overall_completion BETWEEN 0 AND 100),
  status VARCHAR(20) DEFAULT 'In Progress' CHECK (status IN ('Planning', 'In Progress', 'Completed', 'Frogged')),
  personal_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. USER_FAVORITES TABLE (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pattern_id UUID NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pattern_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Patterns are public to read
CREATE POLICY "Public patterns read" ON patterns
  FOR SELECT USING (true);

-- User projects accessible only by owner
CREATE POLICY "Users can manage own projects" ON user_projects
  FOR ALL USING (auth.uid() = user_id);

-- User favorites accessible only by owner
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Users profile read/write
CREATE POLICY "Users can view and update own profile" ON users
  FOR ALL USING (auth.uid() = id);
