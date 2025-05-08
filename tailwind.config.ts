
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Luxury brand colors - updated to soft elegant palette
				luxe: {
					white: "#FFFFFF",
					offwhite: "#F9F8FD", // Softer off-white with slight purple undertone
					taupe: {
						light: "#E0DFE7", // Lighter with purple hint
						DEFAULT: "#9A979F",
						dark: "#4E4B54",
					},
					green: "#E8F6F3", // More teal than green now
					gold: "#D4B483", // Softer gold
					// New elegant palette
					pink: "#F9E0E3", // Soft rose
					blue: "#E0E9F5", // Soft blue
					lavender: "#EBE5FF", // Soft lavender
					peach: "#F9E8E1", // Soft peach
					mint: "#E0F5EF", // Soft mint
					yellow: "#F6F2E4", // Soft cream
					sage: "#E5EDE8", // Soft sage
					mauve: "#E5DBDB", // Soft mauve
					cream: "#F8F5F0", // Soft cream
					blush: "#F5E4E4", // Soft blush
					navy: "#1A2A40", // Deep navy for contrast
					charcoal: "#333745", // Rich charcoal
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'fade-in-right': 'fade-in-right 0.7s ease-out',
				'float': 'float 5s ease-in-out infinite',
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			boxShadow: {
				'soft': '0 10px 25px -3px rgba(0, 0, 0, 0.05)',
				'elegant': '0 10px 30px -3px rgba(0, 0, 0, 0.08)',
				'card': '0 15px 35px rgba(0, 0, 0, 0.05)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-elegant': 'linear-gradient(to right, #F9F8FD, #F0EFFA)',
				'gradient-gold': 'linear-gradient(to right, #D4B483, #E9D8B4)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
