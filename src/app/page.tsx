import { Suspense } from 'react';
import {
  fetchFacilitators,
  fetchSchedule,
  fetchTestimonials
} from '@/lib/api';
import Banner from '@/components/Banner';
import VideoSection from '@/components/VideoSection';
import InvitationSection from '@/components/InvitationSection';
import TextSection from '@/components/TextSection';
import SaleSection from '@/components/SaleSection';
import ScheduleSection from '@/components/ScheduleSection';
import FacilitatorsSection from '@/components/FacilitatorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  try {
    // Fetch data with detailed error handling
    const [facilitatorsData, scheduleData, testimonialsData] = await Promise.all([
      fetchFacilitators().catch(e => {
        console.error('Error fetching facilitators:', {
          message: e.message,
          status: e.response?.status,
          data: e.response?.data
        });
        // Retornar un array vacío en caso de error
        return [];
      }),
      fetchSchedule().catch(e => {
        console.error('Error fetching schedule:', e);
        return [];
      }),
      fetchTestimonials().catch(e => {
        console.error('Error fetching testimonials:', e);
        return [];
      })
    ]);

    // Debug logs
    console.log('API responses:', {
      facilitators: {
        count: facilitatorsData.length,
        data: facilitatorsData
      },
      schedule: {
        count: scheduleData.length
      },
      testimonials: {
        count: testimonialsData.length
      }
    });

    // Debug logs
    console.log('Fetched data:', {
      facilitators: facilitatorsData?.length,
      schedule: scheduleData?.length,
      testimonials: testimonialsData?.length,
    });

    // Ensure we have arrays even if empty
    const facilitators = Array.isArray(facilitatorsData) ? facilitatorsData : [];
    const schedule = Array.isArray(scheduleData) ? scheduleData : [];
    const testimonials = Array.isArray(testimonialsData) ? testimonialsData : [];

    return (
      <main>
        <Banner
          title="LudiTools GameCamp 2025"
          subtitle="La experiencia formativa más innovadora en gamificación y aprendizaje lúdico"
          brochureUrl="https://drive.google.com/file/d/17Is0DCs9xKBAk4aAe8VkQxQoxC5Y9PRx/view"
        />

        <VideoSection
          videoUrl="https://youtu.be/Yt6dOByAaJE"
          title="Conoce El GameCamp"
        />

        <InvitationSection
         title="¡No es sólo un encuentro profesional es un llamado!"
         text="A Todos Los Visionarios, Creadores, y disenadores de juegos serios y artefactos ludicos de nuestra region, facilitadores y facilitadoras que manejan metodologias ludicas, consultores y consultoras interesadas en innovaciones didacticas y publico en general interesado en su transformacion personal."
         buttonText="¡Quiero participar!"
         buttonHref="#programa"
        />

        <TextSection
          blocks={[
            {
              content: "Es más que un programa de formación. Es una comunidad de innovadores educativos, diseñadores de experiencias y facilitadores apasionados que creen en el poder del juego como herramienta de transformación. El Evento se desarrolla en formato Open Space, donde la agenda tematica se construye de manera Colaborativa, Un espacio de encuentro, intercambio y aprendizaje."
            },
            {
              content: "Luditools es un Game Camp presencial cruzado por una experiencial transpersonal donde honrramos a los que jugaron antes que nosotros juegos sagrados y simbólicos, **PUEDES DICTAR UN TALLER** O VENIR COMO PARTICIPANTE. SON 5 DÍAS DE RETIRO LÚDICO QUE TRANSFORMARÁN TU PRÁCTICA DIDÁCTICA CON NUEVAS HERRAMIENTAS Y REDES DE APOYO DESDE TU SER."
            }
          ]}
          backgroundColor="white"
        />

        <SaleSection
          title="¡Asegura tu lugar ahora!"
          description="Las plazas son limitadas para garantizar una experiencia de aprendizaje personalizada"
          price={1499}
          discountPrice={1199}
          ctaText="¡Quiero inscribirme!"
          ctaLink="#inscripcion"
          features={[
            "5 días de formación/retiro ludico",
            "Welcome LudiTools Pack",
            "Alimentacion y hospedaje incluidos",
            "Acceso a la comunidad exclusiva",
            "Salidas extraprogramaticas",
            "Actividades recreativas"
          ]}
        />

        <ScheduleSection
          title="Programa del GameCamp"
          schedules={schedule}
        />

        <Suspense fallback={
          <div className="bg-white py-20 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                Cargando facilitadores...
              </h2>
            </div>
          </div>
        }>
          <FacilitatorsSection
            title="Nuestro Equipo de Facilitadores"
            facilitators={facilitators}
          />
        </Suspense>

        <Suspense fallback={
          <div className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-900">
                Cargando testimonios...
              </h2>
            </div>
          </div>
        }>
          {testimonials.length > 0 && (
            <TestimonialsSection
              title="Lo que dicen nuestros graduados"
              testimonials={testimonials}
            />
          )}
        </Suspense>

        <Footer
          navigation={[
            { label: "Inicio", href: "/" },
            { label: "Tienda", href: "/tienda" },
            { label: "Programa", href: "#programa" },
            { label: "Facilitadores", href: "#facilitadores" },
            { label: "Testimonios", href: "#testimonios" }
          ]}
          socialLinks={[
            {
              platform: "twitter",
              url: "https://twitter.com/luditools",
              label: "Twitter de LudiTools"
            },
            {
              platform: "instagram",
              url: "https://instagram.com/luditools",
              label: "Instagram de LudiTools"
            },
            {
              platform: "linkedin",
              url: "https://linkedin.com/company/luditools",
              label: "LinkedIn de LudiTools"
            }
          ]}
          contactEmail="hola@luditools.com"
        />
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    throw error;
  }
}
