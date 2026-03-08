import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* 头部 */}
      <header className="p-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">认真</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-primary-600">
              登录
            </Link>
            <Link 
              href="/register" 
              className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700"
            >
              注册
            </Link>
          </div>
        </nav>
      </header>

      {/* 主内容区 */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          认真脱单，不玩套路
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          为严肃交友的年轻人打造的脱单平台
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <Link 
            href="/register" 
            className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 shadow-lg"
          >
            开始脱单
          </Link>
          <Link 
            href="/about" 
            className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 shadow-lg"
          >
            了解更多
          </Link>
        </div>

        {/* 特色功能 */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">实名认证</h3>
            <p className="text-gray-600">
              所有用户必须实名认证，杜绝虚假资料，让交友更安心
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">每日限量</h3>
            <p className="text-gray-600">
              每天推荐 5-10 位优质用户，宁缺毋滥，提高匹配质量
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">AI 破冰</h3>
            <p className="text-gray-600">
              AI 智能推荐聊天话题，告别尬聊，让对话更自然
            </p>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">种子用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50%</div>
              <div className="text-gray-600">匹配成功率</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">实名认证</div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 认真 - 严肃年轻人的交友平台
          </p>
        </div>
      </footer>
    </main>
  )
}
