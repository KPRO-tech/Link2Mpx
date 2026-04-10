"use client"

import { motion } from "framer-motion"
import { Users, UserCheck, Download, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useStats } from "@/hooks/use-stats"

export function StatsSection() {
  const { t } = useI18n()
  const { stats, loading } = useStats()

  const statCards = [
    {
      icon: Users,
      value: stats.onlineUsers,
      label: t.stats.onlineUsers,
      color: "text-accent",
      glow: "glow-green",
    },
    {
      icon: UserCheck,
      value: stats.totalUsers,
      label: t.stats.totalUsers,
      color: "text-primary",
      glow: "glow-orange",
    },
    {
      icon: Download,
      value: stats.totalDownloadsToday,
      label: t.stats.downloadsToday,
      color: "text-accent",
      glow: "glow-green",
    },
    {
      icon: TrendingUp,
      value: stats.totalDownloads,
      label: t.stats.totalDownloads,
      color: "text-primary",
      glow: "glow-orange",
    },
  ]

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`p-3 rounded-xl bg-secondary/50 ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">
                  {loading ? (
                    <span className="inline-block w-12 h-8 rounded bg-muted animate-pulse" />
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
