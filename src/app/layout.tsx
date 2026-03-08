import './globals.css'

export const metadata = {
  title: '认真 - 严肃年轻人的交友平台',
  description: '认真脱单，不玩套路',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
