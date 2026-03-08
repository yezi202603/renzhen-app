#!/bin/bash

# Supabase 配置
SUPABASE_URL="https://lpmnqgedscynzlyujgpt.supabase.co"
SUPABASE_KEY="sb_secret_DeA1x9RyP2_Ie6ecAs-dZQ_oKm9ThvJ"

# 创建 profiles 表
echo "创建 profiles 表..."
curl -s -X POST "$SUPABASE_URL/rest/v1/profiles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"id":"00000000-0000-0000-0000-000000000000","email":"test@test.com"}' \
  | head -20

echo "完成"
