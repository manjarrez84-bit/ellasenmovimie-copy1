"use client";

import { useState, useEffect } from 'react';
import { navigate } from 'vike/client/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Mail, MailOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';
import { getContactMessages, markMessageResponded, ContactMessage } from '@/services/contactService';

const Page = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [filter, setFilter] = useState<'pending' | 'responded' | 'all'>('pending');

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/');
        return;
      }
      const profile = await getUserProfile(user.id);
      if (!profile || profile.role !== 'admin') {
        setLoading(false);
        return;
      }
      setAuthorized(true);
      fetchMessages();
    };
    checkAuth();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar los mensajes.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleResponded = async (msg: ContactMessage) => {
    try {
      await markMessageResponded(msg.id, !msg.responded);
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, responded: !m.responded } : m))
      );
      toast.success(msg.responded ? "Marcado como pendiente." : "Marcado como respondido.");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar.");
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'pending') return !m.responded;
    if (filter === 'responded') return m.responded;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-lg" />)}
            </div>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Acceso Denegado</h1>
            <a href="/"><Button>Volver al Inicio</Button></a>
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
      <main className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <a href="/admin/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al panel
          </a>
          <h1 className="text-3xl font-bold text-primary mb-6 text-balance">Mensajes de contacto</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === 'pending' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}
            >
              Pendientes ({messages.filter(m => !m.responded).length})
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === 'responded' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}
            >
              Respondidos
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}
            >
              Todos
            </button>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg shadow">
              <p className="text-lg text-foreground">No hay mensajes en esta categoria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map(msg => (
                <Card key={msg.id} className={msg.responded ? 'opacity-70' : ''}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg text-primary">{msg.subject}</CardTitle>
                      <p className="text-sm text-foreground mt-1">{msg.name} - {msg.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleString('es-MX')}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleResponded(msg)}
                      className="flex items-center gap-2 shrink-0"
                    >
                      {msg.responded ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                      {msg.responded ? 'Respondido' : 'Marcar respondido'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                    
                     <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
                    >
                      Responder por correo
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;