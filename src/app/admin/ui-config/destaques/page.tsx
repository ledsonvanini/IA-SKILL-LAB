"use client";

import { useState } from "react";
import { ArrowLeft, Save, GripVertical, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface Category {
    id: string;
    name: string;
    active: boolean;
}

const INITIAL_CATEGORIES: Category[] = [
    { id: "1", name: "Hortifrúti", active: true },
    { id: "2", name: "Carnes", active: true },
    { id: "3", name: "Bebidas", active: true },
    { id: "4", name: "Padaria", active: false },
    { id: "5", name: "Limpeza", active: false },
];

export default function DestaquesConfigPage() {
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create state
    const [newCategoryName, setNewCategoryName] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleToggle = (id: string) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, active: !cat.active } : cat
            )
        );
    };

    const handleAdd = () => {
        if (!newCategoryName.trim()) return;
        const newCat: Category = {
            id: Math.random().toString(),
            name: newCategoryName.trim(),
            active: true
        };
        setCategories([newCat, ...categories]);
        setNewCategoryName("");
    };

    const handleDelete = (id: string) => {
        if (confirm("Tem certeza que deseja excluir esta categoria?")) {
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        }
    };

    const startEditing = (cat: Category) => {
        setEditingId(cat.id);
        setEditName(cat.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditName("");
    };

    const saveEdit = (id: string) => {
        if (!editName.trim()) return;
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, name: editName.trim() } : cat
            )
        );
        setEditingId(null);
    };

    const handleSaveBackend = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Configurações persistidas com sucesso! (Mock: UI pronta para backend)");
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/ui-config">
                        <Button type="button" variant="ghost" className="px-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight">
                            Categorias em Destaque
                        </h1>
                        <p className="text-sm text-[var(--muted)] mt-1">
                            Adicione, edite e selecione quais departamentos aparecerão na página inicial.
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleSaveBackend}
                    className="gap-2 px-6 shadow-sm shadow-[var(--color-primary)]/20"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
                </Button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Nova Categoria</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Ex: Festivais, Congelados..."
                        />
                    </div>
                    <Button onClick={handleAdd} className="bg-[var(--color-primary)] hover:opacity-90 text-white font-bold h-[46px] px-8">
                        <Plus size={18} className="mr-2" /> Adicionar
                    </Button>
                </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] bg-[var(--background)]">
                    <h3 className="font-bold text-[var(--muted)]">Departamentos Disponíveis ({categories.length})</h3>
                </div>

                <div className="divide-y divide-[var(--border)]">
                    {categories.length === 0 ? (
                        <div className="p-12 flex items-center justify-center text-[var(--muted)]">
                            Nenhuma categoria cadastrada.
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className="p-4 flex items-center justify-between gap-4 group hover:bg-[var(--background)] transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <GripVertical size={20} className="text-[var(--muted)] cursor-grab active:cursor-grabbing shrink-0" />

                                    {editingId === category.id ? (
                                        <div className="flex items-center gap-2 flex-1 max-w-sm">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(category.id)}
                                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-1 outline-none text-sm"
                                            />
                                            <button onClick={() => saveEdit(category.id)} className="text-emerald-500 hover:text-emerald-600 p-1"><Check size={18} /></button>
                                            <button onClick={cancelEditing} className="text-red-500 hover:text-red-600 p-1"><X size={18} /></button>
                                        </div>
                                    ) : (
                                        <span className="font-medium text-[var(--foreground)] truncate">{category.name}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 shrink-0">
                                    {editingId !== category.id && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button title="Editar nome" onClick={() => startEditing(category)} className="text-[var(--muted)] hover:text-blue-500 p-1.5 rounded-md hover:bg-blue-500/10">
                                                <Edit2 size={16} />
                                            </button>
                                            <button title="Excluir" onClick={() => handleDelete(category.id)} className="text-[var(--muted)] hover:text-red-500 p-1.5 rounded-md hover:bg-red-500/10">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}

                                    <label title="Ativar para exibição pública" className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={category.active}
                                            onChange={() => handleToggle(category.id)}
                                        />
                                        <div className="w-11 h-6 bg-[var(--border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
