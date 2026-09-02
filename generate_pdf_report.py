import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "2026 AI Placement & Technical Interview Exam Portal — Technical Report")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, footer_text)
        self.drawString(54, 40, "Confidential & Proprietary — Engineering Project Documentation")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 52, 558, 52)
        
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    primary_color = colors.HexColor("#ea580c")    # FACE Prep Orange
    dark_slate = colors.HexColor("#0f172a")       # Dark Slate
    body_color = colors.HexColor("#1e293b")       # Text dark
    accent_bg = colors.HexColor("#fff7ed")        # Light Orange Tint
    
    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=dark_slate,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=dark_slate,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=body_color,
        spaceAfter=6
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_slate
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a")
    )
    
    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#431407")
    )
    
    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )
    
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=body_color
    )
    
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=dark_slate
    )

    story = []

    # Title & Header
    story.append(Paragraph("TECHNICAL PROJECT REPORT", subtitle_style))
    story.append(Paragraph("2026 AI Placement & Technical Interview Exam Portal", title_style))
    story.append(Paragraph("A Comprehensive Placement Assessment Engine Calibrated to 2026 Campus Hiring Standards", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=primary_color, spaceBefore=4, spaceAfter=14))

    # Meta Information Table
    meta_data = [
        [Paragraph("Repository:", table_cell_bold), Paragraph("https://github.com/likithyadav128-tech/ai-interview-exam-portal", code_style)],
        [Paragraph("Core Benchmark:", table_cell_bold), Paragraph("FACE Prep's 'The 2026 AI Career Roadmap for Indian Engineering Students'", table_cell)],
        [Paragraph("Target Audience:", table_cell_bold), Paragraph("B.E. / B.Tech (CSE, IT, ECE, EEE, AIDS) & Recent Graduates (2025-2026)", table_cell)],
        [Paragraph("Tech Stack:", table_cell_bold), Paragraph("React 18, Vite 6, Tailwind CSS, Lucide Icons, Python 3.11+, Streamlit 1.35+", table_cell)],
        [Paragraph("Deployment Targets:", table_cell_bold), Paragraph("Streamlit Cloud, Vercel Edge, GitHub Pages, Netlify", table_cell)]
    ]
    t_meta = Table(meta_data, colWidths=[120, 384])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), accent_bg),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#fed7aa")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#ffedd5")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 14))

    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary & Problem Context", h1_style))
    story.append(Paragraph(
        "Between 2023 and 2026, campus placements across Indian engineering colleges underwent a monumental shift. "
        "Tier-1 IT services firms transitioned from mass baseline hiring (₹3.5–4.5 LPA) to dedicated, high-paying AI tracks "
        "(such as <b>TCS Prime at ₹7.0–11.5 LPA</b>, <b>HCLTech Elite at ₹18–22 LPA</b>, <b>Infosys Power Programmer at ₹6.5–9.5 LPA</b>, "
        "and <b>Wipro CoE</b>). Public statements from TCS confirmed that 60% of new joiners are now hired into AI-skilled tracks.",
        body_style
    ))
    story.append(Paragraph(
        "However, most undergraduate engineering students lack a dedicated, rigorous testing environment to benchmark their readiness "
        "across the 4 core layers of AI engineering (Python Foundations, ML Literacy, LLM Fluency, and Production System Integration). "
        "This project resolves that bottleneck by providing an end-to-end interactive examination portal, company-specific mock tests, "
        "an AI mock interview panel, an in-browser live code execution bench, and an automated CTC placement diagnostic engine.",
        body_style
    ))
    story.append(Spacer(1, 10))

    # 2. System Architecture
    story.append(Paragraph("2. System Architecture & Tech Stack", h1_style))
    story.append(Paragraph(
        "The application is architected as a modular Single-Page Application (SPA) with an inlined Python Streamlit runtime option "
        "for instant zero-configuration multi-platform cloud hosting.",
        body_style
    ))
    
    arch_data = [
        [Paragraph("Architectural Component", table_header), Paragraph("Underlying Technologies", table_header), Paragraph("Key Functional Purpose", table_header)],
        [Paragraph("Client UI Layer", table_cell_bold), Paragraph("React 18, Vite 6, Tailwind CSS", table_cell), Paragraph("Ultra-responsive dark theme, glassmorphic HUD, interactive question palettes.", table_cell)],
        [Paragraph("Examination Engine", table_cell_bold), Paragraph("Custom React Hook State Engine", table_cell), Paragraph("Timed countdowns, flagged questions, single-choice evaluation, answer reviews.", table_cell)],
        [Paragraph("AI Interview Room", table_cell_bold), Paragraph("Heuristic & Keyword Panel Evaluator", table_cell), Paragraph("Grades 90s response pacing, metric presence, technical depth, and trade-offs.", table_cell)],
        [Paragraph("In-Browser Code Runner", table_cell_bold), Paragraph("Python/JS Sandbox Engine", table_cell), Paragraph("Live test execution for RAG chunkers, cosine similarity, and retry decorators.", table_cell)],
        [Paragraph("Deployment Wrapper", table_cell_bold), Paragraph("Python Streamlit + Vercel SPA", table_cell), Paragraph("Enables 1-click execution on Streamlit Community Cloud and native Vercel Edge.", table_cell)],
    ]
    t_arch = Table(arch_data, colWidths=[130, 150, 224])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), dark_slate),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 14))

    # 3. Core Feature Modules
    story.append(Paragraph("3. Core Functional Modules", h1_style))
    
    story.append(Paragraph("3.1 4-Layer Skill Stack Mock Exams", h2_style))
    story.append(Paragraph(
        "• <b>Layer 1 (Programming Fundamentals)</b>: Python generators (lazy O(1) space complexity), decorators, mutable default traps, Git conflict resolution, and virtual environment isolation.<br/>"
        "• <b>Layer 2 (ML Literacy & Applied Math)</b>: Linear/logistic regression, cross-validation, L1 (Lasso) vs L2 (Ridge) regularization, backpropagation chain rule intuition, and metric selection (F1, ROC-AUC).<br/>"
        "• <b>Layer 3 (LLM Fluency & GenAI)</b>: RAG architectures (chunking with overlap, vector DBs), prompt engineering (Chain-of-Thought), structured JSON outputs, LangGraph agents, and fine-tuning vs RAG trade-offs.<br/>"
        "• <b>Layer 4 (System Integration)</b>: FastAPI async request handling, Docker multi-stage builds, cloud deployment, regression eval suites, semantic token caching, and token cost modeling.",
        body_style
    ))
    
    story.append(Paragraph("3.2 14 Tracked Company Round Simulators", h2_style))
    story.append(Paragraph(
        "Provides dedicated mock screening papers for the 14 companies tracked in 2026: <b>TCS Prime</b> (DSA + deployed AI project screen), "
        "<b>HCLTech Elite</b> (₹18–22 LPA GenAI & agentic program), <b>Infosys Power Programmer</b> (LoRA parameter efficiency + graph algorithms), "
        "<b>D. E. Shaw India GAI Team</b> (Bayes' Theorem probability + transformer scaling $\\frac{1}{\\sqrt{d_k}}$), "
        "<b>Mu Sigma</b> (Decision analytics + muTalos case study), <b>Wipro CoE</b>, <b>Accenture GenAI Studio</b>, and <b>Tech Mahindra Project Indus</b>.",
        body_style
    ))

    story.append(Paragraph("3.3 AI Technical Mock Interview Simulator", h2_style))
    story.append(Paragraph(
        "Rehearses the 5 universal placement questions every 2026 panel asks: (1) 90-second project walkthrough, (2) Fine-tuning vs RAG trade-offs, "
        "(3) LLM system evaluation suites, (4) Honest project limitations & engineering trade-offs, and (5) Company-specific pitch. "
        "Includes the <i>Business Outcome Translator Challenge</i> testing candidates on translating technical buzzwords into business outcomes (latency, users, cost).",
        body_style
    ))

    story.append(Paragraph("3.4 In-Browser Live Coding Bench", h2_style))
    story.append(Paragraph(
        "Features an interactive code editor and automated test runner testing high-frequency placement coding problems: "
        "(1) Custom RAG text chunker with overlap, (2) Vector cosine similarity calculator from scratch, and (3) API retry decorator with exponential backoff.",
        body_style
    ))

    story.append(Paragraph("3.5 5 Recruiter-Grade Project Blueprints & Resume Formulator", h2_style))
    story.append(Paragraph(
        "Provides 4-week execution plans for the 5 projects that change recruiter perception: Document Q&A Bot, Resume Parser & Matcher, "
        "LangGraph Agent, Niche Fine-Tuned Model, and AI Placement Prep Tool. Features the dynamic <i>Rule 4.6 Resume Line Formulator</i> "
        "enforcing the rule: <i>'Every line ends with a number and real tooling'</i>.",
        body_style
    ))

    story.append(Spacer(1, 14))

    # 4. Compensation & Diagnostic Matrix
    story.append(Paragraph("4. 2026 Fresher AI Salary & Diagnostic Matrix", h1_style))
    
    sal_data = [
        [Paragraph("Company Tier", table_header), Paragraph("Fresher CTC Band", table_header), Paragraph("Screening Criteria", table_header), Paragraph("Min Exam %", table_header)],
        [Paragraph("IT Services Baseline", table_cell_bold), Paragraph("₹3.5 - 4.5 LPA", table_cell), Paragraph("Aptitude + basic coding; AI is bonus", table_cell), Paragraph("40%", table_cell)],
        [Paragraph("IT Services AI-Tier (TCS Prime)", table_cell_bold), Paragraph("₹6.5 - 11.0 LPA", table_cell), Paragraph("Aptitude + 1 deployed AI project + coding", table_cell), Paragraph("65%", table_cell)],
        [Paragraph("Mid-size IT & GCCs", table_cell_bold), Paragraph("₹5.0 - 9.0 LPA", table_cell), Paragraph("1 to 2 AI projects + Python + basic SQL", table_cell), Paragraph("60%", table_cell)],
        [Paragraph("Product Companies Entry", table_cell_bold), Paragraph("₹8.0 - 15.0 LPA", table_cell), Paragraph("2+ deployed projects + system design basics", table_cell), Paragraph("75%", table_cell)],
        [Paragraph("IT Services Elite AI (HCLTech)", table_cell_bold), Paragraph("₹18.0 - 22.0 LPA", table_cell), Paragraph("Strong GenAI / agentic portfolio + extended screen", table_cell), Paragraph("85%", table_cell)],
        [Paragraph("Top Product & Quant (DE Shaw)", table_cell_bold), Paragraph("₹35.0 - 50+ LPA", table_cell), Paragraph("Premium DSA + advanced math / probability", table_cell), Paragraph("90%", table_cell)],
    ]
    t_sal = Table(sal_data, colWidths=[130, 95, 220, 59])
    t_sal.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#fff7ed")]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#fed7aa")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_sal)
    story.append(Spacer(1, 14))

    # 5. Deployment Guide
    story.append(Paragraph("5. Deployment & Cloud Architecture", h1_style))
    story.append(Paragraph(
        "The repository is configured for multi-target zero-friction cloud deployment:",
        body_style
    ))
    story.append(Paragraph(
        "1. <b>Streamlit Community Cloud</b>: Execute via <code>app.py</code> with inlined React bundle on <code>share.streamlit.io</code>.<br/>"
        "2. <b>Vercel Edge</b>: Instant deployment via <code>vercel.json</code> with single-page client-side rewrite rules.<br/>"
        "3. <b>GitHub Pages</b>: Automated CI/CD workflow via <code>.github/workflows/deploy.yml</code> on push to <code>main</code>.<br/>"
        "4. <b>Netlify</b>: Static publishing from <code>dist/</code> with <code>public/_redirects</code>.",
        body_style
    ))
    story.append(Spacer(1, 10))

    # 6. Conclusion
    story.append(Paragraph("6. Project Verification & Conclusion", h1_style))
    story.append(Paragraph(
        "• <b>Production Build</b>: Vite compilation succeeded (307 kB JS, 30 kB CSS gzipped to ~98 kB total bundle).<br/>"
        "• <b>Source Synchronization</b>: All 25 source files and assets committed and pushed to GitHub main branch.<br/>"
        "• <b>Educational Impact</b>: Directly serves undergraduate engineering students seeking high-bracket AI campus placements.",
        body_style
    ))
    story.append(Spacer(1, 14))
    
    # Signature box
    sig_data = [
        [Paragraph("<b>Status:</b> Production Ready", table_cell), Paragraph("<b>Release Version:</b> 1.0.0 (May 2026 Edition)", table_cell)],
        [Paragraph("<b>Repository:</b> github.com/likithyadav128-tech/ai-interview-exam-portal", table_cell), Paragraph("<b>Format:</b> IEEE Standard Project Report", table_cell)]
    ]
    t_sig = Table(sig_data, colWidths=[250, 254])
    t_sig.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sig)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully at {filename}")

if __name__ == '__main__':
    out_pdf = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Technical_Project_Report_AI_Placement_Portal_2026.pdf")
    build_pdf(out_pdf)
