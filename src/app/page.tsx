import Image from 'next/image';
import { Gavel, Globe, Users, MessageSquare, BookOpen, Award, Briefcase, Lightbulb, Handshake, Star, Trophy, Shield } from 'lucide-react';

const features = [
  {
    icon: Gavel,
    title: 'Formal Proceedings',
    description: 'Experience formal debates following official UN rules of procedure.',
  },
  {
    icon: Globe,
    title: 'International Relations',
    description: 'Engage with global issues and understand diverse international perspectives.',
  },
  {
    icon: Users,
    title: 'Expert Panels',
    description: 'Learn from seasoned diplomats and experts in various fields.',
  },
  {
    icon: MessageSquare,
    title: 'Live Announcements',
    description: 'Stay updated with real-time announcements and schedule changes.',
  },
];

const aboutFeatures = [
  {
    icon: Users,
    title: "Debate & Diplomacy",
    description: "Engage in lively debates, practice diplomacy, and form alliances to address global challenges."
  },
  {
    icon: BookOpen,
    title: "Research & Analysis",
    description: "Dive deep into research on different countries and complex international issues."
  },
  {
    icon: Award,
    title: "Skill Development",
    description: "Sharpen your public speaking, critical thinking, and problem-solving abilities."
  },
  {
    icon: Briefcase,
    title: "Real-World Simulation",
    description: "Experience the workings of the United Nations in a realistic and immersive environment."
  }
];

const aboutDavRohiniMunFeatures = [
    {
        icon: Handshake,
        label: 'Diplomacy'
    },
    {
        icon: Lightbulb,
        label: 'Innovation'
    },
    {
        icon: Users,
        label: 'Community'
    }
];

const visionFeatures = [
    {
        icon: Users,
        title: 'Diverse Committees',
        description: 'Explore seven diverse committees, ensuring a dynamic and multifaceted conference experience for all delegates.'
    },
    {
        icon: Star,
        title: 'Expert Guidance',
        description: 'Benefit from an exceptionally qualified Executive Board and Judges\' Panel, ensuring a high standard of debate.'
    },
    {
        icon: Trophy,
        title: 'Awards & Recognition',
        description: 'Compete for cash awards, certificates, and coveted prizes like trophies and medals to honor your achievements.'
    },
    {
        icon: Shield,
        title: 'Empowering Future Leaders',
        description: 'Our core mission is to inspire and empower the next generation of leaders in diplomacy and global advocacy.'
    }
]


export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <section className="flex flex-1 items-center justify-center py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 flex items-center justify-center space-x-3">
            <Image
              src="https://i.postimg.cc/RFcZTyGf/image.png"
              alt="DavRohini MUN Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <div className="text-left">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground">
                DAV Rohini
              </h2>
              <p className="text-md text-muted-foreground">
                Public School MUN
              </p>
            </div>
          </div>

          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Dav Rohini Model United Nations 2025
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A platform for young leaders to debate, deliberate, and design
            solutions for a better tomorrow. Join us for an unforgettable
            experience.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Why Join Us?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the unique features of our MUN conference.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="grid gap-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
                What is a Model United Nations?
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Model United Nations (MUN) is an educational simulation where students act as delegates from different countries. They tackle real-world issues through research, debate, and diplomacy, aiming to find solutions through collaboration and consensus-building. This immersive experience hones public speaking, research, critical thinking, and teamwork skills, while fostering global awareness.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {aboutFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="bg-card/20 rounded-lg p-8 md:p-12">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">About DAV ROHINI MUN</h2>
                    <div className="max-w-4xl text-muted-foreground md:text-lg/relaxed space-y-4">
                        <p>
                        The DAV ROHINI MUN conference is dedicated to providing a comprehensive Model United Nations experience, engaging students in collaborative processes of problem-solving and consensus building. The conference not only provides a platform for young leaders to engage in international diplomacy but also develops their skills in negotiation and problem-solving.
                        </p>
                        <p>
                        By bringing together passionate students from diverse backgrounds, DAV ROHINI MUN creates a dynamic platform for innovation and dialogue, inspiring participants to become proactive, informed global citizens. Join us in shaping a more inclusive and sustainable world through the art of diplomacy and debate.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 pt-6">
                        {aboutDavRohiniMunFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-lg">{feature.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-card/20">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Vision of DAV ROHINI MUN</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Join us in a journey that combines intellectual stimulation with tangible rewards, shaping a new generation of proactive, informed, and globally minded citizens.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
                {visionFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="grid gap-4 rounded-lg border border-border bg-card p-6 text-left">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="grid gap-1.5">
                                <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    </div>
  );
}
