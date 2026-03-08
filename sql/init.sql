-- ============================================
-- 认真交友平台 - Supabase 数据库初始化脚本
-- 运行方式：Supabase Dashboard → SQL Editor → 粘贴运行
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 用户资料表
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  birthday DATE,
  city TEXT,
  avatar_url TEXT,
  photos TEXT[],
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户资料索引
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_active ON profiles(is_active);

-- ============================================
-- 2. 喜欢表
-- ============================================
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- 喜欢表索引
CREATE INDEX IF NOT EXISTS idx_likes_from ON likes(from_user_id);
CREATE INDEX IF NOT EXISTS idx_likes_to ON likes(to_user_id);
CREATE INDEX IF NOT EXISTS idx_likes_status ON likes(status);

-- ============================================
-- 3. 匹配表
-- ============================================
CREATE TABLE IF NOT EXISTS matches (
  id BIGSERIAL PRIMARY KEY,
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- 匹配表索引
CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id);

-- ============================================
-- 4. 消息表
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 消息表索引
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- ============================================
-- 5. 举报表
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
  id BIGSERIAL PRIMARY KEY,
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 举报表索引
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_reports_reported ON reports(reported_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- ============================================
-- 6. 每日推荐缓存表
-- ============================================
CREATE TABLE IF NOT EXISTS daily_recommendations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recommended_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  is_liked BOOLEAN DEFAULT FALSE,
  is_passed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recommended_user_id, date)
);

-- 推荐表索引
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON daily_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_date ON daily_recommendations(date);

-- ============================================
-- 7. 行级安全策略 (RLS)
-- ============================================

-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- profiles 策略
CREATE POLICY "用户可查看自己的资料" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "用户可查看其他用户的公开资料" ON profiles
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "用户可更新自己的资料" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "用户可插入自己的资料" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- likes 策略
CREATE POLICY "用户可查看自己的喜欢" ON likes
  FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "用户可创建喜欢" ON likes
  FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- matches 策略
CREATE POLICY "用户可查看自己的匹配" ON matches
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- messages 策略
CREATE POLICY "用户可查看自己匹配的消息" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
    )
  );

CREATE POLICY "用户可发送消息" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- reports 策略
CREATE POLICY "用户可创建举报" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "用户可查看自己的举报" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- ============================================
-- 8. 自动更新 updated_at 的触发器
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 9. 用户注册后自动创建 profile 的触发器
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 10. 启用 Realtime
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- ============================================
-- 完成！
-- ============================================
