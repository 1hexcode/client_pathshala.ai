import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Badge, Spinner } from '../components/common';
import { useAuth } from '../contexts/AuthContext';
import { fetchNote, chatAboutNote } from '../utils/api';

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Lightweight markdown-to-HTML renderer for chat messages.
 * Handles: **bold**, *italic*, `code`, bullet/numbered lists, headings, line breaks.
 */
function renderMarkdown(text) {
    // Escape HTML
    let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Code blocks (```...```)
    html = html.replace(/```([\s\S]*?)```/g,
        '<pre style="background:var(--color-bg-secondary);padding:8px 12px;border-radius:8px;overflow-x:auto;font-size:0.8em;margin:6px 0"><code>$1</code></pre>');

    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g,
        '<code style="background:var(--color-bg-secondary);padding:1px 5px;border-radius:4px;font-size:0.9em">$1</code>');

    // Headings (### ... )
    html = html.replace(/^### (.+)$/gm, '<strong style="font-size:1em">$1</strong>');
    html = html.replace(/^## (.+)$/gm, '<strong style="font-size:1.05em">$1</strong>');
    html = html.replace(/^# (.+)$/gm, '<strong style="font-size:1.1em">$1</strong>');

    // Bold + italic (***text*** or ___text___)
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');

    // Bold (**text** or __text__)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic (*text* or _text_) — but not inside words
    html = html.replace(/(?<![\w*])\*([^*]+?)\*(?![\w*])/g, '<em>$1</em>');

    // Bullet lists (- item or * item)
    html = html.replace(/^[\-\*] (.+)$/gm,
        '<span style="display:block;padding-left:12px">• $1</span>');

    // Numbered lists (1. item)
    html = html.replace(/^(\d+)\. (.+)$/gm,
        '<span style="display:block;padding-left:12px">$1. $2</span>');

    // Line breaks (double newline → paragraph gap, single → <br>)
    html = html.replace(/\n\n/g, '<br/><br/>');
    html = html.replace(/\n/g, '<br/>');

    return html;
}

function formatFileSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function NoteViewPage() {
    const { noteId } = useParams();
    const { isAuthenticated } = useAuth();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileExists, setFileExists] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchNote(noteId)
            .then((data) => {
                setNote(data);
                // Supabase public URLs are always accessible
                if (data.file_url) {
                    setFileExists(true);
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [noteId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Note not found</h2>
                <p className="text-muted mb-6">{error || 'The note you are looking for does not exist.'}</p>
                <Link to="/notes">
                    <Button variant="primary">Back to Notes</Button>
                </Link>
            </div>
        );
    }

    // file_url is now a full Supabase public URL
    const fileUrl = note.file_url || null;
    const isPdf = note.file_url?.toLowerCase().endsWith('.pdf');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted mb-6">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link to="/notes" className="hover:text-foreground transition-colors">Notes</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-foreground font-medium truncate max-w-[200px]">{note.title}</span>
            </nav>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left: Note Details + PDF */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Note Metadata */}
                    <Card className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-2xl font-display font-bold text-foreground mb-2">{note.title}</h1>
                                {note.description && (
                                    <p className="text-muted">{note.description}</p>
                                )}
                            </div>
                            {fileUrl && (
                                <a href={fileUrl} download>
                                    <Button variant="primary" size="sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </Button>
                                </a>
                            )}
                        </div>

                        {/* Tags & Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            {note.tags?.map((tag) => (
                                <Badge key={tag} variant="neutral">{tag}</Badge>
                            ))}
                            <span className="text-muted">•</span>
                            <span className="text-muted">{formatDate(note.created_at)}</span>
                            <span className="text-muted">•</span>
                            <span className="text-muted">{note.views} views</span>
                            <span className="text-muted">•</span>
                            <span className="text-muted">{note.downloads} downloads</span>
                            {note.file_size && (
                                <>
                                    <span className="text-muted">•</span>
                                    <span className="text-muted">{formatFileSize(note.file_size)}</span>
                                </>
                            )}
                        </div>
                    </Card>

                    {/* PDF Viewer */}
                    {isPdf && fileUrl && fileExists ? (
                        <Card className="overflow-hidden">
                            <div className="bg-surface-alt p-3 border-b border-border flex items-center justify-between">
                                <span className="text-sm font-medium text-muted">Document Preview</span>
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-primary hover:text-primary-dark font-medium"
                                >
                                    Open in new tab ↗
                                </a>
                            </div>
                            <iframe
                                src={fileUrl}
                                className="w-full border-0"
                                style={{ height: '75vh' }}
                                title={note.title}
                            />
                        </Card>
                    ) : fileUrl && fileExists ? (
                        <Card className="p-12 text-center">
                            <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-muted mb-4">Preview not available for this file type</p>
                            <a href={fileUrl} download>
                                <Button variant="primary">Download File</Button>
                            </a>
                        </Card>
                    ) : (
                        <Card className="p-12 text-center">
                            <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <p className="text-foreground font-medium mb-2">File not available</p>
                            <p className="text-muted text-sm mb-4">The file for this note hasn't been uploaded yet or was removed. An admin needs to re-upload it.</p>
                        </Card>
                    )}
                </div>

                {/* Right: AI Chat */}
                <div className="lg:col-span-2">
                    <NoteChat noteId={noteId} noteTitle={note.title} isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </div>
    );
}


// ─── AI Chat Panel ──────────────────────────────────────────────────────────

function NoteChat({ noteId, noteTitle, isAuthenticated }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hi! I'm your AI study assistant. Ask me anything about "${noteTitle}" and I'll help you understand the material.`,
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        const msg = input.trim();
        if (!msg || loading) return;

        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: msg }]);
        setLoading(true);

        try {
            const data = await chatAboutNote(noteId, msg);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.response },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: `Sorry, I couldn't process your question. ${err.message}`,
                    isError: true,
                },
            ]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedQuestions = [
        'Summarize the key points',
        'What are the main topics covered?',
        'Explain in simple terms',
    ];

    return (
        <Card className="flex flex-col overflow-hidden" style={{ height: 'calc(75vh + 120px)' }}>
            {/* Header */}
            <div className="p-4 border-b border-border bg-surface-alt flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-foreground text-sm">AI Study Assistant</h3>
                    <p className="text-xs text-muted">Ask about this note</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-br-sm'
                                    : msg.isError
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
                                        : 'bg-surface-alt text-foreground border border-border rounded-bl-sm'
                                }
              `}
                        >
                            {msg.role === 'assistant' ? (
                                <div
                                    className="chat-markdown"
                                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                                />
                            ) : (
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-surface-alt border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (only show if no user messages yet) */}
            {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                        <button
                            key={q}
                            onClick={() => { setInput(q); inputRef.current?.focus(); }}
                            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted 
                         hover:border-primary hover:text-primary transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
                {!isAuthenticated ? (
                    <div className="text-center py-2">
                        <p className="text-sm text-muted mb-2">Sign in to ask questions</p>
                        <Link to="/login">
                            <Button variant="primary" size="sm">Sign In</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-end gap-2">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question about this note..."
                            rows={1}
                            className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-2.5 
                         text-sm text-foreground placeholder:text-muted focus:outline-none 
                         focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            style={{ maxHeight: '120px', minHeight: '40px' }}
                            onInput={(e) => {
                                e.target.style.height = '40px';
                                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center 
                         hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed 
                         flex-shrink-0"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </Card>
    );
}
