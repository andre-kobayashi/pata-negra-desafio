import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Camera, ChefHat, User, Phone, MapPin, ClipboardList, CheckCircle2, Lock } from "lucide-react";
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
    if (!formData.preparationMode.trim()) newErrors.preparationMode = "Conte como você preparou";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Aceite os termos para continuar";

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
      toast({ title: "Ops! Faltam informações", description: "Verifique os campos marcados em vermelho.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const id = crypto.randomUUID();
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
      toast({ title: "Erro ao enviar", description: "Tente novamente em alguns instantes.", variant: "destructive" });
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

      <div className="min-h-screen pt-24 pb-20 px-4 bg-[#0a0a0a] text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto"
        >
          {/* HEADER DO FORMULÁRIO */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-copper/10 rounded-full mb-4 border border-copper/20">
              <ChefHat className="w-8 h-8 text-copper" />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Inscrição</h1>
            <p className="text-gray-400 text-sm mt-2 max-w-[280px] mx-auto">
              Preencha os dados abaixo para concorrer aos <span className="text-white font-bold">¥20.000</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* PASSO 1: DADOS PESSOAIS */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
              <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black">
                Passo 01
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic">
                <User size={18} className="text-copper" /> SEUS DADOS
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Nome Completo"
                  placeholder="Como você quer ser chamado?"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                  className="bg-black/40 border-zinc-700"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="WhatsApp / Celular"
                    placeholder="080-0000-0000"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    error={errors.phone}
                    className="bg-black/40 border-zinc-700"
                  />
                  <FormInput
                    label="Cidade / Província"
                    placeholder="Onde você mora no Japão?"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    error={errors.city}
                    className="bg-black/40 border-zinc-700"
                  />
                </div>
              </div>
            </section>

            {/* PASSO 2: FOTOS */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
               <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black">
                Passo 02
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic">
                <Camera size={18} className="text-copper" /> FOTOS DO DESAFIO
              </h2>
              <div className="space-y-6">
                <div className="bg-black/40 p-4 rounded-xl border border-dashed border-zinc-700">
                   <ImageUpload
                    label="1. Foto dos Ingredientes"
                    description="Mostre o produto Pata Negra na foto."
                    onChange={(file) => handleChange("photo1", file)}
                    error={errors.photo1}
                  />
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-dashed border-zinc-700">
                  <ImageUpload
                    label="2. Foto do Prato Pronto"
                    description="Capriche no visual para ganhar votos!"
                    onChange={(file) => handleChange("photo2", file)}
                    error={errors.photo2}
                  />
                </div>
              </div>
            </section>

            {/* PASSO 3: RECEITA */}
            <section className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 relative">
              <div className="absolute -top-3 left-6 bg-copper px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-black">
                Passo 03
              </div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic">
                <ClipboardList size={18} className="text-copper" /> DETALHES DA RECEITA
              </h2>
              <div className="space-y-4">
                <FormTextarea
                  label="Ingredientes da Receita"
                  placeholder="Ex: 500g de Linguiça Pata Negra, cebola..."
                  value={formData.recipe}
                  onChange={(e) => handleChange("recipe", e.target.value)}
                  error={errors.recipe}
                  rows={4}
                  className="bg-black/40 border-zinc-700"
                />
                <FormTextarea
                  label="Modo de Preparo"
                  placeholder="Explique o passo a passo de forma simples..."
                  value={formData.preparationMode}
                  onChange={(e) => handleChange("preparationMode", e.target.value)}
                  error={errors.preparationMode}
                  rows={5}
                  className="bg-black/40 border-zinc-700"
                />
              </div>
            </section>

            {/* PRIVACIDADE E TERMOS */}
            <div className="p-4 bg-zinc-900/20 rounded-xl border border-zinc-800/50">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleChange("acceptTerms", e.target.checked)}
                    className="w-5 h-5 rounded border-zinc-700 bg-black text-copper focus:ring-copper"
                  />
                </div>
                <span className="text-xs text-gray-400 leading-tight group-hover:text-gray-300 transition-colors">
                  Aceito o regulamento. Autorizo o uso das imagens da receita para votação nos Stories. 
                  <span className="block mt-1 font-bold text-copper/80">Seus dados pessoais nunca serão expostos.</span>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider">{errors.acceptTerms}</p>
              )}
            </div>

            {/* BOTÃO DE ENVIO */}
            <div className="sticky bottom-4 z-20">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-8 text-xl font-black italic uppercase rounded-2xl shadow-2xl transition-all active:scale-95 ${
                  loading ? 'bg-zinc-700' : 'bg-copper hover:bg-copper/90'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                       <ChefHat size={24} />
                    </motion.div>
                    ENVIANDO...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    ENVIAR MINHA RECEITA <Send size={24} />
                  </div>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
                <Lock size={12} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Conexão Segura Pata Negra</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ParticipationForm;