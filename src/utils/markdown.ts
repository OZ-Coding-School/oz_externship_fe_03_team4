import { marked } from 'marked'

export const markdownToHtml = (md: string) => marked.parse(md ?? '')
