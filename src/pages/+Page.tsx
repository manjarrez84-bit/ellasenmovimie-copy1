"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AttributionFooter } from "@/components/AttributionFooter";
import LatestBlogPostsSection from "@/components/LatestBlogPostsSection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "@/components/Link";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">Ellas en Movimiento, A.C. — Empoderando a mujeres en Monterrey</h1>
      <Header />
      <main className="flex-grow pt-24">

        {/* Hero de introducción (imagen) */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <img src="/ellas2.png" alt="Ellas en Movimiento A.C. - Introducción" className="mx-auto w-full h-auto" />
          </div>
        </section>

        {/* Barra de cifras de impacto */}
        <AnimatedSection>
          <section className="py-10 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                <div>
                  <p className="text-4xl font-extrabold text-primary">17</p>
                  <p className="text-sm text-foreground mt-1">años de servicio</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-primary">[X]</p>
                  <p className="text-sm text-foreground mt-1">mujeres y niñas atendidas</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-primary">[X]</p>
                  <p className="text-sm text-foreground mt-1">comunidades alcanzadas</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA de donativo con montos sugeridos */}
        <AnimatedSection>
          <section className="py-10 bg-primary text-primary-foreground dark:bg-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-2 text-balance">Tu apoyo se convierte en oportunidades reales</h2>
              <p className="max-w-2xl mx-auto mb-8 text-balance">
                Cada donativo impulsa directamente nuestros programas de asesoría legal, apoyo psicológico y talleres productivos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-xl font-bold">$200</p>
                  <p className="text-xs mt-1">Materiales de un taller</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-xl font-bold">$500</p>
                  <p className="text-xs mt-1">Una sesión de asesoría legal</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-xl font-bold">$1,000</p>
                  <p className="text-xs mt-1">Apoyo psicológico por un mes</p>
                </div>
              </div>
              <Link to="/donate">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Donar Ahora
                </Button>
              </Link>
            </div>
          </section>
        </AnimatedSection>

        {/* Alianzas y certificaciones (subidas de posición) */}
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-extrabold text-primary mb-10 uppercase text-balance">NUESTRAS ALIANZAS</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
                <img src="/alianza.png" alt="Alianza 1" className="mx-auto w-full h-auto object-contain" />
                <img src="/alianza1.png" alt="Alianza 2" className="mx-auto w-full h-auto object-contain" />
                <img src="/alian.jpg" alt="Alianza 3" className="mx-auto w-3/4 h-auto object-contain" />
                <img src="/cert.png" alt="Certificación" className="mx-auto w-full h-auto object-contain" />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Testimonio */}
        <AnimatedSection>
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Historias que nos mueven a seguir</h2>
              <blockquote className="text-lg italic text-foreground text-balance">
                "El programa me dio herramientas para empezar mi propio negocio y salir adelante con mis hijas."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-4">— Participante del programa de talleres productivos</p>
            </div>
          </section>
        </AnimatedSection>

        {/* Quiénes somos (versión corta) + foto de la fundadora */}
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl">
              <img src="/ellas333.png" alt="Imagen de la Fundadora" className="mx-auto w-full max-w-md h-auto rounded-lg shadow-lg" />
              <div>
                <Link to="/programs">
                  <Button variant="outline" className="mt-6">Conoce todos nuestros programas</Button>
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Animación/galería */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <img src="/ellas.gif" alt="Animación Ellas en Movimiento" className="mx-auto w-full max-w-4xl h-auto rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Últimas noticias */}
        <AnimatedSection>
          <LatestBlogPostsSection />
        </AnimatedSection>

        {/* Ejes de atención */}
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-extrabold text-primary mb-10 uppercase text-balance">EJES DE ATENCIÓN</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center max-w-full mx-auto">
                <Link to="/programs#imagen-fortalecimiento-comunitario" className="block hover:opacity-80 transition-opacity duration-200">
                  <img src="/ell22.png" alt="Eje 1" className="mx-auto w-full h-auto object-contain" />
                </Link>
                <img src="/ell23.png" alt="Eje 2" className="mx-auto w-full h-auto object-contain" />
                <img src="/ell24.png" alt="Eje 3" className="mx-auto w-full h-auto object-contain" />
                <img src="/ell25.png" alt="Eje 4" className="mx-auto w-full h-auto object-contain" />
                <img src="/ell26.png" alt="Eje 5" className="mx-auto w-full h-auto object-contain" />
                <img src="/ell27.png" alt="Eje 6" className="mx-auto w-full h-auto object-contain" />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contacto */}
        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>

        {/* CTA final antes del footer */}
        <AnimatedSection>
          <section className="py-12 bg-primary text-primary-foreground dark:bg-black text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2 text-balance">¿Lista para ser parte del cambio?</h2>
              <p className="max-w-xl mx-auto mb-6 text-balance">
                Tu donativo de hoy es la asesoría, el taller o el apoyo que una mujer necesita mañana.
              </p>
              <Link to="/donate">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Donar Ahora
                </Button>
              </Link>
            </div>
          </section>
        </AnimatedSection>

        {/* Acceso Administrativo */}
        <section className="py-8 bg-muted/40 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto p-6 bg-card rounded-xl border shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Acceso Administrativo</h3>
              <p className="text-xs text-muted-foreground mb-4">Panel exclusivo para gestión de contenido, publicaciones y usuarios</p>
              <Link to="/admin/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors gap-2">
                  <Shield className="w-4 h-4" />
                  Ir al Dashboard de Administración
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;