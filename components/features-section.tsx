"use client"

import { motion } from "framer-motion"
import { Zap, Film, Globe, Music } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: Zap,
      title: t.features.fast.title,
      description: t.features.fast.description,
      iconColor: "text-primary",
      borderColor: "border-primary/20",
      bgColor: "bg-primary/10",
    },
    {
      icon: Film,
      title: t.features.quality.title,
      description: t.features.quality.description,
      iconColor: "text-accent",
      borderColor: "border-accent/20",
      bgColor: "bg-accent/10",
    },
    {
      icon: Globe,
      title: t.features.multi.title,
      description: t.features.multi.description,
      iconColor: "text-primary",
      borderColor: "border-primary/20",
      bgColor: "bg-primary/10",
    },
    {
      icon: Music,
      title: t.features.audio.title,
      description: t.features.audio.description,
      iconColor: "text-accent",
      borderColor: "border-accent/20",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            {t.features.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`flex flex-col items-center gap-4 p-8 rounded-2xl glass border ${feature.borderColor} text-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className={`p-4 rounded-2xl ${feature.bgColor} ${feature.iconColor}`}
              >
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
