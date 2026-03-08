'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* 头部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💕</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              认真
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-rose-600 font-medium transition-colors"
            >
              登录
            </Link>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              注册
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero 区域 */}
        <section className="text-center py-16">
          <div className="inline-block mb-6">
            <span className="text-6xl animate-bounce">💑</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              认真脱单
            </span>
            <br />
            <span className="text-gray-800">不玩套路</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            为严肃交友的年轻人打造的脱单平台<br/>
            实名认证 · 精准匹配 · 安全靠谱
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              开始脱单 ✨
            </Link>
            <Link 
              href="/about" 
              className="bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold border-2 border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all"
            >
              了解更多
            </Link>
          </div>
        </section>

        {/* 数据统计 */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-600">种子用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2">
                50%
              </div>
              <div className="text-gray-600">匹配成功率</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-600">实名认证</div>
            </div>
          </div>
        </section>

        {/* 特色功能 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              为什么选择认真？
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 特色 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">实名认证</h4>
              <p className="text-gray-600 leading-relaxed">
                所有用户必须实名认证，杜绝虚假资料，让交友更安心
              </p>
            </div>
            
            {/* 特色 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">每日限量</h4>
              <p className="text-gray-600 leading-relaxed">
                每天推荐 5-10 位优质用户，宁缺毋滥，提高匹配质量
              </p>
            </div>
            
            {/* 特色 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💬</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">AI 破冰</h4>
              <p className="text-gray-600 leading-relaxed">
                AI 智能推荐聊天话题，告别尬聊，让对话更自然
              </p>
            </div>
          </div>
        </section>

        {/* 用户评价 */}
        <section className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-10">
            <span className="text-gray-800">他们在这里找到了幸福</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  小
                </div>
                <div className="ml-4">
                  <div className="font-semibold">小美</div>
                  <div className="text-sm text-gray-500">北京 · 25 岁</div>
                </div>
              </div>
              <p className="text-gray-600">
                "在认真上遇到了现在的男朋友，我们都是认真找对象的，很快就在一起了！"
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  大
                </div>
                <div className="ml-4">
                  <div className="font-semibold">大明</div>
                  <div className="text-sm text-gray-500">上海 · 28 岁</div>
                </div>
              </div>
              <p className="text-gray-600">
                "这里的用户都很真诚，没有那么多套路，推荐给大家！"
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  小
                </div>
                <div className="ml-4">
                  <div className="font-semibold">小雨</div>
                  <div className="text-sm text-gray-500">广州 · 26 岁</div>
                </div>
              </div>
              <p className="text-gray-600">
                "实名认证让我很放心，很快就找到了合适的人，感谢认真！"
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </section>

        {/* CTA 区域 */}
        <section className="text-center py-16">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-white">
            <h3 className="text-4xl font-bold mb-4">
              准备好开始你的脱单之旅了吗？
            </h3>
            <p className="text-xl mb-8 opacity-90">
              现在注册，遇见你的那个 TA
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              立即注册 - 免费 💕
            </Link>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💕</span>
                <span className="text-xl font-bold">认真</span>
              </div>
              <p className="text-gray-400">
                认真脱单，不玩套路
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/" className="block hover:text-white">首页</Link>
                <Link href="/about" className="block hover:text-white">关于我们</Link>
                <Link href="/register" className="block hover:text-white">注册</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系方式</h4>
              <div className="space-y-2 text-gray-400">
                <div>邮箱：support@renzhen.app</div>
                <div>微信：renzhen-dating</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 认真 - 严肃年轻人的交友平台</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
