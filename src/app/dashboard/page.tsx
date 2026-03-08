'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, auth, profiles, matching } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const user = await auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
    
    const profile = await profiles.getByUserId(user.id)
    setProfile(profile)
    
    if (profile) {
      const recs = await profiles.getRecommendations(user.id, 5)
      setRecommendations(recs || [])
      
      const userMatches = await matching.getMatches(user.id)
      setMatches(userMatches || [])
    }
    
    setLoading(false)
  }

  const handleLike = async (targetUserId: string) => {
    if (!user) return
    try {
      const result = await matching.like(user.id, targetUserId)
      if (result.is_match) {
        alert('🎉 互相喜欢！匹配成功！')
        checkUser()
      } else {
        alert('已发送喜欢')
      }
    } catch (error) {
      alert('操作失败')
    }
  }

  const handlePass = () => {
    // 简单实现：从列表中移除
    setRecommendations(recommendations.slice(1))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">认真</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{profile?.nickname}</span>
            <button
              onClick={async () => {
                await auth.signOut()
                router.push('/')
              }}
              className="text-gray-600 hover:text-primary-600"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 每日推荐 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">💘 每日推荐</h2>
          {recommendations.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  {recommendations[0]?.nickname?.[0] || '👤'}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {recommendations[0]?.nickname}
                </h3>
                <p className="text-gray-600 mb-4">
                  {recommendations[0]?.city} · {recommendations[0]?.gender === 'male' ? '男生' : '女生'}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handlePass}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    ❌ 跳过
                  </button>
                  <button
                    onClick={() => handleLike(recommendations[0].id)}
                    className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                  >
                    ❤️ 喜欢
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
              暂无更多推荐，明天再来吧～
            </div>
          )}
        </section>

        {/* 我的匹配 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">💕 我的匹配 ({matches.length})</h2>
          {matches.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {matches.map((match: any) => {
                const otherUser = match.user1_id === user?.id ? match.user2 : match.user1
                return (
                  <div
                    key={match.id}
                    className="bg-white rounded-xl shadow p-4 text-center cursor-pointer hover:shadow-md"
                    onClick={() => router.push(`/chat/${match.id}`)}
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
                      {otherUser?.nickname?.[0] || '👤'}
                    </div>
                    <p className="font-medium">{otherUser?.nickname}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
              还没有匹配，快去滑动找人吧～
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
