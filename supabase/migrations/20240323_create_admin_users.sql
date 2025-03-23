-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow admins to view the admin_users table
CREATE POLICY "Admins can view admin_users" 
  ON admin_users 
  FOR SELECT 
  USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Only allow service role to insert/update/delete
CREATE POLICY "Service role can manage admin_users" 
  ON admin_users 
  USING (
    (SELECT is_service_role() FROM auth.users WHERE id = auth.uid())
  );

