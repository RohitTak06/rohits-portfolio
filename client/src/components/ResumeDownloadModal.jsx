import React, { useEffect, useRef } from 'react';
import { X, FileText, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { getResumeDownloadUrl } from '../services/api';

export const ResumeDownloadModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfDownloadUrl = getResumeDownloadUrl('pdf');
  const pdfViewUrl = getResumeDownloadUrl('pdf', true);
  const docxDownloadUrl = getResumeDownloadUrl('docx');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="glass-card relative w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-border bg-card text-card-foreground"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 id="resume-modal-title" className="text-xl font-bold">
              Download Rohit Tak's Resume
            </h3>
            <p className="text-xs text-muted-foreground">
              Resume provided by Rohit Tak
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Choose a format to view or download the resume.
        </p>

        <div className="space-y-4 mb-6">
          {/* PDF Card */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
                  PDF
                </span>
                <span className="font-semibold text-sm">Standard Adobe PDF Document</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Best for printing, ATS submission, and immediate mobile or desktop viewing.
            </p>
            <div className="flex gap-2">
              <a
                href={pdfDownloadUrl}
                download="Rohit_Tak_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
              <a
                href={pdfViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Preview
              </a>
            </div>
          </div>

          {/* Word DOCX Card */}
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  DOCX
                </span>
                <span className="font-semibold text-sm">Microsoft Word Document</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Editable format suitable for recruiters and HR management platforms.
            </p>
            <a
              href={docxDownloadUrl}
              download="Rohit_Tak_Resume.docx"
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download DOCX
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            PDF and Word formats
          </span>
          <span>Resume</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeDownloadModal;
