#!/usr/bin/env python3
"""
Convert emerald/zinc dark theme → navy/blue theme matching https://makedeal-phi.vercel.app/

Reference theme colors:
- Header / Footer / Hero bg: #0B1B3A (dark navy)
- Hero gradient: #0B1B3A → #102956 → #0B1B3A
- Primary accent: blue-600 (#2563EB)
- Secondary accent: indigo-600 (#4F46E5)
- Page body: white / gray-50
- Cards: white with gray-200 borders
- Primary text on light: gray-900
- Secondary text on light: gray-600
- Muted text on light: gray-500

Two file categories:
- DARK files (Navbar, Footer, AdminLoginView, HomeView hero only): keep dark navy bg, blue accents
- LIGHT files (everything else): convert to white/gray-50 with blue accents
"""

import os
import re
from pathlib import Path

SRC_DIR = Path('/home/z/my-project/src')

# Files that should stay DARK (navy) — header, footer, hero, focused auth screen
DARK_FILES = {
    'components/marketplace/Navbar.tsx',
    'components/marketplace/Footer.tsx',
    'components/views/AdminLoginView.tsx',
}

# Files that have BOTH dark hero and light body — handle specially
HYBRID_FILES = {
    'components/views/HomeView.tsx',
    'components/views/BlogIndexView.tsx',  # has dark hero
    'components/views/BlogPostView.tsx',    # has dark hero
    'components/views/FeaturesArticleView.tsx',  # has dark hero
}

# Replacements for ALL files (emerald → blue)
EMERALD_TO_BLUE = [
    # accent text (used on both dark and light)
    ('emerald-300', 'blue-300'),
    ('emerald-400', 'blue-400'),
    ('emerald-500', 'blue-500'),
    ('emerald-600', 'blue-600'),
    ('emerald-700', 'blue-700'),
    ('emerald-800', 'blue-800'),
    ('emerald-900/40', 'blue-900/40'),
    ('emerald-900/30', 'blue-900/30'),
    ('emerald-900/20', 'blue-900/20'),
    ('emerald-700/40', 'blue-700/40'),
    ('emerald-700/60', 'blue-700/60'),
    ('emerald-800/40', 'blue-800/40'),
    ('emerald-900/10', 'blue-900/10'),
    ('emerald-600/30', 'blue-600/30'),
    ('emerald-600/20', 'blue-600/20'),
    ('emerald-600/10', 'blue-600/10'),
    ('emerald-500/50', 'blue-500/50'),
    ('emerald-500/30', 'blue-500/30'),
    ('emerald-500/20', 'blue-500/20'),
]

# For DARK files: zinc-950 → navy (#0B1B3A), zinc-900 → #102956
DARK_THEME_REPLACEMENTS = [
    # Navy backgrounds
    ('bg-zinc-950/95', 'bg-[#0B1B3A]/95'),
    ('bg-zinc-950/90', 'bg-[#0B1B3A]/90'),
    ('bg-zinc-950/80', 'bg-[#0B1B3A]/80'),
    ('bg-zinc-950/70', 'bg-[#0B1B3A]/70'),
    ('bg-zinc-950/40', 'bg-[#0B1B3A]/40'),
    ('bg-zinc-950', 'bg-[#0B1B3A]'),
    ('bg-zinc-900/40', 'bg-[#102956]/40'),
    ('bg-zinc-900/30', 'bg-[#102956]/30'),
    ('bg-zinc-900/20', 'bg-[#102956]/20'),
    ('bg-zinc-900/10', 'bg-[#102956]/10'),
    ('bg-zinc-900', 'bg-[#102956]'),
    ('bg-zinc-800/50', 'bg-[#1d3a6e]/50'),
    ('bg-zinc-800/40', 'bg-[#1d3a6e]/40'),
    ('bg-zinc-800', 'bg-[#1d3a6e]'),
    ('bg-zinc-950/50', 'bg-[#0B1B3A]/50'),

    # Hover states
    ('hover:bg-zinc-900', 'hover:bg-[#102956]'),
    ('hover:bg-zinc-800', 'hover:bg-[#1d3a6e]'),
    ('hover:bg-zinc-700', 'hover:bg-[#2b4a85]'),

    # Borders
    ('border-zinc-800/60', 'border-[#1d3a6e]/60'),
    ('border-zinc-800/50', 'border-[#1d3a6e]/50'),
    ('border-zinc-800/40', 'border-[#1d3a6e]/40'),
    ('border-zinc-800', 'border-[#1d3a6e]'),
    ('border-zinc-700', 'border-[#2b4a85]'),

    # Text colors stay the same (white/zinc work on dark navy)
    # but we need to keep some emerald-like accent → blue
]

