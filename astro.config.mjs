// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightImageZoom from 'starlight-image-zoom';
import starlightScrollToTop from 'starlight-scroll-to-top';


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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/SunriseCommunity/Compass' }, 
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.sunrize.uk',
				},
				{
					icon: 'rocket',
					label: 'Server Instance',
					href: 'https://sunrize.uk',
				}
			],
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
			description: 'Documentation for the Sunrise osu! server project, including setup guides and configuration options.',
			plugins: [starlightThemeRapide(), starlightImageZoom(), starlightScrollToTop()],
			customCss: [
				'./src/styles/custom.css'
			],
		}),
		mermaid()
	],
});
