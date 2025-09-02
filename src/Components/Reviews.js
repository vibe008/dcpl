import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      role: "Heritage Commissioner, UP Govt",
      content: "DCPL's work on heritage conservation projects demonstrates exceptional understanding of traditional techniques while incorporating modern conservation standards.",
      rating: 5,
      project: "Ras Khan Samadhi Conservation"
    },
    {
      id: 2,
      name: "Meera Patel",
      role: "Urban Development Authority",
      content: "The Jubilee Park redevelopment exceeded all expectations. DCPL created a space that honors tradition while serving modern community needs beautifully.",
      rating: 5,
      project: "Jubilee Park Redevelopment"
    },
    {
      id: 3,
      name: "Architect Priya Verma",
      role: "Design Consultant",
      content: "Working with DCPL has been inspirational. Their attention to cultural context and environmental sustainability sets them apart in the industry.",
      rating: 5,
      project: "Braj Cultural Center"
    }
  ];

  const achievements = [
    {
      title: "Braj Kala Kendra Honor",
      year: "2023",
      description: "Recognition for outstanding contribution to preserving and promoting Braj region's architectural heritage"
    },
    {
      title: "UP State Architecture Award", 
      year: "2022",
      description: "Excellence in sustainable design and heritage conservation practices"
    },
    {
      title: "National Heritage Conservation Award",
      year: "2021", 
      description: "Recognition for innovative restoration techniques in historic monument conservation"
    }
  ];

  return (
    <section id="reviews" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-caption text-accent mb-4 block text-[10vw] uppercase">Recognition</span>
          <h2 className="heading-section mb-8">
            Trusted by clients, honored by peers
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence has earned recognition from government bodies, 
            cultural institutions, and satisfied clients across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Testimonials */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">
              Client Testimonials
            </h3>
            <div className="space-y-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-card p-8 rounded-2xl  hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Quote className="w-6 h-6 text-accent mr-3 flex-shrink-0" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-body text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-accent">
                      {testimonial.project}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">
              Awards & Recognition
            </h3>
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-secondary/50 p-8 rounded-2xl border-l-4 border-accent hover:bg-secondary/70 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-semibold text-foreground">
                      {achievement.title}
                    </h4>
                    <span className="text-accent font-medium text-lg">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl border border-accent/20">
              <div className="text-center">
                <div className="text-3xl font-light text-accent mb-2">10+</div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Government Empanelments
                </p>
                <p className="text-body text-muted-foreground mt-3">
                  Trusted partner for public sector projects across multiple states
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;