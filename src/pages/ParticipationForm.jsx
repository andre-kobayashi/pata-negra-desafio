import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Camera, ChefHat, User, Phone, MapPin, ClipboardList, CheckCircle2, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import ImageUpload from "@/components/ImageUpload";
import SuccessModal from "@/components/SuccessModal";
import { supabase } from "@/lib/customSupabaseClient";
import { compressImage } from "@/lib/utils";

const ParticipationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Referência para rolar até os termos caso o usuário esqueça de marcar
  const termsRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    photo1: null,
    photo2: null,
    recipe: "",
    preparationMode: "",
    acceptTerms: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Informe seu nome";
    if (!formData.phone.trim()) newErrors.phone = "Informe seu telefone";
    if (!formData.city.trim()) newErrors.city = "Informe sua cidade/província";
    if (!formData.photo1) newErrors.photo1 = "A foto dos ingredientes é obrigatória";
    if (!formData.photo2) newErrors.photo2 = "A foto do prato pronto é obrigatória";
    if (!formData.recipe.trim()) newErrors.recipe = "Liste os ingredientes";
    if (!formData.preparationMode.trim()) newErrors.preparationMode = "Explique o preparo";
    
    // Validação do Checkbox com scroll automático
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você precisa aceitar os termos";
      setTimeout(() => {
        termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (file, path) => {
    const compressedFile = await compressImage(file);
    const { error } = await supabase.storage.from("participations").upload(path, compressedFile);
    if (error) throw error;
    const { data } = supabase.storage.from("participations").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ 
        title: "Campos obrigatórios", 
        description: "Preencha tudo e aceite o regulamento no final.", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    try {
      const id = window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2);
      const photo1Url = await uploadImage(formData.photo1, `${id}/ingredientes.jpg`);
      const photo2Url = await uploadImage(formData.photo2, `${id}/prato.jpg`);

      const { error } = await supabase.from("participants").insert({
        id,
        nome: formData.name,
        telefone: formData.phone, 
        cidade: formData.city,
        receita: formData.recipe,
        modo_preparo: formData.preparationMode,
        foto_ingredientes_url: photo1Url,
        foto_prato_url: photo2Url,
        status: "Recebido",
      });

      if (error) throw error;
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Erro ao enviar", description: "Verifique sua conexão e tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessModal onClose={() => { setShowSuccess(false); navigate("/"); }} />;
  }

  return (
    <>
      <Helmet>
        <title>Participar | Desafio Brasil no Prato</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 px-4 bg-[#0a0a0a] text-white font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto"
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-copper/10 rounded-full mb-4 border border-copper/20">
              <ChefHat className="w-8 h-8 text-copper" />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Inscrição</h1>
            <p className="text-gray-400 text-sm mt-2 italic font-medium">
              Sua receita pode valer <span className="text-white font-bold">¥20.000</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* PASSO 1: DADOS PESSOAIS */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
              <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                Passo 01
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic uppercase tracking-tight">
                <User size={18} className="text-copper" /> Dados de Contato
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Nome Completo"
                  placeholder="Como devemos te chamar?"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                  className="bg-black/40 border-zinc-700 italic font-bold"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="WhatsApp / Celular"
                    placeholder="080-0000-0000"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    error={errors.phone}
                    className="bg-black/40 border-zinc-700 italic"
                  />
                  <FormInput
                    label="Cidade / Província"
                    placeholder="Onde você mora no Japão?"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    error={errors.city}
                    className="bg-black/40 border-zinc-700 italic"
                  />
                </div>
              </div>
            </section>

            {/* PASSO 2: FOTOS */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
              <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                Passo 02
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic uppercase tracking-tight">
                <Camera size={18} className="text-copper" /> Fotos do Prato
              </h2>
              <div className="space-y-6">
                <ImageUpload
                  label="1. Foto dos Ingredientes"
                  description="Lembre-se de mostrar o produto Pata Negra."
                  value={formData.photo1}
                  onChange={(file) => handleChange("photo1", file)}
                  error={errors.photo1}
                />
                <ImageUpload
                  label="2. Foto do Prato Pronto"
                  description="Capriche! Essa foto vai para votação."
                  value={formData.photo2}
                  onChange={(file) => handleChange("photo2", file)}
                  error={errors.photo2}
                />
              </div>
            </section>

            {/* PASSO 3: RECEITA */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
              <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                Passo 03
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic uppercase tracking-tight">
                <ClipboardList size={18} className="text-copper" /> Sua Receita
              </h2>
              <div className="space-y-4">
                <FormTextarea
                  label="Ingredientes"
                  placeholder="Ex: 1 pacote de linguiça, 2 cebolas..."
                  value={formData.recipe}
                  onChange={(e) => handleChange("recipe", e.target.value)}
                  error={errors.recipe}
                  rows={4}
                  className="bg-black/40 border-zinc-700 italic"
                />
                <FormTextarea
                  label="Modo de Preparo"
                  placeholder="Conte como você preparou o seu prato..."
                  value={formData.preparationMode}
                  onChange={(e) => handleChange("preparationMode", e.target.value)}
                  error={errors.preparationMode}
                  rows={5}
                  className="bg-black/40 border-zinc-700 italic"
                />
              </div>
            </section>

            {/* PRIVACIDADE E TERMOS */}
            <div 
              ref={termsRef}
              className={`p-5 rounded-2xl border transition-all duration-500 ${
                errors.acceptTerms ? 'bg-red-500/10 border-red-500 shadow-lg' : 'bg-zinc-900/20 border-zinc-800'
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleChange("acceptTerms", e.target.checked)}
                  className="w-6 h-6 mt-1 rounded border-zinc-700 bg-black text-copper focus:ring-copper active:scale-90 transition-transform"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                      Aceito o regulamento e autorizo o uso das imagens para votação nos Stories.
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">
                      Seus dados de contato nunca serão divulgados.
                    </span>
                </div>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-[10px] mt-3 font-black uppercase flex items-center gap-1 animate-pulse">
                  <AlertCircle size={12} /> {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* BOTÃO DE ENVIO - STICKY */}
            <div className="sticky bottom-4 z-20">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-8 text-xl font-black italic uppercase rounded-2xl shadow-2xl transition-all active:scale-95 ${
                  loading ? 'bg-zinc-700 cursor-wait' : 'bg-copper hover:bg-copper/90'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                       <ChefHat size={24} />
                    </motion.div>
                    PROCESSANDO...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    ENVIAR MINHA RECEITA <Send size={24} />
                  </div>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-zinc-600">
                <Lock size={12} />
                <span className="text-[9px] uppercase tracking-[0.2em] font-black italic">Site Protegido • Pata Negra</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ParticipationForm;
