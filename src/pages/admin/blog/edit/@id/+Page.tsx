"use client";

import { useEffect, useState } from 'react';
import { useData } from 'vike-react/useData';
import { usePageContext } from 'vike-react/usePageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import BlogPostForm from '@/components/forms/BlogPostForm';
import { getCurrentUser } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';

const Page = () => {
  const { post } = useData<{ post: BlogPost }>();
  const pageContext = usePageContext() as any;
  const navigate = pageContext?.router?.navigate;
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate?.('/');
        return;
      }
      const profile = await getUserProfile(currentUser.id);
      if (!profile || profile.role !== 'admin') {
        setLoading(false);
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-lg text-foreground">Verificando permisos...</p>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Publicación no encontrada</h1>
            <p className="text-lg text-foreground mb-8 text-balance">Lo sentimos, no pudimos encontrar la publicación que buscas.</p>
            <a href="/admin/dashboard">
              <Button>Volver al Dashboard</Button>
            </a>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Acceso Denegado</h1>
            <p className="text-lg text-foreground mb-8 text-balance">No tienes permisos de administrador para acceder a esta página.</p>
            <a href="/">
              <Button>Volver al Inicio</Button>
            </a>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Editar Publicación</h1>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <BlogPostForm
              userId={user.id}
              authorEmail={user.email || ''}
              initialData={post}
              onSubmissionSuccess={() => {}}
            />
          </div>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;
