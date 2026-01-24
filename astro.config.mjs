// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightThemeRapide from 'starlight-theme-rapide'

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.sunrize.uk',
	integrations: [
		starlight({
			favicon: '/favicon.svg',
			title: 'Sunrise - osu! Server',
			logo: {
				src: '/public/favicon.svg',
				alt: 'Sunrise Compass',
	
			},
			tableOfContents: {
				maxHeadingLevel: 4,
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/SunriseCommunity/Compass' }],
			sidebar: [
				{
					label: 'Getting started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Upgrading',
					autogenerate: { directory: 'upgrading' },
				},
				{
					label: 'Contributing', link: "/contributing/"	
				},
				{
					label: 'Deprecated',
					collapsed: true,
					autogenerate: { directory: 'deprecated' },					
				},
			],
			plugins: [starlightThemeRapide()],
			customCss: [
				'./src/styles/custom.css'
			],
		}),
		mermaid()
	],
});
