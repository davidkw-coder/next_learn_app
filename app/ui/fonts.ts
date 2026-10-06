import localFont from 'next/font/local';

export const inter = localFont({
	src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
	weight: '100 900',
});

export const lusitana = localFont({
	src: [
		{
			path: '../../node_modules/@fontsource/lusitana/files/lusitana-latin-400-normal.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../node_modules/@fontsource/lusitana/files/lusitana-latin-700-normal.woff2',
			weight: '700',
			style: 'normal',
		},
	],
});