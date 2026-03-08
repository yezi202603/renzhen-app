const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://lpmnqgedscynzlyujgpt.supabase.co'
const SUPABASE_SERVICE_KEY = 'sb_secret_DeA1x9RyP2_Ie6ecAs-dZQ_oKm9ThvJ'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function runSQL() {
  console.log('正在连接 Supabase...')
  
  // 测试连接
  const { data, error } = await supabase.from('profiles').select('count')
  
  if (error) {
    console.log('连接测试错误（可能表还不存在，这是正常的）:', error.message)
  } else {
    console.log('连接成功！')
  }
  
  console.log('\n由于 Supabase API 限制，无法直接执行 DDL 语句（CREATE TABLE 等）')
  console.log('需要手动在 Dashboard 中运行 SQL\n')
  console.log('请按以下步骤操作：')
  console.log('1. 访问：https://supabase.com/dashboard')
  console.log('2. 选择项目：renzhen-dating')
  console.log('3. 左侧菜单 → SQL Editor → New Query')
  console.log('4. 复制文件内容：/root/.openclaw/workspace/renzhen-app/apps/web/sql/init.sql')
  console.log('5. 粘贴到 SQL Editor')
  console.log('6. 点击 Run 按钮')
  console.log('\n完成后告诉我 "SQL 运行成功"')
}

runSQL()
