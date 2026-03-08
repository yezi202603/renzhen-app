import { createClient } from '@supabase/supabase-js'

// 使用默认值避免构建时错误
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// 用户认证
export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  },
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// 用户资料
export const profiles = {
  async create(profile: any) {
    const { data, error } = await supabase.from('profiles').insert(profile).select().single()
    if (error) throw error
    return data
  },
  async update(userId: string, profile: any) {
    const { data, error } = await supabase.from('profiles').update(profile).eq('id', userId).select().single()
    if (error) throw error
    return data
  },
  async getByUserId(userId: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error && error.code !== 'PGRST116') throw error
    return data
  },
  async getRecommendations(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', userId)
      .limit(limit)
    if (error) throw error
    return data
  },
}

// 匹配系统
export const matching = {
  async like(fromUserId: string, toUserId: string) {
    const { data, error } = await supabase
      .from('likes')
      .insert({ from_user_id: fromUserId, to_user_id: toUserId })
      .select()
      .single()
    if (error) throw error
    
    const { data: mutualLike } = await supabase
      .from('likes')
      .select('*')
      .eq('from_user_id', toUserId)
      .eq('to_user_id', fromUserId)
      .single()
    
    if (mutualLike) {
      await supabase.from('matches').insert({ user1_id: fromUserId, user2_id: toUserId })
    }
    
    return { ...data, is_match: !!mutualLike }
  },
  async getMatches(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select(`*, user1:profiles!user1_id(*), user2:profiles!user2_id(*)`)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
  async unlike(fromUserId: string, toUserId: string) {
    const { error } = await supabase.from('likes').delete()
      .eq('from_user_id', fromUserId)
      .eq('to_user_id', toUserId)
    if (error) throw error
  },
}

// 消息
export const messages = {
  async send(matchId: number, senderId: string, content: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({ match_id: matchId, sender_id: senderId, content })
      .select()
      .single()
    if (error) throw error
    return data
  },
  async getHistory(matchId: number) {
    const { data, error } = await supabase
      .from('messages')
      .select(`*, sender:profiles!sender_id(*)`)
      .eq('match_id', matchId)
      .order('created_at', { ascending: true })
    if (error) throw error
    return data
  },
  subscribe(matchId: number, callback: (message: any) => void) {
    return supabase.channel(`messages:${matchId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `match_id=eq.${matchId}`,
      }, (payload) => callback(payload.new))
      .subscribe()
  },
}

// 举报
export const reports = {
  async create(reporterId: string, reportedId: string, reason: string) {
    const { data, error } = await supabase
      .from('reports')
      .insert({ reporter_id: reporterId, reported_id: reportedId, reason })
      .select()
      .single()
    if (error) throw error
    return data
  },
}
