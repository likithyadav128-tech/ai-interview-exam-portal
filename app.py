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

# Custom CSS to eliminate all Streamlit margins and embed full-screen React UI cleanly
st.markdown("""
<style>
    /* Hide Streamlit default chrome & toolbar */
    #MainMenu, footer, header, div[data-testid="stToolbar"], div[data-testid="stDecoration"], div[data-testid="stStatusWidget"] {
        display: none !important;
        visibility: hidden !important;
    }
    
    /* Lock Streamlit container to exact viewport with zero margins */
    html, body, .stApp, div[data-testid="stAppViewContainer"], section.main, div[data-testid="stAppViewBlockContainer"], .block-container {
        height: 100vh !important;
        width: 100vw !important;
        max-height: 100vh !important;
        max-width: 100vw !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        background-color: #020617 !important;
    }
    
    div[data-testid="stVerticalBlock"], div[data-testid="stElementContainer"] {
        padding: 0 !important;
        margin: 0 !important;
        gap: 0 !important;
        height: 100vh !important;
    }

    /* Fixed full-screen iframe overlay: eliminates double scrollbars & bottom gap */
    iframe {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 99999 !important;
        background-color: #020617 !important;
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

    # Inject full bundled CSS, smooth scrolling reset, and JS into standalone HTML
    custom_head = f"""
    <style>
    html, body {{
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100vh;
        background-color: #020617;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
    }}
    #root {{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }}
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
    components.html(html_content, height=1000, scrolling=True)
else:
    st.error("Production build not found. Please run 'npm run build' first.")
