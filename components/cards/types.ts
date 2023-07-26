import type { CMSLinkType } from '@/components/CMSLink'
import type { Media } from '@/payload-types'

export interface SharedProps {
  price?: string
  title?: string
  description?: string
  className?: string
}

export interface SquareCardProps extends SharedProps {
  leader?: string
  link?: CMSLinkType
}

export interface BlogCardProps extends SharedProps {
  media: Media | string
  href: string
}

export interface PricingCardProps extends SharedProps {
  leader?: string
  link?: CMSLinkType
}

export interface DefaultCardProps extends SharedProps {
  leader?: string
  media?: Media | string
  href?: string
  onClick?: () => void
}
