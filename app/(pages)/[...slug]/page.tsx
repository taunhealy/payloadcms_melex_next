import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import React from 'react'
import { fetchPage, fetchPages } from '../../../graphql'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/seo/mergeOpenGraph'

const Page = async ({ params: { slug } }: { params: { slug: string | string[] } }) => {
  const page = await fetchPage(slug)

  if (!page) return notFound()

  return (
    <React.Fragment>
      <RenderBlocks blocks={page.layout} />
    </React.Fragment>
  )
}

export default Page

export async function generateStaticParams() {
  const pages = await fetchPages()

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/'),
  })) 
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const page = await fetchPage(slug)

  const ogImage =
    typeof page?.meta?.image === 'object' &&
    page?.meta?.image !== null &&
    'url' in page?.meta?.image &&
    `${process.env.NEXT_PUBLIC_CMS_URL}${page.meta.image.url}`

  return {
    title: page?.meta?.title || 'Payload CMS',
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      title: page?.meta?.title || 'Payload CMS',
      description: page?.meta?.description,
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
