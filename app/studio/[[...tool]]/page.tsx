'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

const studioBasePath = '/studio'

export default function StudioPage() {
  return <NextStudio config={config} basePath={studioBasePath} />
}
