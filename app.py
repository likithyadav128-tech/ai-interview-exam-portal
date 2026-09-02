import streamlit as st
import streamlit.components.v1 as components
import os
import glob
import re

# Page configuration
st.set_page_config(
    page_title="AI Career & Placement Exam Portal 2026",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to eliminate all Streamlit margins and embed full-screen React UI
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {
        padding: 0 !important;
        max-width: 100% !important;
        margin: 0 !important;
    }
    div[data-testid="stVerticalBlock"] {
        gap: 0 !important;
    }
    iframe {
        width: 100vw !important;
        height: 100vh !important;
        min-height: 1000px !important;
        border: none !important;
    }
</style>
""", unsafe_allow_html=True)

base_dir = os.path.dirname(os.path.abspath(__file__))
dist_index_path = os.path.join(base_dir, "dist", "index.html")

if os.path.exists(dist_index_path):
    with open(dist_index_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Find and read CSS assets
    css_files = glob.glob(os.path.join(base_dir, "dist", "assets", "*.css"))
    css_bundle = ""
    for css_file in css_files:
        with open(css_file, "r", encoding="utf-8") as cf:
            css_bundle += cf.read() + "\n"

    # Find and read JS assets
    js_files = glob.glob(os.path.join(base_dir, "dist", "assets", "*.js"))
    js_bundle = ""
    for js_file in js_files:
        with open(js_file, "r", encoding="utf-8") as jf:
            js_bundle += jf.read() + "\n"

    # Remove external relative link and script tags
    html_content = re.sub(r'<link\s+rel="stylesheet"[^>]*>', '', html_content)
    html_content = re.sub(r'<script\s+type="module"[^>]*></script>', '', html_content)

    # Inject full bundled CSS and JS into standalone HTML
    custom_head = f"""
    <style>
    {css_bundle}
    </style>
    """
    custom_body = f"""
    <script type="module">
    {js_bundle}
    </script>
    """
    
    html_content = html_content.replace('</head>', f'{custom_head}</head>')
    html_content = html_content.replace('</body>', f'{custom_body}</body>')

    # Render complete React SPA
    components.html(html_content, height=1200, scrolling=True)
else:
    st.error("Production build not found. Please run 'npm run build' first.")
