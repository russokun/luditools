import Image from 'next/image';
import { NormalizedSchedule } from '@/types';

interface ScheduleSectionProps {
  title: string;
  schedules: NormalizedSchedule[];
}

export default function ScheduleSection({
  title,
  schedules
}: ScheduleSectionProps) {
  console.log('Received schedules:', schedules); // Debug log
  
  if (!Array.isArray(schedules)) {
    console.error('Schedules is not an array:', schedules);
    return null;
  }

  return (
    <section className="bg-gray-50 py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-16">
          {title}
        </h2>

        <div className="space-y-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row">
                {schedule.image && (
                  <div className="relative w-full md:w-48 h-48">
                    <Image
                      src={schedule.image.url}
                      alt={schedule.image.alternativeText || schedule.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col md:flex-row md:items-center gap-6">
                  {/* Time Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <p className="text-xl font-bold text-blue-900">
                      {schedule.day}
                    </p>
                    <p className="text-lg text-blue-700">
                      {schedule.time}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-blue-900">
                    {schedule.title}
                  </h3>

                  {/* Facilitator Info */}
                  {schedule.facilitator && (
                    <div className="flex items-center gap-3 ml-auto">
                      {schedule.facilitator.image && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={schedule.facilitator.image.url}
                            alt={schedule.facilitator.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="text-sm">
                        <p className="font-semibold text-blue-900">
                          {schedule.facilitator.name}
                        </p>
                        <p className="text-gray-600">
                          Facilitador
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}