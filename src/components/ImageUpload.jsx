import React, { useState, useEffect } from 'react';
import { Upload, X, AlertCircle, Camera } from 'lucide-react';

const ImageUpload = ({ label, description, value, onChange, error, required }) => {
  const [preview, setPreview] = useState(null);

  // EFEITO PARA GERAR PREVIEW AUTOMÁTICO
  // Isso garante que se o arquivo estiver no estado do formulário, ele aparece na tela
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    // Usar URL.createObjectURL é mais rápido e moderno que FileReader para previews
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    // Limpeza de memória necessária
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validação de tipo
      if (!file.type.startsWith('image/')) {
        alert("Por favor, selecione apenas imagens.");
        return;
      }

      // Validação de tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem é muito grande. O máximo é 5MB.");
        return;
      }

      // Envia o arquivo para o estado do pai (formData)
      onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Evita abrir o seletor de arquivos ao clicar no X
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-black uppercase italic tracking-tighter text-gray-300">
        {label}
        {required && <span className="text-copper ml-1">*</span>}
      </label>

      <div 
        onClick={() => document.getElementById(`file-input-${label}`).click()}
        className={`relative w-full overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 group cursor-pointer ${
          preview ? 'h-64 border-copper/50' : 'h-40 border-zinc-800 bg-zinc-900/20 hover:border-copper/40'
        } ${error ? 'border-red-500 bg-red-500/5' : ''}`}
      >
        <input
          id={`file-input-${label}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* OVERLAY ESCURO AO PASSAR O MOUSE */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Camera className="text-white w-8 h-8" />
            </div>
            {/* BOTÃO REMOVER */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-xl z-10 transition-transform active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-3 group-hover:bg-copper/20 transition-colors">
                <Upload className="w-6 h-6 text-zinc-500 group-hover:text-copper" />
            </div>
            <p className="text-gray-400 text-xs font-black uppercase italic tracking-tighter">
                Clique para fazer upload
            </p>
            {description && (
              <p className="text-[10px] text-zinc-600 mt-1 uppercase font-bold tracking-widest leading-tight">
                {description}
              </p>
            )}
            <p className="text-[9px] text-zinc-700 mt-2 uppercase font-medium">JPG ou PNG (máx. 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <motion.p 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-red-500 text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
};

export default ImageUpload;