# For LIGHT files: zinc-950 → gray-50, zinc-900 → white, zinc-800 → gray-200
LIGHT_THEME_REPLACEMENTS = [
    # Page backgrounds
    ('bg-zinc-950/95', 'bg-white/95'),
    ('bg-zinc-950/90', 'bg-white/90'),
    ('bg-zinc-950/80', 'bg-white/80'),
    ('bg-zinc-950/70', 'bg-white/70'),
    ('bg-zinc-950/50', 'bg-white/50'),
    ('bg-zinc-950/40', 'bg-white/40'),
    ('bg-zinc-950/30', 'bg-white/30'),
    ('bg-zinc-950/20', 'bg-white/20'),
    ('bg-zinc-950/10', 'bg-white/10'),
    ('bg-zinc-950', 'bg-gray-50'),

    # Card backgrounds
    ('bg-zinc-900/40', 'bg-white'),
    ('bg-zinc-900/30', 'bg-gray-50'),
    ('bg-zinc-900/20', 'bg-gray-100'),
    ('bg-zinc-900/10', 'bg-gray-100'),
    ('bg-zinc-900', 'bg-white'),

    ('bg-zinc-800/50', 'bg-gray-100'),
    ('bg-zinc-800/40', 'bg-gray-100'),
    ('bg-zinc-800/30', 'bg-gray-100'),
    ('bg-zinc-800/20', 'bg-gray-100'),
    ('bg-zinc-800', 'bg-gray-100'),

    # Hover states
    ('hover:bg-zinc-900', 'hover:bg-gray-100'),
    ('hover:bg-zinc-800', 'hover:bg-gray-100'),
    ('hover:bg-zinc-700', 'hover:bg-gray-200'),

    # Borders
    ('border-zinc-800/60', 'border-gray-200'),
    ('border-zinc-800/50', 'border-gray-200'),
    ('border-zinc-800/40', 'border-gray-200'),
    ('border-zinc-800', 'border-gray-200'),
    ('border-zinc-700', 'border-gray-300'),

    # Divide
    ('divide-zinc-800', 'divide-gray-200'),
    ('divide-zinc-700', 'divide-gray-300'),

    # Text colors (dark text on light bg)
    ('text-white', 'text-gray-900'),
    ('text-zinc-200', 'text-gray-800'),
    ('text-zinc-300', 'text-gray-700'),
    ('text-zinc-400', 'text-gray-600'),
    ('text-zinc-500', 'text-gray-500'),
    ('text-zinc-600', 'text-gray-400'),
    ('text-zinc-700', 'text-gray-400'),

    # Placeholder
    ('placeholder:text-zinc-500', 'placeholder:text-gray-400'),
    ('placeholder:text-zinc-400', 'placeholder:text-gray-400'),
    ('placeholder:text-zinc-300', 'placeholder:text-gray-400'),
    ('placeholder:text-blue-300', 'placeholder:text-gray-400'),
    ('placeholder:text-blue-200', 'placeholder:text-gray-400'),
    ('placeholder:text-blue-300/70', 'placeholder:text-gray-400'),
    ('placeholder:text-blue-300/60', 'placeholder:text-gray-400'),
    ('placeholder-blue-300', 'placeholder-gray-400'),
    ('placeholder-blue-200', 'placeholder-gray-400'),

    # Ring colors
    ('focus-visible:ring-emerald-600/20', 'focus-visible:ring-blue-600/20'),
    ('focus-visible:ring-blue-600/20', 'focus-visible:ring-blue-600/20'),
    ('focus:ring-blue-500/30', 'focus:ring-blue-500/30'),
    ('focus:ring-emerald-500/30', 'focus:ring-blue-500/30'),
    ('focus:border-emerald-600', 'focus:border-blue-600'),
    ('focus:border-emerald-400', 'focus:border-blue-500'),
    ('focus:outline-none', 'focus:outline-none'),

    # Text selection (keep)
    ('selection:bg-blue-600', 'selection:bg-blue-600'),
    ('selection:text-white', 'selection:text-white'),
]

# Hero gradient replacements (for HYBRID files)
HERO_GRADIENT_REPLACEMENTS = [
    ('from-zinc-900 via-zinc-950 to-zinc-950', 'from-[#0B1B3A] via-[#102956] to-[#0B1B3A]'),
    ('from-zinc-900', 'from-[#0B1B3A]'),
    ('via-zinc-950', 'via-[#102956]'),
    ('to-zinc-950', 'to-[#0B1B3A]'),
]

def apply_replacements(content, replacements):
    for old, new in replacements:
        content = content.replace(old, new)
    return content

def process_file(filepath: Path, file_mode: str):
    """file_mode: 'dark', 'light', 'hybrid'"""
    rel_path = str(filepath.relative_to(SRC_DIR))

    with open(filepath, 'r') as f:
        original = f.read()

    content = original

    # Step 1: Apply emerald → blue to all files
    content = apply_replacements(content, EMERALD_TO_BLUE)

    if file_mode == 'dark':
        # Dark theme: zinc → navy
        content = apply_replacements(content, DARK_THEME_REPLACEMENTS)
    elif file_mode == 'light':
        # Light theme: zinc → white/gray
        content = apply_replacements(content, LIGHT_THEME_REPLACEMENTS)
    elif file_mode == 'hybrid':
        # Hybrid: apply hero gradient first, then light theme for the rest
        content = apply_replacements(content, HERO_GRADIENT_REPLACEMENTS)
        content = apply_replacements(content, LIGHT_THEME_REPLACEMENTS)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f'  ✓ {rel_path} ({file_mode})')
        return True
    return False

def main():
    print('🎨 Converting theme: emerald/zinc → navy/blue\n')

    # Find all .tsx files in components/
    components_dir = SRC_DIR / 'components'
    changed = 0
    for filepath in components_dir.rglob('*.tsx'):
        rel = str(filepath.relative_to(SRC_DIR))
        if rel in DARK_FILES:
            mode = 'dark'
        elif rel in HYBRID_FILES:
            mode = 'hybrid'
        else:
            mode = 'light'
        if process_file(filepath, mode):
            changed += 1

    # Also process page.tsx
    page_tsx = SRC_DIR / 'app' / 'page.tsx'
    if process_file(page_tsx, 'light'):
        changed += 1

    print(f'\n✅ {changed} files updated')

if __name__ == '__main__':
    main()
