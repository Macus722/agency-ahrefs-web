import os
import re
import urllib.parse

base_dir = r"c:\Users\desmo\Herd\landing_page"

regex = re.compile(
    r'<span class="inline-flex items-center gap-2">\s*<span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white font-bold text-sm">A</span>\s*<span class="text-\[17px\][^>]+>\s*Agency Ahrefs\s*</span>\s*</span>',
    re.IGNORECASE | re.MULTILINE
)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html") or file.endswith('.js'):
                filepath = os.path.join(root, file)
                
                rel_path = os.path.relpath(root, base_dir)
                if rel_path == '.':
                    asset_path = 'assets/Agency Ahrefs, seo authority website logo.jpg'
                else:
                    depth = len(rel_path.split(os.sep))
                    asset_path = '../' * depth + 'assets/Agency Ahrefs, seo authority website logo.jpg'
                    
                replacement = f'<img src="{asset_path}" alt="Agency Ahrefs SEO Authority Logo" class="h-8 w-auto object-contain">'
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                new_content = regex.sub(replacement, content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

process_directory(base_dir)
