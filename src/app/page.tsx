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
    // Fetch data with better error handling
    const [facilitatorsData, scheduleData, testimonialsData] = await Promise.all([
      fetchFacilitators().catch(e => {
        console.error('Error fetching facilitators:', e);
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
          brochureUrl="/brochure-2025.pdf"
        />

        <VideoSection
          videoUrl="https://www.youtube.com/watch?v=your-video-id"
          title="Conoce LudiTools GameCamp"
        />

        <InvitationSection
          backgroundUrl="/images/camp-background.jpg"
          imageUrl="/images/featured-activity.jpg"
          text="Únete a una experiencia transformadora donde la gamificación y el aprendizaje se encuentran. Desarrolla habilidades prácticas mientras te sumerges en el mundo del diseño de experiencias lúdicas."
          bottomTitle="¿Estás listo para el desafío?"
        />

        <TextSection
          blocks={[
            {
              content: "LudiTools GameCamp es más que un programa de formación. Es una comunidad de innovadores educativos, diseñadores de experiencias y facilitadores apasionados que creen en el poder del juego como herramienta de transformación."
            },
            {
              content: "Durante una semana intensiva, aprenderás metodologías probadas, herramientas prácticas y estrategias efectivas para crear experiencias de aprendizaje memorables. Todo esto de la mano de expertos reconocidos en el campo de la gamificación educativa."
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
            "7 días de formación intensiva",
            "Kit completo de herramientas LudiTools",
            "Certificación oficial",
            "Acceso a la comunidad exclusiva",
            "Mentorías post-programa"
          ]}
        />

        <ScheduleSection
          title="Programa del GameCamp"
          schedules={schedule}
        />

        <FacilitatorsSection
          title="Nuestro Equipo de Facilitadores"
          facilitators={facilitators}
        />

        {testimonials.length > 0 && (
          <TestimonialsSection
            title="Lo que dicen nuestros graduados"
            testimonials={testimonials}
          />
        )}

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
