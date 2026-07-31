"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
  pendingEdits: Record<string, string>;
  setPendingEdit: (field: string, value: string) => void;
  clearPendingEdits: () => void;
  saveAll: (slug: string) => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function BlogEditorProvider({ children, slug }: { children: ReactNode; slug: string }) {
  const [pendingEdits, setPendingEdits] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const setPendingEdit = (field: string, value: string) => {
    setPendingEdits(prev => ({ ...prev, [field]: value }));
  };

  const clearPendingEdits = () => {
    setPendingEdits({});
  };

  const saveAll = async (slug: string) => {
    // Prevent concurrent saves
    if (isSaving) return;

    const edits = pendingEdits;
    if (Object.keys(edits).length === 0) {
      console.log('No pending edits to save.');
      return;
    }

    setIsSaving(true);

    try {
      // Save all pending edits sequentially
      for (const [field, value] of Object.entries(edits)) {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, field, value }),
        });
        if (!response.ok) {
          console.error(`Failed to save ${field}:`, await response.text());
        }
      }

      clearPendingEdits();
      window.dispatchEvent(new CustomEvent('contentSaved'));
    } catch (error) {
      console.error('Error saving edits:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <EditorContext.Provider value={{ pendingEdits, setPendingEdit, clearPendingEdits, saveAll }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useBlogEditor() {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useBlogEditor must be used within BlogEditorProvider');
  return context;
}
